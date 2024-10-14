import { router } from 'expo-router';
import * as React from 'react';
import { List, Text } from 'react-native-paper';
import { GlobalContext } from './GlobalContextProvider';

const ListNotes = (props) => {
  const {title, subtopic} = props.data || ''

  const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    
  const handlePress = async (data)=>{
    let g = {...globalParams}
    g.note = data
    await updateGlobalParams(g)
    router.push("screens/notedata",{value:1} )
  }
  return(<List.Item
    title={<Text>{title}</Text>}
    description={<Text>{subtopic}</Text>}
    left={props => <List.Icon {...props} icon="folder" />}
    onPress={()=>handlePress(props.data)}
  />
)};

export default ListNotes;