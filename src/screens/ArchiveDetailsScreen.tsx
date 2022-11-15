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

export default function ArchiveDetailsScreen({
  route,
}: RootTabScreenProps<'ArchiveDetails'>) {
  const { track } = route.params
  const theme = useColorScheme()
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Animated.ScrollView
        overScrollMode="never"
        nestedScrollEnabled
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
          paddingBottom: Platform.OS === 'ios' ? 60 : 0,
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
        </View>
        <ArchiveTracklist track={track} />
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
