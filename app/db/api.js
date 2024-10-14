import axios from "axios";
import { selectAll } from "./crud"
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAIN_TOKEN = '1'

export const axiosConfig = {
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `${MAIN_TOKEN}`
    }
  };
export const axiosConfig1 = {
    headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `${MAIN_TOKEN}` 
    }
  };
  
  // Function to cache an image by its URL
  export const cacheImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      await AsyncStorage.setItem(uri, blob);
    } catch (error) {
      console.log('Error caching image: ', error);
    }
  };
  
  // Function to load an image from cache
  export const getCachedImage = async (uri) => {
    try {
      const blob = await AsyncStorage.getItem(uri);
      if (blob !== null) {
        // Convert blob to a suitable format for image display
        return URL.createObjectURL(blob);
      }
      return null;   
    } catch (error) {
      console.log('Error loading image from cache: ', error);
      return null;
    }
  };

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      //console.log(e)
    }
};
export const storeDataPlain = async (key, value) => {
  try {
    const jsonValue = value;
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    //console.log(e)
  }
};
export const getData = async (key) => {
    let val = null
    try {
      return await AsyncStorage.getItem(key)
      .then(value =>{
        val = JSON.parse(value); 
        
      })
      .catch(err=>{return null});
    } catch (e) {
      // error reading value
      //console.log(e)
    }
    return val
  };
  export const getDataPlain = async (key) => AsyncStorage.getItem(key)
      .then(value =>{
        return val = value; 
      })
      .catch(err=>{return null});
    
  export const removeData = async (key) => {
    try {
      let jsonValue = await AsyncStorage.removeItem(key);
    } catch (e) {
      // error reading value
      console.log(e)
    }
  };

// export const API_PATH ="http://localhost/ems/ems-api/api/setting2.php"
// export const API_PATH_FOLDER ="http://localhost/ems/ems-api/api/"

export const API_PATH ="http://skoolq.com/ems-api/api/setting2.php"
export const API_PATH_FOLDER ="http://skoolq.com/ems-api/api/"

export const loadRows = async(db, table, params)=>{

    //get from offline
    //when fail get from online
    //update offline
    //return data
    var rows = await selectAll(db, table, params)
    if(Array.isArray(rows)){
        return rows;
    }else{
        axios.get(API_PATH, {}, axiosConfig )
        .then(res=>{
            return
        })
        .catch
    }


}