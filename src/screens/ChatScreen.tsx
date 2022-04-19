import React from 'react'
import { View } from '../components/Themed'
import { WebView } from 'react-native-webview'

export const ChatScreen: React.FC = () => {
  return (
    <WebView
      source={{
        uri: 'https://minnit.chat/DOYOUFAMILY?embed&amp;&amp;nickname=',
      }}
    />
  )
}
