import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../components/GlobalContextProvider'
import Page from '../../components/Page'
import { Appbar, Caption } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import useGetHook from '../db/useGetHook'
import CustomButton from '../../components/CustomButton'
import Loading from '../../components/Loading'
import ListQuestions from '../../components/ListQuestion'
import PageFixed from '../../components/PageFixed'
import { View } from 'react-native'
import { router, useNavigation } from 'expo-router'


const questions = () => {

  const nav = useNavigation()
  const {globalParams, updateGlobalParams} = useContext(GlobalContext)
  const {scheme, student} = globalParams || {}
  const {info, dataLschemedata} = scheme || ''
  const {subjectname, tname, tcontent, tobjective, tid:themeid} = info || ''
  const {id:studentid} = student || null
    
    let db =''
    const {data, isLoading, error, msg, load} = useGetHook({db, table:'students', queryType:'select_active_scores'})
    const {data:dataQuestion, isLoading:isLoadingQuestion, error:errorQuestion, msg:msgQuestion, load:loadQuestion} = useGetHook({db, table:'students', queryType:'select_active_questions'})    
    useEffect(() => load({
       'studentid':studentid,
        'themeid':themeid
    }), [themeid])
  
    const handleSubmit = ()=> load({
        'themeid':themeid,
        'studentid':studentid,
    })
    const handleLoadQuestion = ()=> loadQuestion({
      'studentid':studentid, 
      'themeid':themeid
  })
  return (
    <PageFixed>
      <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Take Test' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
            <Appbar.Action icon='plus' onPress={()=>handleLoadQuestion()} />
        </Appbar.Header>
      <Caption style={customStyles.caption}>{tname}</Caption>
      <Page>
      {!isLoading ?
        <>
        {data 
        && Array.isArray(data) 
        && data.length > 0 
        && data.map(prop => <ListQuestions key={prop.id} data={prop} />)}
        {error && <Text>{error}</Text>}
        {msg && <Text>{msg}</Text>}
        </>:
        <Loading />} 
      </Page>
    </PageFixed>
  )
}

export default questions