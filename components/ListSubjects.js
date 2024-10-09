import { router } from 'expo-router';
import * as React from 'react';
import { List, Text } from 'react-native-paper';
import { customStyles } from '../constants/Styles';
import { GlobalContext } from './GlobalContextProvider';

const ListSubjects = (props) => {
  const {subjectname, schemenum, subjectid} = props.data
  const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    
    const handlePress = (data)=>{
      let g = {...globalParams}
      g.subject = data
      updateGlobalParams(g)
      router.push("./scheme", {value:1} )
    }
  return(<List.Item
    title={<Text style={customStyles.listHeader}>{subjectname}</Text>}
    description={`Available Modules ${schemenum}`}
    left={props => <List.Icon {...props} icon="folder" />}
    onPress={()=>handlePress(props.data)}
  />
)};

export default ListSubjects;