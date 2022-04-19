import { Octicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { format, parse, parseJSON } from 'date-fns'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { ShowStatus } from '../../store/slices/showSlice'
import { fetchTracksInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { Text, View } from '../Themed'

export const Tracks: React.FC = () => {
  const dispatch = useDispatch()
  const fadeAnim = useRef(new Animated.Value(1)).current
  const theme = useColorScheme()
  const isFocused = useIsFocused()
  const timeout = useRef<NodeJS.Timeout>()
  const { lastUpdated, loading, tracks } = useSelector(
    (state: RootState) => state.tracksInfo
  )
  const { status } = useSelector((state: RootState) => state.show)

  // setup animation
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
  }, [])

  const restartTimer = () => {
    // always clear timeout to prevent leaks
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    // only poll if show is live & screen is focused
    if (status === ShowStatus.ON && isFocused) {
      timeout.current = setTimeout(() => {
        dispatch(fetchTracksInfo())
      }, 1000 * 60)
    }
  }

  const getTracks = async () => {
    // if tracks were never fetched before, request them straight away
    if (!lastUpdated) {
      dispatch(fetchTracksInfo())
    } else {
      const now = new Date().getTime()
      const diff = now - lastUpdated
      const diffInMinutes = diff / (1000 * 60)
      if (diffInMinutes >= 1) {
        dispatch(fetchTracksInfo())
      } else {
        restartTimer()
      }
    }
  }

  useEffect(() => {
    // fetch tracks when tab is focused
    if (isFocused) {
      getTracks()
    }
  }, [isFocused])

  useEffect(() => {
    // restart timer as soon as new tracks have been loaded
    restartTimer()
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
          <Octicons name="radio-tower" size={30} color={Colors[theme].tint} />
        </Animated.View>
        <Text style={{ marginTop: 20, fontFamily: 'Lato_900Black' }}>
          No bangers here - yet
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
