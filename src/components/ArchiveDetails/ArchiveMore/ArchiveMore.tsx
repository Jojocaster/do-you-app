import React from 'react'
import { ScrollView } from 'react-native'
import { ARCHIVES_URL, TRACKLIST_URL } from '../../../constants/Endpoints'
import { useFetch } from '../../../hooks/useFetch'
import { ArchiveListItem } from '../../ArchiveListItem/ArchiveListItem'
import { ArchiveItem } from '../../ArchivesList/ArchivesList.types'
import { Text } from '../../Themed'

export const ArchiveMore: React.FC<{ track: ArchiveItem }> = ({ track }) => {
  const genres = track.genres?.flatMap((g) => g.id)
  const { error, data, loading } = useFetch<ArchiveItem[]>(
    `${ARCHIVES_URL}/search/`,
    {
      httpOptions: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genres: genres }),
      },
    }
  )

  if (loading) {
    return <Text>Loading</Text>
  }

  if (error || !data) {
    return null
  }

  return (
    <ScrollView>
      {data
        .filter((a) => a.id !== track.id)
        .map((a) => (
          <ArchiveListItem track={a} onClick={() => {}} />
        ))}
    </ScrollView>
  )
}
