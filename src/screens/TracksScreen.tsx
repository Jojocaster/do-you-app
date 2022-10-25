import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Heading } from '../components/Heading/Heading'
import { MonoText } from '../components/StyledText'
import { View } from '../components/Themed'
import { Tracks } from '../components/Tracks/Tracks'
import Colors from '../constants/Colors'
import Space from '../constants/Space'
import useColorScheme from '../hooks/useColorScheme'
import { Weblink } from './MoreScreen'

export default function TrackScreen({
  navigation,
}: RootTabScreenProps<'Tracks'>) {
  const theme = useColorScheme()
  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Heading style={{ fontSize: 28 }} multiline={false}>
          Track IDs
        </Heading>
      </View>
      <View
        style={[
          styles.codeHighlightContainer,
          styles.homeScreenFilename,
          { marginBottom: 20, backgroundColor: Colors[theme].hero },
        ]}
      >
        <MonoText>
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
