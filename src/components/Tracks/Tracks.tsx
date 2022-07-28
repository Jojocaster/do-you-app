import { useIsFocused } from '@react-navigation/native'
import { isToday } from 'date-fns'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShowStatus } from '../../store/slices/showSlice'
import { fetchTracksInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { Loader } from '../Loader/Loader'
import { Tracklist } from '../Tracklist/Tracklist'

export const Tracks: React.FC = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const timeout = useRef<NodeJS.Timeout>()
  const { lastUpdated, loading, tracks } = useSelector(
    (state: RootState) => state.tracksInfo
  )
  const { status } = useSelector((state: RootState) => state.show)

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

  return <Tracklist tracks={tracks} />
}
