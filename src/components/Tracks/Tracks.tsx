import { useIsFocused } from '@react-navigation/native'
import { isToday } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ShowStatus } from '../../store/slices/showSlice'
import { fetchTracksInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { Loader } from '../Loader/Loader'
import { Track } from '../Track/Track'

export const Tracks: React.FC = () => {
  const dispatch = useDispatch()
  const [activeTrack, setActiveTrack] = useState<string>()
  const isFocused = useIsFocused()
  const timeout = useRef<NodeJS.Timeout>()
  const { lastUpdated, loading, tracks } = useSelector(
    (state: RootState) => state.tracksInfo
  )
  const { status } = useSelector((state: RootState) => state.show)

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

  if ((loading && !tracks.length) || (loading && !isToday(lastUpdated))) {
    return <Loader testID="loader">Loading bangers</Loader>
  }

  if ((!loading && !tracks.length) || (!loading && !isToday(lastUpdated))) {
    return <Loader testID="noTracks">No bangers here - yet</Loader>
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
