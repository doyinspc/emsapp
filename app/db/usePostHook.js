import axios from 'axios'
import { useCallback, useState } from 'react'
import { axiosConfig, API_PATH, axiosConfig1 } from './api'
import { insert, selectAll, selectOne, update } from './crud'

export default function usePostHook({db, table, queryType}) {
    const [error, seterror] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [data, setdata] = useState([])
    const [msg, setmsg] = useState('')

   

    const load = useCallback(async (param) => {
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
            let fd = new FormData()
            fd.append('cat', queryType)
            fd.append('table', table)
            fd.append('narration', 'mobile')
           
            Object.keys(param).forEach(element => {
                fd.append(element, param[element])
            });
    
            axios.post(API_PATH, fd, axiosConfig1)
            .then(async res=>{
                setmsg('Data found online-processing')
                //await updateLocal(res)
                setdata(res.data.data)
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
