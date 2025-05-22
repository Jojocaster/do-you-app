import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player'
import * as Sentry from '@sentry/react-native'
import { Provider, useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import service from './service'
import { Status } from './src/components/Status/Status'
import useCachedResources from './src/hooks/useCachedResources'
import Navigation from './src/navigation'
import { persistor, store } from './src/store/store'
import { theme } from './src/theme'
//@ts-ignore
import * as SplashScreen from 'expo-splash-screen'
import * as TaskManager from 'expo-task-manager'
import { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { View } from './src/components/Themed'
import { BACKGROUND_FETCH_TASK } from './src/constants/Tasks'
import { fetchShowInBackground } from './src/utils/tasks'
import { fetchConfig } from './src/store/slices/appSlice'

// Required on iOS (otherwise player will go to pause state while buffering)
// Only makes Android slower to load, hence the condition
TrackPlayer.setupPlayer({ waitForBuffer: Platform.OS === 'ios' }).then(() => {
  TrackPlayer.updateOptions({
    android: {
      alwaysPauseOnInterruption: true,
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    capabilities: [Capability.Stop, Capability.Pause, Capability.Play],
    notificationCapabilities: [
      Capability.Stop,
      Capability.Pause,
      Capability.Play,
    ],
    compactCapabilities: [Capability.Stop, Capability.Pause, Capability.Play],
  })
})
TrackPlayer.registerPlaybackService(() => service)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, fetchShowInBackground)
// Define task to fetch show info in background

Sentry.init({
  dsn: 'https://2a5ac7b95ce9e24c9a80062ab1757144@o4505204088766464.ingest.us.sentry.io/4509360367075328',
})

function App() {
  const isLoadingComplete = useCachedResources()

  // const colorScheme = useColorScheme()
  const onLayout = useCallback(async () => {
    if (isLoadingComplete) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [isLoadingComplete])

  useEffect(() => {
    // fetch config on load
    store.dispatch(fetchConfig())
  }, [])

  if (!isLoadingComplete) {
    return null
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: '#212020' }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{ height: '100%' }} onLayout={onLayout}>
            <ThemeProvider theme={theme}>
              <Status />
              <Navigation colorScheme={null} />
            </ThemeProvider>
            <StatusBar style={'light'} />
          </View>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default Sentry.wrap(App)
