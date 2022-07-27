import {
  format,
  intervalToDuration,
  isAfter,
  isBefore,
  parseJSON,
} from 'date-fns'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { TRACKLIST_URL } from '../../../constants/Endpoints'
import useColorScheme from '../../../hooks/useColorScheme'
import { useFetch } from '../../../hooks/useFetch'
import { TrackInfo } from '../../../store/slices/tracksInfoSlice'
import { ArchiveItem } from '../../Archives/Archives.types'
import { Text, View } from '../../Themed'

const filterArchiveTracklist = (data: TrackInfo[] = [], track: ArchiveItem) => {
  if (!data.length) {
    return []
  }

  try {
    const showStart = parseJSON(track.start_time)
    const showEnd = parseJSON(track.end_time)

    const filteredData = data.filter((t) => {
      const timecode = parseJSON(t.played_datetime)
      return isAfter(timecode, showStart) && isBefore(timecode, showEnd)
    })

    return filteredData
  } catch (e) {
    console.log(e)
    return data
  }
}

export const ArchiveTracklist: React.FC<{ track: ArchiveItem }> = ({
  track,
}) => {
  const theme = useColorScheme()
  const date = new Date(track.date)
  const formattedDate = format(date, 'dd/MM/yyyy')

  const { error, data, loading } = useFetch<{ tracks: TrackInfo[] }>(
    `${TRACKLIST_URL}/archive/${formattedDate}`
  )

  const filteredData = filterArchiveTracklist(data?.tracks, track)

  if (loading) {
    return (
      <View>
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (error) {
    return <Text>Oops - we ran into an error.</Text>
  }

  if (!filteredData.length) {
    return (
      <View>
        <Text>No tracklist available.</Text>
      </View>
    )
  }

  return (
    <View>
      {filteredData.map((t, i) => {
        const startShow = parseJSON(track.start_time)
        const trackStart = parseJSON(t.played_datetime)
        const diff = trackStart.getTime() - startShow.getTime()
        const tc = intervalToDuration({ start: 0, end: diff })
        const hours = `${tc.hours}`.padStart(2, '0')
        const minutes = `${tc.minutes}`.padStart(2, '0')
        const seconds = `${tc.seconds}`.padStart(2, '0')

        return (
          <View key={i} style={styles.container}>
            <Text style={{ width: 80 }}>
              {hours}:{minutes}:{seconds}
            </Text>
            <View style={styles.content}>
              <Text>
                {t.title} - {t.artist}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  content: {
    flex: 1,
  },
})
