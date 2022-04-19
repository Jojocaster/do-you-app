import { useTheme } from '@react-navigation/native'
import React, { Fragment } from 'react'
import { Text } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { useThemeColor, View } from '../Themed'

export const Heading: React.FC<{ children: string; offset?: number }> = ({
  children,
  offset = 32,
}) => {
  const words = children.split(' ')
  const theme = useColorScheme()

  return (
    <View style={{ zIndex: 1, backgroundColor: 'transparent' }}>
      {words.map((word, i) => (
        <Text
          key={i}
          style={{
            color: Colors[theme].heading,
            textShadowColor: Colors[theme].headingShadow,
            textShadowOffset: { width: 3, height: 2 },
            textShadowRadius: 1,
            lineHeight: 48,
            fontFamily: 'Lato_900Black',
            marginBottom: -6,
            fontSize: 48,
            marginLeft: offset * i,
          }}
        >
          {word}
        </Text>
      ))}
    </View>
  )
}
