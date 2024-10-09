import React from 'react'
import { Stack } from 'expo-router'
import { customStyles } from '../../constants/Styles'

const _layout = () => {
  return (
    <Stack>
          <Stack.Screen name="subjects" options={{
            headerShown:false,
              title: 'Subjects',
              headerStyle: customStyles.headerStyle,
              headerTitleStyle: customStyles.headerTitleStyle
            }}  
          />
           <Stack.Screen name="scheme" options={{
            headerShown:false,
              title: 'Scheme of Work',
              headerStyle: customStyles.headerStyle,
              headerTitleStyle: customStyles.headerTitleStyle
            }}  
          />
          <Stack.Screen name="school" options={{headerShown:false}} />
          <Stack.Screen name="report" options={{headerShown:false}} />
          <Stack.Screen name="profile" options={{headerShown:false}} />
          <Stack.Screen name="teacher" options={{headerShown:false}} />
           <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    </Stack>
  )
}

export default _layout