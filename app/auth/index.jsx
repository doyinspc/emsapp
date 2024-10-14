import React, {useCallback, useContext, useEffect, useState} from 'react'
import Page from '../../components/Page'
import { DBContext } from '../_layout'
import Signin from '../../components/auth/signin'
import Welcome from '../../components/auth/welcome'
import Loading from '../../components/Loading'
import usePostHook from '../db/usePostHook'
import { View } from 'react-native'
import { customStyles } from '../../constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getDataPlain } from '../db/api'
import PageFixed from '../../components/PageFixed'


const Index = () => {
  
  const db = useContext(DBContext)
  const {data, isLoading, error, msg, load} = usePostHook({db, table:'students', queryType:'login'})
  
  //4869 //08023589330

  const [text, setText] = useState(null)
  const [phone, setPhone] = useState(null)
  const [text1, setText1] = useState(null)
  const [phone1, setPhone1] = useState(null)

  useEffect(() => {
    getDataPlain('login_text').then(val =>setText1(val)).catch(err=>console.log(err))
    getDataPlain('phone_text').then(val =>setPhone1(val)).catch(err=>console.log(err))
  }, [])

  useEffect(() => {
    if(typeof text1 == 'string' && text1.length > 0 && typeof phone1 == 'string' && phone1.length > 0){
      load({'admission_no':text1, 'passwd':phone1})
    }
  }, [text1, phone1])

  const handleSubmit = () => {
    load({'admission_no':text, 'passwd':phone})
  }
  
  return (
    <PageFixed>
          {!isLoading ?
              data && Array.isArray(Object.keys(data)) && Object.keys(data).length > 0 ? 
              <Welcome data={data} /> : 
              <Signin
                  text={text}
                  phone={phone}
                  setText={(e)=>setText(e)}
                  setPhone={(e)=>setPhone(e)}
                  handleSubmit ={()=>handleSubmit()}
                  error={error}
              />:
              <Loading />}
    </PageFixed>
  )
}

export default Index