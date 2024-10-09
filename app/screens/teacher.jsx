import React, { useEffect, useState } from 'react'
import PageFixed from '../../components/PageFixed'
import { Appbar, Banner, List } from 'react-native-paper'
import { customStyles } from '../../constants/Styles'
import { GlobalContext } from '../../components/GlobalContextProvider'
import { Image, View } from 'react-native'
import { faEnvelope,  faMapLocation,  faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { API_PATH_FOLDER } from '../db/api'
import useGetHook from '../db/useGetHook'
import { DBContext } from '../_layout'
import { useNavigation } from 'expo-router'
import Page from '../../components/Page'

const teacher = () => {
    const nav = useNavigation()
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    const [visible, setVisible] = useState(0)

    const db = React.useContext(DBContext)
    
    const {subject, school, term, student, clasz} = globalParams || {}
    const {id:schoolid } = school || ''
    const {id:claszid } = clasz || ''
    const {termid, sessionid } = term || ''
    const {data, isLoading:isLoading, error:error, msg:msg, load:loadStaff} = useGetHook({db, table:'staffs', queryType:'select_active_teachers'})
    const {links } = school || ''
    useEffect(() => loadStaff({claszid, termid, sessionid, schoolid}), [claszid, termid, sessionid, schoolid])
    
    const handleSubmit = () =>loadStaff({claszid, termid, sessionid, schoolid})
   

  return (
    <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Class Teacher' />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
        <Banner
              visible={true}
              style={customStyles.banner}
              contentStyle={customStyles.banner}
              titleStyle={customStyles.banner}
             
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
        <Page>
        {
            data && data.map(prop=>{
                let {id, photo, name, phone1, phone2, email } = prop
                return <View key ={id} style={customStyles.InfoPage}>
                <View style={customStyles.rowContainerImg}>
                  <Image 
                    source={{uri :API_PATH_FOLDER + photo}} 
                    style={customStyles.img} 
                  />
                  </View>
                  <View>
                    <List.Item
                        title={`${name || ''}`}
                        left={() => <FontAwesomeIcon icon={faMapLocation} />}
                    />
                    <List.Item
                        title={`${phone1 || ''} ${phone2 || ''}`}
                        left={() => <FontAwesomeIcon icon={faPhoneFlip} />}
                    />
                    <List.Item
                        title={`${email || ''}`}
                        left={() => <FontAwesomeIcon icon={faEnvelope} />}
                    />
                  </View>
                </View>
            })
        }
        </Page>
    </PageFixed>
  )
}

export default teacher