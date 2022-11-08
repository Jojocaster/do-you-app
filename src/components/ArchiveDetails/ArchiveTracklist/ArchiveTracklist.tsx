import { format, isAfter, isBefore, parseJSON } from 'date-fns'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import Colors from '../../../constants/Colors'
import { TRACKLIST_URL } from '../../../constants/Endpoints'
import useColorScheme from '../../../hooks/useColorScheme'
import { useFetch } from '../../../hooks/useFetch'
import { TrackInfo } from '../../../store/slices/tracksInfoSlice'
import { ArchiveItem } from '../../ArchivesList/ArchivesList.types'
import { Text, View } from '../../Themed'
import { Tracklist } from '../../Tracklist/Tracklist'

const filterArchiveTracklist = (data: TrackInfo[] = [], track: ArchiveItem) => {
  if (!data.length) {
    return []
  }

  try {
    const showStart = parseJSON(track.start_time)
    const showEnd = parseJSON(track.end_time)

    const filteredData = data.filter((t) => {
      const date = t.played_datetime.split(' ')
      const time = date[1].split('+')
      const timecode = parseJSON(`${date[0]}T${time[0]}`)

      return isAfter(timecode, showStart) && isBefore(timecode, showEnd)
    })

    return filteredData
  } catch (e) {
    console.log(e)
    return data
  }
}

export const ArchiveTracklist: React.FC<{
  onLayout: any
  track: ArchiveItem
}> = ({ onLayout, track }) => {
  const theme = useColorScheme()
  const date = new Date(track.date)
  const formattedDate = format(date, 'dd/MM/yyyy')

  const { error, data, loading } = useFetch<{ tracks: TrackInfo[] }>(
    `${TRACKLIST_URL}/archive/${formattedDate}`
  )

  const filteredData = filterArchiveTracklist(data?.tracks, track)

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (error) {
    return <Text>Oops - we ran into an error.</Text>
  }

  if (!filteredData.length && !loading) {
    return (
      <View>
        <Text>No tracklist available.</Text>
      </View>
    )
  }

  return (
    <View onLayout={onLayout}>
      <Tracklist
        virtual={false}
        tracks={filteredData}
        showStart={track.start_time}
      />
    </View>
  )
}
