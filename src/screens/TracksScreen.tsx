import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Heading } from '../components/Heading/Heading'
import { MonoText } from '../components/StyledText'
import { View } from '../components/Themed'
import { Tracks } from '../components/Tracks/Tracks'
import Colors from '../constants/Colors'
import Space from '../constants/Space'
import { Weblink } from './MoreScreen'

export default function TrackScreen({
  navigation,
}: RootTabScreenProps<'Tracks'>) {
  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Heading offset={50}>TODAY'S TRACKS</Heading>
      </View>
      <View
        style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        darkColor="rgba(255,255,255,0.05)"
        lightColor="#F8F8F8"
      >
        <MonoText>
          <MaterialCommunityIcons
            name="information-outline"
            color={Colors.common.warning}
            size={16}
          />{' '}
          Source:{' '}
          <Weblink uri="https://doyoutrackid.com">doyoutrackid.com</Weblink>
        </MonoText>
      </View>
      <Tracks />

      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Space.viewPadding,
    paddingTop: Space.viewPaddingVertical,
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
    width: '100%',
  },
})
