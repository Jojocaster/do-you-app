import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Container } from '../components/Container/Container'
import { Heading } from '../components/Heading/Heading'
import { Home } from '../components/Home/Home'
import { MonoText } from '../components/StyledText'
import { View } from '../components/Themed'
import { Tracks } from '../components/Tracks/Tracks'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export default function TrackScreen({
  navigation,
}: RootTabScreenProps<'Tracks'>) {
  const theme = useColorScheme()
  return (
    <View style={styles.container}>
      <Home>
        <Container>
          <Heading offset={50}>TODAY'S TRACKS</Heading>
          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            darkColor="rgba(255,255,255,0.05)"
            lightColor="#F8F8F8"
          >
            <MonoText>
              <MaterialCommunityIcons
                name="alert"
                color={Colors[theme].primary}
                size={16}
              />{' '}
              This is still in beta, all tracks may not be identified properly
              just yet.
            </MonoText>
          </View>
          <Tracks />

          {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
        </Container>
      </Home>
    </View>
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
  homeScreenFilename: {
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    padding: 20,
  },
})
