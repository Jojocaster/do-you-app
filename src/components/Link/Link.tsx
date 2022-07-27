import React from 'react'
import { Linking } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
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
    <Text
      onPress={onClick}
      style={{
        color: Colors[theme].link,
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
      }}
    >
      {children}
    </Text>
  )
}
