import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
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

const Tab: React.FC<{
  active: boolean
  children: string
  onPress?: () => void
}> = ({ active, children, onPress }) => {
  const theme = useColorScheme()
  const opacity = useRef(new Animated.Value(active ? 1 : 0))
  const textOpacity = useRef(new Animated.Value(active ? 1 : 0.5))

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: active ? 1 : 0,
      useNativeDriver: true,
    }).start()
    Animated.timing(textOpacity.current, {
      toValue: active ? 1 : 0.5,
      useNativeDriver: true,
    }).start()
  }, [active])

  return (
    // <TouchableOpacity onPress={onPress}>
    <Animated.View
      style={{
        paddingBottom: 3,
        marginRight: 10,
        flex: 0,
        opacity: textOpacity.current,
        borderBottomColor: Colors[theme].primary,
        borderBottomWidth: 2,
      }}
    >
      <Animated.Text
        style={{
          color: Colors[theme].primary,
          opacity: textOpacity.current,
          fontFamily: 'Lato_900Black',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 14,
        }}
      >
        {children}
      </Animated.Text>
    </Animated.View>
    // </TouchableOpacity>
  )
}

enum Tabs {
  TRACKLIST,
  MORE,
}

export default function ArchiveDetailsScreen({
  route,
}: RootTabScreenProps<'ArchiveDetails'>) {
  const { track } = route.params
  const theme = useColorScheme()
  const scrollY = useRef(new Animated.Value(0)).current
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.TRACKLIST)
  const [tabsHeight, setTabsHeight] = useState<number>()

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Animated.ScrollView
        scrollEventThrottle={8}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS === 'ios' ? 60 : 20,
        }}
        style={styles.scrollView}
      >
        <ArchiveDetailsHeader scrollY={scrollY} track={track} />

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

          <View
            style={{
              marginTop: 20,
              flex: 1,
              height: tabsHeight ? tabsHeight + 40 : undefined,
            }}
          >
            <View style={styles.tabs}>
              <Tab
                active={activeTab === Tabs.TRACKLIST}
                onPress={() => setActiveTab(Tabs.TRACKLIST)}
              >
                Tracklist
              </Tab>
              {/* <Tab
                active={activeTab === Tabs.MORE}
                onPress={() => setActiveTab(Tabs.MORE)}
              >
                More
              </Tab> */}
            </View>

            {activeTab === Tabs.TRACKLIST && (
              <ArchiveTracklist
                onLayout={(e: LayoutChangeEvent) =>
                  setTabsHeight(e.nativeEvent.layout.height)
                }
                track={track}
              />
            )}
            {activeTab === Tabs.MORE && (
              <View style={{ height: 400 }}>
                <Text>test</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.ScrollView>
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
