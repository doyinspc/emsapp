import * as React from 'react';
import { List, Text } from 'react-native-paper';
import { customStyles } from '../constants/Styles';
import { router } from 'expo-router';
import { GlobalContext } from './GlobalContextProvider';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

const ListReports = (props) => {
    const { data } = props
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    
    const handlePress = async (data)=>{
      let g = {...globalParams}
      g.dy = data
      await updateGlobalParams(g)
      router.push("(tabs)",{value:1} )
    }

  return (
    <>
        {data.map((prop, indx) =>{
            const {id, title, schoolname, classname} = prop
            return  <List.Item
              key={indx}
              title={<Text style={customStyles.listHeader}>{title}</Text>}
              description={<View><Text>{schoolname}</Text>
              <Text>{classname}</Text>
              </View>}
              onPress={()=>handlePress(id)}
              left={props => <List.Icon icon={()=><FontAwesomeIcon icon={faFilePdf} />} />}
            />
        })}
    </>
  );
};

export default ListReports;