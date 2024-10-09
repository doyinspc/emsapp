import React from 'react'
import { Stack } from 'expo-router'
import { customStyles } from '../../constants/Styles'

const AuthLayout = () => {
  return (
    <Stack>
          <Stack.Screen name="index" options={{
              title: 'Welcome',
              headerStyle: customStyles.headerStyle,
              headerTitleStyle: customStyles.headerTitleStyle
            }}  
          />
    </Stack>
  )
}

export default AuthLayout