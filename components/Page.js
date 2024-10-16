import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { customStyles } from '../constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = ({children}) => {
  return (
    <ScrollView contentContainerStyle={customStyles.scrollview} >
          <View className={customStyles.container}>
          {children}
          </View>
    </ScrollView>
  )
}

export default Page