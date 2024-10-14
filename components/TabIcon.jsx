import { View, Text, Image } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const TabIcon = ({icon, color, name, focused}) => {
console.log(icon)
  return (
    <View className="items-center justify-center gap-2">
        <FontAwesomeIcon
            icon={icon}
            resizeMode="contain"
            tintColor={color}
            className="w-6 h-6"
        />
        <Text className={`${focused ? "b" : ""}`}>
            {name}
        </Text>
    </View>
  )
}

export default TabIcon