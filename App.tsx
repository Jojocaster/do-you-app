import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { store } from './src/store/store'
import { theme } from './src/theme'
import service from './service'
import TrackPlayer, { Capability } from 'react-native-track-player'
import { Status } from './src/components/Status/Status'
//@ts-ignore
import logo from './assets/images/doyou.webp'
// import * as Updates from 'expo-updates'

TrackPlayer.setupPlayer({ waitForBuffer: true })
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
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider style={{ backgroundColor: '#212020' }}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Status />
            <Navigation colorScheme={colorScheme} />
          </ThemeProvider>
          <StatusBar style={'light'} />
        </Provider>
      </SafeAreaProvider>
    )
  }
}
