import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { Track } from '../Track/Track'

export const Tracklist: React.FC<{
  tracks: TrackInfo[]
  showStart?: string
  virtual?: boolean
}> = ({ showStart, tracks, virtual = true }) => {
  const [activeTrack, setActiveTrack] = useState<string>()
  const theme = useColorScheme()

  const onToggle = (track: string) => {
    if (track === activeTrack) {
      setActiveTrack(undefined)
    } else {
      setActiveTrack(track)
    }
  }

  if (!virtual) {
    return (
      <>
        {tracks.map((t, i) => (
          <Track
            key={i}
            showStart={showStart}
            active={activeTrack === t.played_datetime}
            onToggle={onToggle}
            track={t}
          />
        ))}
      </>
    )
  }

  return (
    <FlatList
      data={tracks}
      renderItem={(t) => (
        <Track
          showStart={showStart}
          active={activeTrack === t.item.played_datetime}
          onToggle={onToggle}
          track={t.item}
        />
      )}
      keyExtractor={(track) => track.played_datetime}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      contentContainerStyle={{ paddingTop: Space.viewPaddingVertical }}
      style={{ width: '100%', backgroundColor: Colors[theme].tabs.body }}
    />
  )
}
