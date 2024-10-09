import * as React from 'react';
import { List, Text } from 'react-native-paper';
import { customStyles } from '../constants/Styles';

const ListGroupItem = (props) => {
    const { data } = props
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  console.log(data)

  return (
    <>
        {Object.keys(data).map(prop =>{
            const {tname, data:dt} = data[prop]
            return  <List.Accordion
            title={<Text style={customStyles.listHeader}>{tname}</Text>}
            expanded={expanded}
            handlePress={handlePress}
            left={props => <List.Icon {...props} icon="folder" />}
            >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        })}
    
    </>
  );
};

export default ListGroupItem;