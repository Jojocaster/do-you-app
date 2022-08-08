import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Platform } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Text, View } from '../components/Themed'
import ArchiveDetailsScreen from './ArchiveDetailsScreen'
import ArchivesListScreen from './ArchivesListScreen'

const Stack = createNativeStackNavigator()

export default function ArchivesScreen({
  navigation,
}: RootTabScreenProps<'Archives'>) {
  // const [loading, setLoading] = useState(true)
  // const chatRef = useRef<WebView>(null)
  // const [background, setBackground] = useState(false)
  // const theme = useColorScheme()
  // const appState = useAppState()
  // // const timeout = useRef<NodeJS.Timeout>()

  // const reload = () => {
  //   setLoading(true)

  //   // if (timeout.current) {
  //   //   clearTimeout(timeout.current)
  //   // }

  //   // timeout.current = setTimeout(() => {
  //   chatRef.current?.reload()
  //   // }, 200)
  // }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ArchivesList" component={ArchivesListScreen} />
        <Stack.Screen
          name="ArchiveDetails"
          options={{
            animation:
              Platform.OS === 'android' ? 'slide_from_right' : 'default',
          }}
          component={ArchiveDetailsScreen}
        />
      </Stack.Navigator>
    </View>
  )

  // useEffect(() => {
  //   // store appState in state if app in background
  //   if (appState === 'background') {
  //     setBackground(true)
  //   }

  //   // once the app is in foreground again, reload the chat to prevent frozen chat
  //   if (appState !== 'background' && background) {
  //     setBackground(false)
  //     reload()
  //   }
  // }, [appState])

  // return (
  //   <View style={{ position: 'relative', height: '100%' }}>
  //     {/* TODO: check if reload needed on onContentProcessDidTerminate */}
  //     <WebView
  //       javaScriptEnabled={true}
  //       ref={chatRef}
  //       originWhitelist={['*']}
  //       source={{
  //         html: `<!DOCTYPE html>
  // 				<html lang="en">
  // 				<head>
  // 					<meta charset="UTF-8">
  // 					<meta http-equiv="X-UA-Compatible" content="IE=edge">
  // 					<meta name="viewport" content="width=device-width, initial-scale=1.0">
  // 					<title>Document</title>
  // 				</head>
  // 				<body style="margin: 0">
  // 					<iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=${
  //             theme === 'light' ? 1 : 0
  //           }&autoplay=1&feed=/do_you_radio/lorenzos-record-shop-show-w-lorenzo-and-narmy/" frameborder="0" allow="autoplay"></iframe>
  // 				</body>
  // 				</html>`,
  //       }}
  //     />
  //   </View>
  // )
}
