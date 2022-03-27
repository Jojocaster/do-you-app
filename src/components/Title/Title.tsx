import React from 'react'
import { Text } from '../Themed'

export const Title: React.FC = ({ children }) => {
  return (
    <Text
      style={{
        color: 'white',
        fontFamily: 'Lato_900Black',
        fontSize: 32,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Text>
  )
}
