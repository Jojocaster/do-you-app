import React from 'react'
import { Image, Text, View } from 'react-native'
import gif from '../../../assets/images/ezgif-5f13f00e4e5b50.gif'

export const BananaLoader: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Image
        resizeMode="contain"
        style={{
          height: 200,
        }}
        source={gif}
      />
      {text ? <Text style={{ marginTop: 16 }}>{text}</Text> : null}
    </View>
  )
}
