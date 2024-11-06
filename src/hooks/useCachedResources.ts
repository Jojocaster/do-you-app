import { useFonts, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  let [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_900Black,
  })

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        // setTimeout(() => {
        //   SplashScreen.hideAsync()
        // }, 300)
      }
    }
    if (fontsLoaded) {
      loadResourcesAndDataAsync()
    }
  }, [fontsLoaded])

  return isLoadingComplete
}
