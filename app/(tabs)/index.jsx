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
 const {scheme} = globalParams || {}
 const {info, data} = scheme
 const {subjectname, tname, tcontent, tobjective} = info
  return (
    <PageFixed>
      <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Topics & Objectives' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
      <Page>
        <Caption style={customStyles.caption}>{tname}</Caption>
        <Subheading>Objectives</Subheading>
        <RenderHTML
          source={{html:tobjective || ''}}
        />
        <Subheading>Topics</Subheading>
        <RenderHTML
          source={{html:tcontent || ''}}
        />
      </Page>
    </PageFixed>
  )
}

export default Index