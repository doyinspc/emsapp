import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../components/GlobalContextProvider'
import Page from '../../components/Page'
import { Appbar, Caption } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import useGetHook from '../db/useGetHook'
import CustomButton from '../../components/CustomButton'
import Loading from '../../components/Loading'
import ListNotes from '../../components/ListNotes'
import PageFixed from '../../components/PageFixed'
import { router, useNavigation } from 'expo-router'


const notes = () => {
  const nav = useNavigation()
  const {globalParams, updateGlobalParams} = useContext(GlobalContext)
  const {scheme} = globalParams || {}
  const {info, dataLschemedata} = scheme || ''
  const {subjectname, tname, tcontent, tobjective, tid:themeid} = info || ''
    
    let db =''
    const {data, isLoading, error, msg, load} = useGetHook({db, table:'students', queryType:'select_active_notes'})
    
    useEffect(() => load({
        'themeid':themeid
    }), [themeid])
  
    const handleSubmit = ()=> load({
        'themeid':themeid
    })
  return (
    <PageFixed>
      <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Lesson Materials' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
        <Page>
          <Caption style={customStyles.caption}>{tname}</Caption>
          {!isLoading ?
            <>
            {data 
            && Array.isArray(Object.keys(data)) 
            && Object.keys(data).length > 0 
            && data.map((props, indx) =><ListNotes key={indx} data={props} />)}
            {error && <Text>{error}</Text>}
            {msg && <Text>{msg}</Text>}
            </>:
            <Loading />} 
      </Page>
    </PageFixed>
  )
}

export default notes