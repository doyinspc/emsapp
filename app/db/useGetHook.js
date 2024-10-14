import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { axiosConfig, API_PATH } from './api'
import { insert, selectAll, selectOne, update } from './crud'

export default function useGetHook({db, table, queryType}) {
    
    const [error, seterror] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [data, setdata] = useState([])
    const [msg, setmsg] = useState('')

   

    const load = useCallback( (param) => {
        const updateLocal = async (rows)=>{
            if(rows && Array.isArray(rows) && rows.length > 0){
                await rows.forEach(async element => {
                       safeUpdateRow(element)
               });
            }else if(rows && typeof rows === 'object' && Array.isArray(Object.keys(rows)) && Object.keys(rows).length > 0 ){
                safeUpdateRow(rows)
            }
        }
    
        const safeUpdateRow = async (row)=>{
            var check = await selectOne(db, table, {id:row.id})
            if(check){
                await update(db, table, row, {id:row.id})
            }else{
                await insert(db, table, row)
            }     
        }
        setisLoading(true)
        setmsg('Process Started')
        var rows = null// await selectAll(db, table, param)
        if(Array.isArray(rows)){
            setmsg('Data found offline')
            setdata(rows);
            setisLoading(false)
        }else{
            setmsg('no data offline checking online server')
            let params = {
                data:JSON.stringify(param),
                cat: queryType,
                table:table,
                narration:'mobile'
            }
            axios.get(API_PATH, {params}, axiosConfig)
            .then(async res=>{
                setmsg('Data found online-processing')
                //await updateLocal(res)
                setdata(res.data)
                seterror('')
                setisLoading(false)
                setmsg('')
            })
            .catch(re=>{
                seterror('Error loading File from online Server')
                setisLoading(false)
                setmsg('')
            })
        }   
        }, [db, table, queryType],
    ) 
  return {data, isLoading, error, msg, load}
}
