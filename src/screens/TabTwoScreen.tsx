import { StyleSheet } from 'react-native'
import { Container } from '../components/Container/Container'

import EditScreenInfo from '../components/EditScreenInfo'
import { Heading } from '../components/Heading/Heading'
import { Home } from '../components/Home/Home'
import { MonoText } from '../components/StyledText'
import { Text, View } from '../components/Themed'
import { Tracks } from '../components/Tracks/Tracks'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Home>
        <Container>
          <Heading offset={50}>TODAY'S TRACKS</Heading>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            darkColor="rgba(255,255,255,0.05)"
            lightColor="rgba(0,0,0,0.05)"
          >
            <MonoText>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'initial',
                }}
              >
                Note:
              </Text>{' '}
              this is still in beta, all tracks may not be identified properly
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
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    padding: 20,
  },
})
