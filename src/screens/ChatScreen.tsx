import React from 'react'
import { View } from '../components/Themed'
import { WebView } from 'react-native-webview'
import { RootTabScreenProps } from '../../types'

export default function ChatScreen({ navigation }: RootTabScreenProps<'Chat'>) {
  return (
    <WebView
      source={{
        uri: 'https://minnit.chat/DOYOUFAMILY?embed&amp;&amp;nickname=',
      }}
    />
  )
}
