import { router } from 'expo-router';
import * as React from 'react';
import { List, Text } from 'react-native-paper';
import { GlobalContext } from './GlobalContextProvider';
import { customStyles } from '../constants/Styles';

const ListQuestions = (props) => {
  const {score, date_created} = props.data || ''
  const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
  let text = score > 0 ? 'Score ' + score : 'Test Ready, Click to start';
  let icon = score > 0 ? 'check' : 'forward'
  let color = score > 0 ? 'teal' : 'red'

  const handlePress = async (data)=>{
    let g = {...globalParams}
    g.question = data
    await updateGlobalParams(g)
    router.push("test",{value:1} )
  }

  return(<List.Item
    title={<Text style={customStyles.listHeader}>{text}</Text>}
    description={date_created}
    left={props => <List.Icon {...props} color={color} icon={icon} />}
    onPress={()=>handlePress(props.data)}
  />
)};

export default ListQuestions;