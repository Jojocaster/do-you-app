import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { View } from '../components/Themed'
import { WebView } from 'react-native-webview'
import { RootTabScreenProps } from '../../types'
import { ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { useAppState } from '../hooks/useAppState'

export default function ChatScreen({ navigation }: RootTabScreenProps<'Chat'>) {
  const [loading, setLoading] = useState(true)
  const chatRef = useRef<WebView>(null)
  const [background, setBackground] = useState(false)
  const theme = useColorScheme()
  const appState = useAppState()
  // const timeout = useRef<NodeJS.Timeout>()

  const reload = () => {
    setLoading(true)

    // if (timeout.current) {
    //   clearTimeout(timeout.current)
    // }

    // timeout.current = setTimeout(() => {
    chatRef.current?.reload()
    // }, 200)
  }

  useEffect(() => {
    // store appState in state if app in background
    if (appState === 'background') {
      setBackground(true)
    }

    // once the app is in foreground again, reload the chat to prevent frozen chat
    if (appState !== 'background' && background) {
      setBackground(false)
      reload()
    }
  }, [appState])

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

      {/* TODO: check if reload needed on onContentProcessDidTerminate */}
      <WebView
        onError={reload}
        ref={chatRef}
        source={{
          uri: 'https://minnit.chat/DOYOUFAMILY?embed',
        }}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
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
