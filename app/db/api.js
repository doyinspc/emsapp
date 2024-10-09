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

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e)
    }
};
export const getData = async (key) => {
    try {
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue != null ? JSON.parse(jsonValue) : null;
      return jsonValue
    } catch (e) {
      // error reading value
      console.log(e)
    }
  };

// export const API_PATH ="http://localhost/ems/ems-api/api/setting2.php"
// export const API_PATH_FOLDER ="http://localhost/ems/ems-api/api/"

export const API_PATH ="http://skoolq.com/ems-api/api/setting2.php"
export const API_PATH_FOLDER ="http://skoolq.com/ems-api/ems-api/api/"

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