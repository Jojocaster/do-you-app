import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { MonoText } from '../StyledText'
import { View } from '../Themed'
import Constants from 'expo-constants'

export const AppVersion: React.FC = () => {
  const version = Constants.manifest?.version || ''
  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 20,
        padding: 10,
      }}
    >
      <MonoText>
        <Entypo name="code" size={15} /> App version: {version}
      </MonoText>
    </View>
  )
}
