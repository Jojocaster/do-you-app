import { StyleSheet } from 'react-native'
import { Heading } from '../components/Heading/Heading'

import { Home } from '../components/Home/Home'
import { View } from '../components/Themed'
// import { useTheme } from 'styled-components/native'
import { Player } from '../components/Player/Player'
import { Schedule } from '../components/Schedule/Schedule'
import * as Notifications from 'expo-notifications'
import { RootTabScreenProps } from '../../types'
import { Container } from '../components/Container/Container'
// import { Slider } from '@sharcoux/slider'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

// export const VolumeControl = () => {
//   return (
//     <Slider
//       thumbImage={banana}
//       thumbSize={30}
//       thumbStyle={{ backgroundColor: 'transparent' }}
//       style={{ width: 200, height: 20 }}
//       minimumValue={0}
//       maximumValue={1}
//       minimumTrackTintColor="#FFFFFF"
//       maximumTrackTintColor="#000000"
//     />
//   )
// }

export default function LiveScreen({ navigation }: RootTabScreenProps<'Live'>) {
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
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[theme].scheduleBackground,
          paddingHorizontal: 40,
          paddingTop: 20,
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
