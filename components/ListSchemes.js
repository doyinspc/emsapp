import * as React from 'react';
import { List, Text } from 'react-native-paper';
import { customStyles } from '../constants/Styles';
import { router } from 'expo-router';
import { GlobalContext } from './GlobalContextProvider';

const ListGroup = (props) => {
    const { data } = props
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    
    const handlePress = async (data)=>{
      let g = {...globalParams}
      g.scheme = data
      await updateGlobalParams(g)
      router.push("(tabs)",{value:1} )
    }
  return (
    <>
        {Object.keys(data).map((prop, indx) =>{
            const {info, data:dt} = data[prop]
            const {tname} = info
            return  <List.Item
              key={indx}
              title={<Text style={customStyles.listHeader}>{tname}</Text>}
              onPress={()=>handlePress(data[prop])}
              left={props => <List.Icon {...props} icon="folder" />}
            />
        })}
    </>
  );
};

export default ListGroup;