import React, { useEffect, useRef, useState } from 'react'
import { Animated, Linking, Platform, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import Colors from '../../../constants/Colors'
import { MIXCLOUD_URL, MIXCLOUD_WEBVIEW } from '../../../constants/Endpoints'
import { deviceWidth } from '../../../constants/Layout'
import useColorScheme from '../../../hooks/useColorScheme'
import { Link } from '../../Link/Link'
import { View } from '../../Themed'

const VIEW_HEIGHT = 60

export const ArchiveDetailsFooter: React.FC<{ slug: string }> = ({ slug }) => {
  const theme = useColorScheme()
  const [showWebview, setShowWebview] = useState(true)
  const uri = `${MIXCLOUD_WEBVIEW}/${slug}/${theme === 'light' ? 1 : 0}`
  const webview = useRef<WebView>(null)
  const translateY = useRef(new Animated.Value(VIEW_HEIGHT))

  useEffect(() => {
    return () => {
      // setShowWebview(false)
      // const message = { source: 'app', type: 'pause' }
      // webview.current?.postMessage(JSON.stringify(message))

      setShowWebview(false)
    }
  }, [])

  const onMessage = (e: any) => {
    const event = JSON.parse(e.nativeEvent.data)
    console.log(event)

    if (event.type === 'loaded') {
      Animated.timing(translateY.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }

  if (Platform.OS === 'android') {
    return (
      <View
        style={[
          styles.view,
          styles.androidView,
          { backgroundColor: Colors[theme].archive.webviewBackground },
        ]}
      >
        <Link link={`${MIXCLOUD_URL}/${slug}`}>Listen on Mixcloud</Link>
      </View>
    )
  }

  if (!showWebview) {
    return null
  }

  return (
    <Animated.View
      style={[
        styles.view,
        {
          height: VIEW_HEIGHT,
          backgroundColor: 'transparent',
          transform: [{ translateY: translateY.current }],
        },
      ]}
    >
      <WebView
        // needed to prevent Android from crashing ...
        // see https://github.com/react-native-webview/react-native-webview/issues/811
        style={{ opacity: 0.99, overflow: 'hidden' }}
        ref={webview}
        onNavigationStateChange={(e) => {
          if (e.url !== uri) {
            webview.current?.stopLoading()
            Linking.openURL(e.url)
          }
        }}
        scrollEnabled={false}
        onMessage={onMessage}
        source={{
          uri,
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: deviceWidth,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  androidView: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
