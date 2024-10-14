import React, { useEffect, useContext, useState  } from 'react'
import { GlobalContext } from '../../components/GlobalContextProvider'
import Page from '../../components/Page'
import { Caption, Subheading } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import QuestionBlockPage from '../../components/QuestionBlockPage'
import CustomButton from '../../components/CustomButton'
import { View } from 'react-native'

const Index = () => {
const [stage, setstage] = useState(true)
  
 const {globalParams, updateGlobalParams} = useContext(GlobalContext)
 
 const {scheme, question} = globalParams || {}
 const {info } = scheme
 const {subjectname, tname } = info
 const {id:questionid, studentid, test, score, work } = question || ''

 const test_obj = typeof test == 'string' && Array.isArray(Object.keys(JSON.parse(test))) ? JSON.parse(test) : []
 
 const {questions, answers} = test_obj || []
 const num_of_questions = Object.keys(answers).length || 0
 const is_complete = score > 0 ? true : false

 useEffect(() => {
   if(is_complete){
        setstage(false)
   }else{
      setstage(true)
   }
 }, [is_complete])
 



  return (
    <>
    {stage ? <Page>
      <Caption style={customStyles.caption}>{tname}{studentid}</Caption>
      <Subheading>{subjectname}</Subheading>
      <Subheading>{`Number of Questions: ${num_of_questions}`}</Subheading>
      <CustomButton title='Start Test' onPress={()=>setstage(prev =>!prev)} />
      {is_complete ? 
        <View style={customStyles.rowContainer}>
          <Text variant="headline">{`SCORE : ${score * 100}%`}</Text>
        </View>
      :null}
    </Page>:
      questions && <QuestionBlockPage
            id={questionid}
            questions ={questions}
            answers= {answers}
            is_complete={is_complete}  
            resetPage={()=>setstage(prev =>!prev)}
      />}
    </>
  )
}

export default Index