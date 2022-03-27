import { StyleSheet } from 'react-native'
import { Heading } from '../components/Heading/Heading'

import EditScreenInfo from '../components/EditScreenInfo'
import { Home } from '../components/Home/Home'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useTheme } from 'styled-components/native'
import { Cover } from '../components/Cover/Cover'
import { Schedule } from '../components/Schedule/Schedule'
import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { LIVE_STREAM_URL } from '../constants/Endpoints'

//TODO: move logic to its own component, only use Screens for data handling
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const theme = useTheme()
  const [sound, setSound] = useState<Audio.Sound>()
  const [audioStatus, setStatus] = useState()

  const playSound = async () => {
    if (!sound) {
      try {
        Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        })

        console.log('Loading Sound')
        const { sound, status } = await Audio.Sound.createAsync(
          {
            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          },
          { shouldPlay: true }
        )
        setSound(sound)

        await sound.playAsync()
        console.log('Playing sound')
      } catch (e) {
        console.log('error while playing', e)
      }
    } else {
      sound.pauseAsync()
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <Home>
      <View
        style={{
          backgroundColor: 'transparent',
          paddingHorizontal: 40,
          zIndex: 1,
        }}
      >
        <Heading offset={50}>DO!! YOU!!!</Heading>
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          marginTop: -20,
        }}
      >
        <Cover background={'assets/logo.webp'} onPlay={playSound} />
      </View>
      <View
        style={styles.separator}
        lightColor="rgba(255,255,255,0.1)"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingHorizontal: 40,
        }}
      >
        <Schedule />
      </View>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </Home>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    marginHorizontal: '10%',
    height: 1,
    width: '80%',
  },
})
