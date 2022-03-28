import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTracksInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { Text, View } from '../Themed'

export const Tracks: React.FC = () => {
  const dispatch = useDispatch()
  const timeout = useRef<NodeJS.Timeout>()
  const { lastUpdated, tracks } = useSelector(
    (state: RootState) => state.tracksInfo
  )

  useEffect(() => {
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

  return (
    <View style={{ marginTop: 20 }}>
      {tracks.map((track) => {
        const timecode = new Date(track.played_datetime)
        const formattedDate = Intl.DateTimeFormat(undefined, {
          hour: 'numeric',
          minute: 'numeric',
        }).format(timecode)
        return (
          <View
            key={track.played_datetime}
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}
          >
            <View style={{ flexBasis: 50 }}>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {formattedDate} -
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                {track.artist} - {track.title}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
