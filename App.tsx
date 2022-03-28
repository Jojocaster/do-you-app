import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { ThemeContext, ThemeProvider } from 'styled-components/native'

import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { store } from './src/store/store'
import { theme } from './src/theme'

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
            <Navigation colorScheme={colorScheme} />
          </ThemeProvider>
          <StatusBar style={'light'} />
        </Provider>
      </SafeAreaProvider>
    )
  }
}
