import React, { useState } from 'react'
import { View } from '../components/Themed'
import { WebView } from 'react-native-webview'
import { RootTabScreenProps } from '../../types'
import { ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export default function ChatScreen({ navigation }: RootTabScreenProps<'Chat'>) {
  const [loading, setLoading] = useState(true)
  const theme = useColorScheme()

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors[theme].background,
            display: 'flex',
            top: 0,
            bottom: 0,
            left: 0,
            height: '100%',
            zIndex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color={Colors[theme].primary} />
        </View>
      )}

      <WebView
        source={{
          uri: 'https://minnit.chat/DOYOUFAMILY?embed',
        }}
        onLoadEnd={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          //hide loader once loaded
          if (!nativeEvent.loading) {
            setLoading(false)
          }
        }}
      />
    </View>
  )
}
