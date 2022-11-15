import { format, isAfter, isBefore, parseJSON } from 'date-fns'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, useWindowDimensions } from 'react-native'
import Colors from '../../../constants/Colors'
import { TRACKLIST_URL } from '../../../constants/Endpoints'
import Space from '../../../constants/Space'
import useColorScheme from '../../../hooks/useColorScheme'
import { useFetch } from '../../../hooks/useFetch'
import { TrackInfo } from '../../../store/slices/tracksInfoSlice'
import { ArchiveItem } from '../../ArchivesList/ArchivesList.types'
import { Tabs } from '../../Tabs/Tabs'
import { Text, View } from '../../Themed'
import { Tracklist } from '../../Tracklist/Tracklist'
import { ArchiveMore } from '../ArchiveMore/ArchiveMore'

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
  track: ArchiveItem
}> = ({ track }) => {
  const theme = useColorScheme()
  const date = new Date(track.date)
  const layout = useWindowDimensions()
  const [height, setHeight] = useState(400)
  const formattedDate = format(date, 'dd/MM/yyyy')

  const { error, data, loading } = useFetch<{ tracks: TrackInfo[] }>(
    `${TRACKLIST_URL}/archive/${formattedDate}`
  )

  const filteredData = filterArchiveTracklist(data?.tracks, track)

  const FirstRoute = useCallback(
    () => (
      <Tracklist
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        virtual={false}
        tracks={filteredData}
        showStart={track.start_time}
      />
    ),
    [filteredData.length]
  )

  // const SecondRoute = useCallback(() => <ArchiveMore track={track} />, [theme])

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: Space.viewPadding,
        }}
      >
        <Text>Oops - we ran into an error.</Text>
      </View>
    )
  }

  if (!filteredData.length && !loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: Space.viewPadding,
        }}
      >
        <Text>No tracklist available.</Text>
      </View>
    )
  }

  return (
    <Tabs
      style={{ height }}
      routes={[
        { key: 'first', title: 'Tracklist' },
        // { key: 'second', title: 'More' },
      ]}
      scene={{ first: FirstRoute }}
    />
  )
}
