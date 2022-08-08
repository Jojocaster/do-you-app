import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { Track } from '../Track/Track'

export const Tracklist: React.FC<{
  tracks: TrackInfo[]
  showStart?: string
  virtual?: boolean
}> = ({ showStart, tracks, virtual = true }) => {
  const [activeTrack, setActiveTrack] = useState<string>()

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
      fadingEdgeLength={100}
      overScrollMode="never"
      style={{ width: '100%' }}
    />
  )
}
