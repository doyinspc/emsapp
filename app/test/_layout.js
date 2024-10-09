import React from 'react'
import { Stack } from 'expo-router'
import { customStyles } from '../../constants/Styles'

const TestLayout = () => {
  return (
    <Stack>
          <Stack.Screen name="index" options={{
              title: 'CBT',
              headerStyle: customStyles.headerStyle,
              headerTitleStyle: customStyles.headerTitleStyle
            }}  
          />
           
           <Stack.Screen name="test" options={{headerShown:false}} />
    </Stack>
  )
}

export default TestLayout