import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { customStyles } from '../constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'

const PageFixed = ({children}) => {
  return (
    <SafeAreaView className={customStyles.safearea}>
        {children}
    </SafeAreaView>
  )
}
export default PageFixed