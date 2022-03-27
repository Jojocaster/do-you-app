import React from 'react'
import { View } from '../Themed'

export const Container: React.FC = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: 40,
        zIndex: 1,
      }}
    >
      {children}
    </View>
  )
}
