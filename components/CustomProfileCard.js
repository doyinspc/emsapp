import * as React from 'react';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { customStyles } from '../constants/Styles';
import { API_PATH_FOLDER, removeData, storeDataPlain } from '../app/db/api';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChalkboardTeacher, faSchoolFlag } from '@fortawesome/free-solid-svg-icons';
import { faBell, faCalendar, faLightbulb, faUser } from '@fortawesome/free-regular-svg-icons';
import { GlobalContext } from './GlobalContextProvider';
import CustomButton from './CustomButton';

 

const CustomProfileCard = (props) =>{
  
  const {surname, firstname, admission_no, middlename, photo, g1_phone1, g1_phone2, g2_phone1, g2_phone2, email, school_data, class_data, term_data } = props.data || ''
  const {name:schoolname, links} = school_data
  const {sessionname, termid} = term_data
  const {name:classname} = class_data
  const theme = useTheme()
  const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
  storeDataPlain('login_text', admission_no);
  storeDataPlain('phone_text', g1_phone1);

  React.useEffect( () => {
    let g = {...globalParams}
    g.school = school_data
    g.student = props.data
    g.clasz = class_data
    g.term = term_data
    updateGlobalParams(g)
  }, [school_data, class_data, term_data])

  const logOut = () =>{
      removeData('login_text')
      removeData('phone_text')
      router.push('auth')
  }


  return <>
  <View style={customStyles.CardContainer}>
    <Card style={customStyles.Card} contentStyle={customStyles.Card}>
      <Card.Title 
        title={`${schoolname}`} 
        subtitle={`${sessionname} ${classname}`} 
        left={()=><Avatar.Image size={45}  source={{ uri: API_PATH_FOLDER + links }}  />}
      />
      <Card.Content>
        <Text variant="titleLarge">{`${surname || ''} ${firstname || ''} ${middlename || ''}`}</Text>
        <Text variant="bodyMedium">{`${g1_phone1 || ''} ${g1_phone2 || ''} ${g2_phone1 || ''} ${g2_phone2 || ''}`}</Text>
      </Card.Content>
      {/* <Card.Actions>
        <Button>Profile</Button>
        <Button>Subject List</Button>
      </Card.Actions> */}
    </Card>
  </View>
  <View style={customStyles.menuCard}>
    <Pressable style={customStyles.menuCards} onPress={()=>router.push('screens/school')} >
      <FontAwesomeIcon color={theme.colors.onPrimary} size={50} style={{ height: "5rem", fontSize:'3rem' }} icon={faSchoolFlag} />
      <Text style={customStyles.menuCardsText}>About School</Text>
    </Pressable>
    <Pressable style={customStyles.menuCards} onPress={()=>router.push('screens/teacher')}>
      <FontAwesomeIcon color={theme.colors.onPrimary} size={50} style={{ height: "5rem", fontSize:'3rem' }} icon={faChalkboardTeacher} />
      <Text style={customStyles.menuCardsText}>Class Teacher</Text>
    </Pressable>
    <Pressable style={customStyles.menuCards} onPress={()=>router.push('screens/profile')}>
    <FontAwesomeIcon color={theme.colors.onPrimary} size={50} style={{ height: "5rem", fontSize:'3rem' }} icon={faUser} />
      <Text style={customStyles.menuCardsText}>My Profile</Text>
    </Pressable>
    <Pressable style={customStyles.menuCards} onPress={()=>router.push('screens/report')}>
    <FontAwesomeIcon color={theme.colors.onPrimary} size={50} style={{ height: "5rem", fontSize:'3rem' }} icon={faCalendar} />
      <Text style={customStyles.menuCardsText}>Report</Text>
    </Pressable>
    <Pressable style={customStyles.menuCards} onPress={()=>router.push({
      pathname:'screens/subjects', 
      params:{...props.data, claszid:class_data.claszid, claszname:class_data.name, termid:termid} 
      })}>
      <FontAwesomeIcon color={theme.colors.onPrimary} size={50} style={{ height: "5rem", fontSize:'3rem' }} icon={faLightbulb} />
      <Text style={customStyles.menuCardsText}>Subjects</Text>
    </Pressable>
    <Pressable style={customStyles.menuCards} onPress={()=>router.push('screens/notification')}>
      <FontAwesomeIcon color={theme.colors.onPrimary} size={50} style={{ height: "5rem", fontSize:'3rem' }} icon={faBell} />
      <Text style={customStyles.menuCardsText}>Notification</Text>
    </Pressable>
  </View>
  <View style={customStyles.menuCardFooter}>
    <CustomButton
      title = 'Logout'
      onPress ={()=>logOut()}
    />
  </View>
  </>
};

export default CustomProfileCard