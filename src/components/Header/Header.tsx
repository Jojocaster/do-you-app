import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../../constants/Colors'

export const Header = ({ title, children }) => {
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: Colors.common.purple,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontFamily: 'Lato_700Bold',
          color: 'white',
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}
