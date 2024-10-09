import React, { useContext, useEffect, useState } from 'react'
import PageFixed from '../../components/PageFixed'
import { Appbar, Banner, List, Text } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import { GlobalContext } from '../../components/GlobalContextProvider'
import { Image, View } from 'react-native'
import { faEnvelope,  faMapLocation,  faPhoneFlip, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { API_PATH_FOLDER } from '../db/api'
import { router, useNavigation } from 'expo-router'
import useGetHook from '../db/useGetHook'
import { DBContext } from '../_layout'

const school = () => {
    const nav = useNavigation()
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    const db = useContext(DBContext)
    const {data:dataSchoolHead, isLoading:isLoadingStaff, error:errorStaff, msg:msgStaff, load:loadStaff} = useGetHook({db, table:'staffs', queryType:'selected'})
    const {data:dataOffice, isLoading, error, msg, load:loadOffice} = useGetHook({db, table:'offices', queryType:'selected'})
    const [visible, setVisible] = useState(true)

    const {subject, school, term, student, clasz} = globalParams || {}
    const {subjectid, subjectname} = subject || ''
    const {id:schoolid, name, phone1, phone2, email, links, states, country, signatory, office } = school || ''

    const {surname, firstname, photo, phone1:headphone1, phone2:headphone2, email:heademail} = dataSchoolHead[0] || ''
    const {name:officename} = dataOffice[0] || ''
    useEffect(() => {
       loadStaff({id:signatory})
       loadOffice({id:office, is_active:0})
    }, [signatory, office])
    
    
  return (
    <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='School Info' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
        </Appbar.Header>
        <Banner
              visible={true}
              style={customStyles.banner}
              contentStyle={customStyles.banner}
              actions={[
                {
                  label: 'School',
                  onPress: () => setVisible(true),
                },
                {
                  label: 'School Head',
                  onPress: () => setVisible(false),
                },
              ]}
              icon={({size}) => (
                <Image
                  source={{
                    uri :API_PATH_FOLDER + links,
                  }}
                  style={{
                    width: size,
                    height: size,
                  }}
                />
              )}>
              {name}
        </Banner>
        {visible ?
        <View style={customStyles.InfoPage}>
        <View style={customStyles.rowContainerImg}>
          <Image 
            source={{uri :API_PATH_FOLDER + links}} 
            style={customStyles.img} 
          />
          </View>
          <View>
            <List.Item
                title={`${states} ${country}`}
                left={() => <FontAwesomeIcon icon={faMapLocation} />}
            />
            <List.Item
                title={`${phone1} ${phone2}`}
                left={() => <FontAwesomeIcon icon={faPhoneFlip} />}
            />
            <List.Item
                title={`${email}`}
                left={() => <FontAwesomeIcon icon={faEnvelope} />}
            />
          </View>
        </View>:
        <View style={customStyles.InfoPage}>
        <View style={customStyles.rowContainerImg}>
          <Image 
            source={{uri :API_PATH_FOLDER + photo}} 
            style={customStyles.img} 
          />
          </View>
          <View>
            <List.Item
                title={()=><Text style={customStyles.listHeader}>{`${surname || ''} ${firstname || ''}`}</Text>}
                left={() => <FontAwesomeIcon icon={faUser} />}
            />
             <List.Item
                title={()=><Text style={customStyles.listHeader}>{`${officename || ''}`}</Text>}
                left={() => <FontAwesomeIcon icon={faMapLocation} />}
            />
            <List.Item
                title={()=><Text style={customStyles.listHeader}>{`${headphone1} ${headphone2}`}</Text>}
                left={() => <FontAwesomeIcon icon={faPhoneFlip} />}
            />
            <List.Item
                title={()=><Text style={customStyles.listHeader}>{`${heademail}`}</Text>}
                left={() => <FontAwesomeIcon icon={faEnvelope} />}
            />
          </View>
        </View>

        }
    </PageFixed>
  )
}

export default school