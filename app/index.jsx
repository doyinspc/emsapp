import React from 'react'
import { ImageBackground, View } from "react-native";
import images from '../constants/Icons.js'
import { router } from "expo-router";
import { customStyles } from "../constants/Styles.js";
import { Text } from "react-native-paper";
import CustomButton from "../components/CustomButton.js";
//import OptimizeImage from "../components/OptimizeImage.js";
import Loading from '../components/Loading.js'

//const main_logo = require(images.logo)
//const main_bg = require(images.bg)

export default function Index() {
  

  return (
    <React.Suspense fallback={<Loading />} >
        <View style={customStyles.container}>
          <ImageBackground 
            imageStyle={{opacity:0.3}} 
            source={images.bg} 
            resizeMode='cover' 
            style={customStyles.bgimage}
          >
          <View style={customStyles.bgimagescreen}>
          <View style={customStyles.rowContainer}>
          {/* <OptimizeImage source={images.logo} style={customStyles.logo} /> */}
          <Text style={customStyles.title}>Student APP</Text>
          <Text style={customStyles.subtitle}>We take learning were students are</Text>
          <View style={customStyles.rowContainer}>
            <CustomButton 
              title='Load'
              onPress={()=>router.push('./auth')}
              buttonStyle={{}}
            />
          </View>
          </View>
          </View>
          </ImageBackground>
        </View>
    </React.Suspense>
  );
}
