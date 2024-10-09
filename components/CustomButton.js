import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { customStyles } from '../constants/Styles'
import { Button } from 'react-native-paper'

export default function CustomButton(props) {
    const {title, isLoading, buttonStyle, labelStyle, icon } = props
  return (
    <Button
        style={{...customStyles.button}}
        labelStyle={{...labelStyle}}
        icon={icon || "camera" }
        mode="contained" 
        loading={isLoading}
        onPress={() =>props.onPress()}> 
        {title}
    </Button>
  )
}