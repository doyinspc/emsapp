import React, { useState } from 'react'
import PageFixed from '../../components/PageFixed'
import { Appbar, Banner, List, Text } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import { GlobalContext } from '../../components/GlobalContextProvider'
import { Image, View } from 'react-native'
import { faEnvelope,  faMapLocation,  faPhoneFlip, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { API_PATH_FOLDER } from '../db/api'
import { useNavigation } from 'expo-router'

const profile = () => {
    const nav = useNavigation()
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    const [visible, setVisible] = useState(true)

    const {student} = globalParams || {}
    const {id, surname, 
        firstname, middlename, gender, photo:links, g1_name, g2_name, g1_rel, g2_rel, address, 
        g1_phone1, g1_phone2, g2_phone1, g2_phone2, g1_email, g2_email, lga, soo, country } = student || ''

        console.log(student)
  return (
    <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.navigate('auth')} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Profile' />
        </Appbar.Header>
        <Banner
              visible={true}
              style={customStyles.banner}
              contentStyle={customStyles.banner}
              actions={[
                {
                  label: 'Biodata',
                  onPress: () => setVisible(true),
                },
                {
                  label: 'Care Giver',
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
              {`${surname || ''} ${firstname || ''} ${middlename || ''}`}
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
                title={`${gender}`}
                left={() => <FontAwesomeIcon icon={faMapLocation} />}
            />
            <List.Item
                title={`${lga} ${soo}`}
                left={() => <FontAwesomeIcon icon={faMapLocation} />}
            />
            <List.Item
                title={`${g1_phone1 || ''} ${g1_phone2 || ''} ${g2_phone1 || ''} ${g2_phone2 || ''}`}
                left={() => <FontAwesomeIcon icon={faPhoneFlip} />}
            />
            <List.Item
                title={`${g1_email || ''} ${g2_email || ''}`}
                left={() => <FontAwesomeIcon icon={faEnvelope} />}
            />
          </View>
        </View>:
         <View style={customStyles.InfoPage}>
         <View style={customStyles.rowContainerImg}>
           <Image 
             source={{uri :API_PATH_FOLDER + links}} 
             style={customStyles.img} 
           />
        </View>
           <View>
              <List.Item
                 title={()=><Text style={customStyles.listHeader}>{g1_name || ''}</Text>}
                 description={()=><View>
                    <Text>{g1_rel || '-'}</Text>
                    <Text>{`${g1_phone1 || ''} ${g1_phone2 || ''}`}</Text>
                </View>}
                 left={() => <FontAwesomeIcon icon={faUser} />}
             />
             <List.Item
                 title={()=><Text style={customStyles.listHeader}>{g2_name || ''}</Text>}
                 description={()=><View>
                    <Text>{g2_rel || '-'}</Text>
                    <Text>{`${g2_phone1 || ''} ${g2_phone2 || ''}`}</Text>
                </View>}
                 left={() => <FontAwesomeIcon icon={faUser} />}
             />
           </View>
         </View>}
    </PageFixed>
  )
}

export default profile