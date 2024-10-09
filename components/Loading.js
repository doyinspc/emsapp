import { View, Text } from 'react-native'
import React from 'react'
import Page from './Page'
import { ActivityIndicator } from 'react-native-paper'
import { customStyles } from './../constants/Styles'

const Loading = () => {
  return (
    <View  style={customStyles.loader}>
    <ActivityIndicator animating={true}  size='large' />
  </View>
  )
}

export default Loading