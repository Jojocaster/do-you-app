import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { persistor, store } from './src/store/store'
import { theme } from './src/theme'
import service from './service'
import TrackPlayer, { Capability } from 'react-native-track-player'
import { Status } from './src/components/Status/Status'
//@ts-ignore
import logo from './assets/images/doyou.webp'
import { Platform } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { useCallback } from 'react'
import { View } from './src/components/Themed'
import * as SplashScreen from 'expo-splash-screen'

// Required on iOS (otherwise player will go to pause state while buffering)
// Only makes Android slower to load, hence the condition
TrackPlayer.setupPlayer({ waitForBuffer: Platform.OS === 'ios' })
TrackPlayer.registerPlaybackService(() => service)
TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [Capability.Stop, Capability.Pause, Capability.Play],
  compactCapabilities: [Capability.Stop, Capability.Pause, Capability.Play],
  icon: logo,
})

// Updates.fetchUpdateAsync()

export default function App() {
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
