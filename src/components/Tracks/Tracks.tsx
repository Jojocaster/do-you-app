import { Octicons } from '@expo/vector-icons'
import { format, parse, parseJSON } from 'date-fns'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { fetchTracksInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { Text, View } from '../Themed'

export const Tracks: React.FC = () => {
  const dispatch = useDispatch()
  const fadeAnim = useRef(new Animated.Value(1)).current
  const theme = useColorScheme()
  const timeout = useRef<NodeJS.Timeout>()
  const { lastUpdated, loading, tracks } = useSelector(
    (state: RootState) => state.tracksInfo
  )

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
    checkTracks()
  }, [])

  const checkTracks = () => {
    console.log('fetching tracks')
    dispatch(fetchTracksInfo())
  }

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      checkTracks()
    }, 1000 * 60)
  }, [lastUpdated])

  if (loading && !tracks.length) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (!loading && !tracks.length) {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Octicons name="radio-tower" size={30} color={'white'} />
        </Animated.View>
        <Text style={{ marginTop: 20, fontFamily: 'Lato_900Black' }}>
          No bangers here (yet?)
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      indicatorStyle="white"
      fadingEdgeLength={100}
      overScrollMode="never"
      style={{ marginTop: 20 }}
    >
      {tracks.map((track) => {
        const timecode = parseJSON(track.played_datetime)
        const formattedTimecode = format(timecode, 'HH:mm')

        return (
          <View
            key={track.played_datetime}
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}
          >
            <View style={{ flexBasis: 60 }}>
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                {formattedTimecode}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                {track.artist} - {track.title}
              </Text>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}
