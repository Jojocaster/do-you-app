import { StyleSheet } from 'react-native'
import { Heading } from '../components/Heading/Heading'

import { Home } from '../components/Home/Home'
import { View } from '../components/Themed'
import { useTheme } from 'styled-components/native'
import { Player } from '../components/Player/Player'
import { Schedule } from '../components/Schedule/Schedule'
import * as Notifications from 'expo-notifications'
import { RootTabScreenProps } from '../../types'
import { Container } from '../components/Container/Container'
//@ts-ignore
import banana from '../../assets/images/banana.png'
import { Slider } from '@sharcoux/slider'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export const VolumeControl = () => {
  return (
    <Slider
      thumbImage={banana}
      thumbSize={30}
      thumbStyle={{ backgroundColor: 'transparent' }}
      style={{ width: 200, height: 20 }}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
    />
  )
}

//TODO: move logic to its own component, only use Screens for data handling
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const theme = useColorScheme()

  return (
    <Home>
      <Container>
        <Heading offset={50}>DO!! YOU!!!</Heading>
      </Container>
      <View
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          marginTop: -20,
          marginBottom: 20,
        }}
      >
        <Player background={'assets/logo.webp'} />
      </View>
      {/* <VolumeControl /> */}
      {/* <View
        style={styles.separator}
        lightColor="rgba(0,0,0,0.1)"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[theme].scheduleBackground,
          paddingHorizontal: 40,
          paddingVertical: 20,
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
    marginVertical: 20,
    marginHorizontal: '10%',
    height: 1,
    width: '80%',
  },
})
