import { router } from 'expo-router';
import * as React from 'react';
import { List, Text } from 'react-native-paper';

const ListScheme = (props) => {
  const {name, subtopic} = props.data
  return(<List.Item
    title={<Text>{name}</Text>}
    description={<Text>{subtopic}</Text>}
    left={props => <List.Icon {...props} icon="folder" />}
    onPress={()=>router.push({
      pathname:'./scheme',
      params:{...props.params, ...props.data}
    })}
  />
)};

export default ListScheme;