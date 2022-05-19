import { Octicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { ShowStatus } from '../../store/slices/showSlice'
import { fetchTracksInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { Text, View } from '../Themed'
import { Track } from '../Track/Track'

export const Tracks: React.FC = () => {
  const dispatch = useDispatch()
  const [activeTrack, setActiveTrack] = useState<string>()
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

  const onToggle = (track: string) => {
    if (track === activeTrack) {
      setActiveTrack(undefined)
    } else {
      setActiveTrack(track)
    }
  }

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
        testID="loader"
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
        testID="noTracks"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
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
    <FlatList
      data={tracks}
      renderItem={(track) => (
        <Track
          active={activeTrack === track.item.played_datetime}
          onToggle={onToggle}
          track={track.item}
        />
      )}
      keyExtractor={(track) => track.played_datetime}
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={100}
      overScrollMode="never"
      style={{ marginTop: 20, width: '100%' }}
    />
  )
}
