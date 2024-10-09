import React from 'react'
import { Tabs, useLocalSearchParams } from 'expo-router'
import TabScreen from './../../components/TabScreen'

 
const SchemeTabs = () => {
  const params = useLocalSearchParams()
  console.log(params)
    
  return (
       <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown:false }}>
        <TabScreen name="index" headerShown={true} title="Lesson Content" icon="pen" />
        <TabScreen name="summary" headerShown={false} title="Key Points" icon="pen" />
        <TabScreen name="notes" headerShown={true} title="Lesson Notes" icon="pen" />
        <TabScreen name="questions" headerShown={false} title="Quick Test" icon="pen" />
    </Tabs>
  
  )
}

export default SchemeTabs