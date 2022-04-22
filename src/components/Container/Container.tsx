import React from 'react'
import { View } from '../Themed'

export const Container: React.FC<{ style?: any }> = ({ children, style }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        marginHorizontal: 40,
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </View>
  )
}
