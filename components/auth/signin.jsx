import { View } from 'react-native'
import React from 'react'
import { customStyles } from '../../constants/Styles'
import { Button, TextInput, Text } from 'react-native-paper'
import CustomButton from '../CustomButton'
import Loading from '../Loading'
import PageFixed from '../PageFixed'
import Page from '../Page'


const Signin = (props) => {
  const {text, phone} = props
  return (
    <React.Suspense fallback={<Loading />} >
    <Page>
      
      <View style={customStyles.textContainer}>
        <View>
          <Text style={customStyles.headerbox} variant="headlineLarge">Login</Text>
          <Text style={customStyles.paragraph} variant="labelLarge">
            Kindly enter students matriculation number and one 
            phone number registered with the school to login.</Text>
        </View>
        <TextInput
          style={customStyles.textbox}
          label="Matriculation Number"
          value={text}
          onChangeText={text => props.setText(text)}
        />
      <TextInput
       style={customStyles.textbox}
        label="Phone Number"
        value={phone}
        onChangeText={text => props.setPhone(text)}
      /> 
      <CustomButton 
        style={customStyles.button}
        icon="camera" 
        mode="contained" 
        onPress={() => props.handleSubmit()}
        title="Login"
      />
      </View>
      </Page>
    </React.Suspense >
  )
}

export default Signin