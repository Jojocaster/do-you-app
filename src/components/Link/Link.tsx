import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text } from '../Themed'

export const Link: React.FC<{ link: string; children: string }> = ({
  link,
  children,
}) => {
  const theme = useColorScheme()
  const onClick = () => {
    Linking.openURL(link)
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <Text
        style={{
          color: Colors[theme].link,
          fontWeight: 'bold',
          textDecorationStyle: 'solid',
          textDecorationLine: 'underline',
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
