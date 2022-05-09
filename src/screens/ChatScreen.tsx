import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View } from '../components/Themed'
import { WebView } from 'react-native-webview'
import { RootTabScreenProps } from '../../types'
import { ActivityIndicator, Linking, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { CHAT_URL } from '../constants/Endpoints'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useIsFocused } from '@react-navigation/native'

export default function ChatScreen({ navigation }: RootTabScreenProps<'Chat'>) {
  const [loading, setLoading] = useState(true)
  const { batterySaver } = useSelector((state: RootState) => state.settings)
  const chatRef = useRef<WebView>(null)
  const theme = useColorScheme()
  const isFocused = useIsFocused()
  const [showChat, setShowChat] = useState(true)

  const reload = () => {
    setLoading(true)
    chatRef.current?.reload()
  }

  // toggle webview if battery saver enabled on focus update
  useEffect(() => {
    if (batterySaver) {
      setShowChat(isFocused)
      console.log('showChat:', isFocused)
    } else {
      setShowChat(true)
    }
  }, [isFocused])

  // toggle webview on setting update
  useEffect(() => {
    setShowChat(isFocused)
    console.log('showChat:', isFocused)
  }, [batterySaver])

  return useMemo(
    () => (
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

        <View style={{ padding: 10 }}>
          <TouchableOpacity
            onPressOut={reload}
            style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <Text>
              Chat stuck?{' '}
              <Text
                style={{
                  color: Colors[theme].chatText,
                  fontWeight: 'bold',
                  textDecorationStyle: 'solid',
                  textDecorationLine: 'underline',
                }}
              >
                Reload
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {showChat && (
          <WebView
            onError={reload}
            ref={chatRef}
            source={{
              uri: CHAT_URL,
            }}
            onContentProcessDidTerminate={() => {
              console.log('onContentProcessDidTerminate')
              reload()
            }}
            onRenderProcessGone={() => {
              console.log('onRenderProcessGone')
              reload()
            }}
            onNavigationStateChange={(event) => {
              if (event.url !== CHAT_URL) {
                chatRef.current?.stopLoading()
                Linking.openURL(event.url)
              }
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
        )}
      </View>
    ),
    [loading, showChat]
  )
}
