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


const Index = () => {
  
  const db = useContext(DBContext)
  const {data, isLoading, error, msg, load} = usePostHook({db, table:'students', queryType:'login'})

  const [text, setText] = useState('4869')
  const [phone, setPhone] = useState('08023589330')

  useEffect(() => load({'admission_no':text, 'passwd':phone}), [])

  const handleSubmit = () => load({'admission_no':text, 'passwd':phone})
  
  return (
    <SafeAreaView className={customStyles.safearea}>
      <View style={customStyles.container}>
          {!isLoading ?
              data && Array.isArray(Object.keys(data)) && Object.keys(data).length > 0 ? 
                  <Welcome data={data} /> : 
                  <Signin 
                      setText={(e)=>setText(e)}
                      setPhone={(e)=>setPhone(e)}
                      handleSubmit ={()=>handleSubmit()}
                      error={error}
                  />:
                  <Loading />}
      </View>
    </SafeAreaView>
  )
}

export default Index