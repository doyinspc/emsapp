import React, { useEffect, useState } from 'react'
import PageFixed from '../../components/PageFixed'
import { Appbar, Banner, List } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import { GlobalContext } from '../../components/GlobalContextProvider'
import { Image, View } from 'react-native'
import useGetHook from '../db/useGetHook'
import { DBContext } from '../_layout'
import { useNavigation } from 'expo-router'
import Page from '../../components/Page'
import Loading from '../../components/Loading'
import ListReports from '../../components/ListReports'

const report = () => {
    const nav = useNavigation()
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    const [visible, setVisible] = useState(0)

    const db = React.useContext(DBContext)
    
    const {student} = globalParams || {}
    const {id :studentid } = student || ''
    const {data, isLoading:isLoading, error:error, msg:msg, load:loadStaff} = useGetHook({db, table:'staffs', queryType:'select_result'})
  
    useEffect(() => loadStaff({studentid}), [studentid])
    
    const handleSubmit = () =>loadStaff({studentid})
   

  return (
    <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Reports' />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
        <React.Suspense fallback={<Loading />}>
            <Page>
                {!isLoading ?
                <>
                {data 
                && Array.isArray(Object.keys(data)) 
                && Object.keys(data).length > 0 
                && <ListReports data={data} />}
                {error && <Text>{error}</Text>}
                {msg && <Text>{msg}</Text>}
                </>:
                <Loading />} 
    </Page>
    </React.Suspense>
    </PageFixed>
  )
}

export default report