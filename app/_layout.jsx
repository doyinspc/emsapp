import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect, createContext, useCallback } from "react";
import { useColorScheme } from 'react-native';
import { Colors } from './../constants/Colors';
import Loading from './../components/Loading'
//import * as SplashScreen from 'expo-splash-screen'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme, 
} from 'react-native-paper';
import merge from 'deepmerge';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import GlobalContextProvider from "../components/GlobalContextProvider";


library.add(fab, faSquareCheck, faMugSaucer)

//import useDBHook from "./db/useDBHook";
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CustomDefault = {...MD3LightTheme, colors:Colors.light}
const CustomDark = {...MD3DarkTheme, colors:Colors.dark}

const CombinedDefaultTheme = merge(LightTheme, CustomDefault);
const CombinedDarkTheme = merge(DarkTheme, CustomDark );

//SplashScreen.preventAutoHideAsync();
export const DBContext = createContext(undefined)

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme =
  colorScheme === 'dark'
    ? CombinedDarkTheme
    : CombinedDefaultTheme;


   //const {isLoading, db, load} = useDBHook()
   const [fontsLoaded, error] = useFonts({
    //add fonts
     'josefinregular':require('./../assets/fonts/JosefinSans-Regular.ttf'),
     'josefinbold':require('./../assets/fonts/JosefinSans-SemiBold.ttf'),
     'nunitolight':require('./../assets/fonts/Nunito-Light.ttf'),
     'nunitoregular':require('./../assets/fonts/Nunito-Regular.ttf'),
     'nunitobold':require('./../assets/fonts/Nunito-SemiBold.ttf'),
     'pacifico':require('./../assets/fonts/Pacifico-Regular.ttf'),
     'ralewaylight':require('./../assets/fonts/Raleway-Light.ttf'),
     'ralewayregular':require('./../assets/fonts/Raleway-Regular.ttf'),
     'ralewaybold':require('./../assets/fonts/Raleway-SemiBold.ttf'),
     'sourcesanslight':require('./../assets/fonts/SourceSans3-Light.ttf'),
     'sourcesansregular':require('./../assets/fonts/SourceSans3-Regular.ttf'),
     'sourcesansbold':require('./../assets/fonts/SourceSans3-SemiBold.ttf'),
   })

   
   

   useEffect(() => {
     //const load_file = async () => await SplashScreen.hideAsync();
     if(error) {
      throw error; 
      };
    //  if( fontsLoaded ){load_file()}
   }, [fontsLoaded, error])

   if(!fontsLoaded && error )
    { return null; }
  else{
      return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
      <DBContext.Provider value={{asd:123}}>
        <GlobalContextProvider >
          <React.Suspense fallback={<Loading />}>
            <Stack>
              <Stack.Screen name="index" index options={{headerShown:false}} />
              <Stack.Screen name="auth" options={{headerShown:false}} />
              <Stack.Screen name="screens" options={{headerShown:false}} />
              <Stack.Screen name="(tabs)" options={{headerShown:false}} />
              <Stack.Screen name="test" options={{headerShown:false}} />
            </Stack>
          </React.Suspense>
        </GlobalContextProvider>
      </DBContext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}}
