import { useCallback, useState } from 'react'
import { create_td, open_td } from './crud'
import defaultTables  from './table'



export default function useDBHook() {
    
    const [isLoading, setisLoading] = useState(false)
    const [db, setdb] = useState(null)

    
    const load = useCallback(() =>{ 
            (async() => {
                setisLoading(true)
                let db1 = await open_td() 
                Object.keys(defaultTables).forEach(async element => {
                    try {
                        let r = await create_td(db1, element, defaultTables[element]);
                        console.log(`${element} table-created successful `)
                    } catch(error) {
                        console.log(error)
                        console.log(`${element}table-creation failed `)
                    }  
                });
                setdb(db1)
                setisLoading(false)
            })()
        
    },)
    
  return {isLoading, db, load}
}
