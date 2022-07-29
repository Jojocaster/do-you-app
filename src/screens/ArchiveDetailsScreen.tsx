import { format } from 'date-fns'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { ArchiveDetailsFooter } from '../components/ArchiveDetails/ArchiveDetailsFooter/ArchiveDetailsFooter'
import { ArchiveDetailsHeader } from '../components/ArchiveDetails/ArchiveDetailsHeader/ArchiveDetailsHeader'
import { ArchiveTracklist } from '../components/ArchiveDetails/ArchiveTracklist/ArchiveTracklist'
import { Button2 } from '../components/Button2/Button2'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import Space from '../constants/Space'
import useColorScheme from '../hooks/useColorScheme'
import { formatArchiveTitle } from '../utils/archives'

const Tab: React.FC<{ children: string; color?: string }> = ({
  children,
  color,
}) => (
  <View
    style={{
      paddingBottom: 3,
      flex: 0,
      borderBottomColor: color,
      borderBottomWidth: 2,
    }}
  >
    <Text
      style={{
        color,
        fontFamily: 'Lato_900Black',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 12,
      }}
    >
      {children}
    </Text>
  </View>
)

export default function ArchiveDetailsScreen({
  route,
}: RootTabScreenProps<'ArchiveDetails'>) {
  const { track } = route.params
  const theme = useColorScheme()

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS === 'ios' ? 60 : 20,
        }}
        style={styles.scrollView}
      >
        <ArchiveDetailsHeader track={track} />

        <View
          style={{
            paddingHorizontal: Space.viewPadding,
            paddingVertical: 25,
            flex: 1,
          }}
        >
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 12,
              marginBottom: 5,
            }}
          >
            {format(new Date(track.date), 'E, MMM dd')}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 24,
                color: Colors[theme].primary,
                fontWeight: 'bold',
              }}
            >
              {formatArchiveTitle(track.name)}
            </Text>
          </View>
          <View style={styles.genres}>
            {track.genres?.map((genre, i) => (
              <View key={i} style={{ marginRight: 5, marginBottom: 5 }}>
                <Button2 variant="sm">{genre.name}</Button2>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={styles.tabs}>
              <Tab color={Colors[theme].primary}>Tracklist</Tab>
            </View>

            <ArchiveTracklist track={track} />
          </View>
        </View>
      </ScrollView>
      <ArchiveDetailsFooter slug={track.slug} />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  genres: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
})
