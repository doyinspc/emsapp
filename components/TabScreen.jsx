import React from 'react'
import { Tabs } from 'expo-router'
import TabIcon from './TabIcon'

const TabScreen = (props) => {
    const {name, title, headerShown, icon,  color, focused} = props
  return (
    <Tabs.Screen
        name={name}
        headerShown={false}
        options={{
            title:title,
            headerShown:false,
            tabBarIcon:()=>{
                <TabIcon 
                    icon={icon} 
                    color={color} 
                    name={title} 
                    focused={focused} 
                />
            }

        }}
    />
  )
}

export default TabScreen