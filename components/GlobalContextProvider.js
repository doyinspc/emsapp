import { createContext, useState } from "react";
import {storeData, getData} from './../app/db/api'

export const GlobalContext = createContext()

const GlobalContextProvider = ({children})=>{

    const [globalParams, setglobalParams] = useState({})

    const updateGlobalParams = (newParam)=>{
        storeData('all_data', {...newParam})
        setglobalParams({...newParam})
    }

    const allGlobalParams = async() =>await getData('all_data')

    //let globalParams = allGlobalParams()


    return (
    <GlobalContext.Provider value={{globalParams,  updateGlobalParams}}>
        {children}
    </GlobalContext.Provider>)

}
export default GlobalContextProvider