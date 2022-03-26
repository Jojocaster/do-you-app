import { useTheme } from '@react-navigation/native'
import React, { Fragment } from 'react'
import { Text } from 'react-native'
import { useThemeColor } from '../Themed'

export const Heading: React.FC<{ children: string; offset?: number }> = ({
  children,
  offset = 32,
}) => {
  const words = children.split(' ')
  const color = useThemeColor({}, 'primary')

  return (
    <Fragment>
      {words.map((word, i) => (
        <Text
          style={{
            color,
            textShadowColor: '#426DD5',
            textShadowOffset: { width: 3, height: 2 },
            textShadowRadius: 5,
            lineHeight: 64,
            fontFamily: 'Lato_900Black',
            marginBottom: -6,
            fontSize: 64,
            marginLeft: offset * i,
          }}
        >
          {word}
        </Text>
      ))}
    </Fragment>
  )
}
