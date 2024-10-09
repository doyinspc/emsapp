import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { customStyles } from '../constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'

const ListPage = ({children}) => {
  return (
    <View style={customStyles.ListPage}>
      <ScrollView contentContainerStyle={customStyles.scrollview} >
            {children}
      </ScrollView>
      </View>
 
  )
}

export default ListPage