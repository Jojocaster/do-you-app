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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

//TODO: move logic to its own component, only use Screens for data handling
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const theme = useTheme()

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
        }}
      >
        <Player background={'assets/logo.webp'} />
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
