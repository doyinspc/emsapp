import React from 'react'

// export default function usePouchDBHook() {
//   return {}
// }
// import { useCallback, useState } from 'react'
// import { create_td, open_td } from './PouchDB'
// import defaultTables  from './table'



// export default function usePouchDBHook() {
    
//     const [isLoading, setisLoading] = useState(false)
//     const [db, setdb] = useState(null)

    
//     const load = useCallback(() =>{ 
//             (async() => {
//                 setisLoading(true)
//                 let db1 = await open_td() 
//                 Object.keys(defaultTables).forEach(async tableName => {
//                     try {
//                         let r = await create_td(tableName);
//                         console.log(`${tableName} table-created successful `)
//                     } catch(error) {
//                         console.log(error)
//                         console.log(`${tableName}table-creation failed `)
//                     }  
//                 });
//                 setdb(db1)
//                 setisLoading(false)
//             })()
        
//     },)
    
//   return {isLoading, db, load}
// }
