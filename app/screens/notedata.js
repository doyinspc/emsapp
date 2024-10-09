import React, { useContext } from 'react'
import { GlobalContext } from '../../components/GlobalContextProvider'
import Page from '../../components/Page'
import { Caption, Subheading, Paragraph, Title, Headline, Appbar } from 'react-native-paper'
import RenderHTML from 'react-native-render-html'
import { customStyles } from '../../constants/Styles'
import PageFixed from '../../components/PageFixed'
import { router, useNavigation } from 'expo-router'

const Index = () => {
 const nav = useNavigation()
 const {globalParams, updateGlobalParams} = useContext(GlobalContext)
 const {note} = globalParams || {}
 const { title, typeid, note:notedata } = note
  return (
    <PageFixed>
      <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Notes' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
        </Appbar.Header>
      <Page>
        <Caption style={customStyles.caption}>{title}</Caption>
        {typeid == 1?
        <RenderHTML
          source={{html:notedata || ''}}
        />:null}
      </Page>
    </PageFixed>
  )
}

export default Index