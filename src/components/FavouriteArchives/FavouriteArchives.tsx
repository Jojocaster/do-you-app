import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { ARCHIVES_URL } from '../../constants/Endpoints'
import { RootState } from '../../store/store'
import { ArchiveListItem } from '../ArchiveListItem/ArchiveListItem'
import { ArchiveItem } from '../ArchivesList/ArchivesList.types'
import { Text } from '../Themed'

export const FavouriteArchives = () => {
  const [randomArchive, setRandomArchive] = useState<ArchiveItem>()
  const { archives } = useSelector((state: RootState) => state.savedArchives)
  const navigation = useNavigation()

  const onClick = useCallback((archive: ArchiveItem) => {
    navigation.navigate('Root', {
      screen: 'Archives',
      params: {
        //@ts-ignore
        screen: 'ArchiveDetails',
        params: {
          track: archive,
        },
      },
    })
  }, [])

  const fetchRandom = async () => {
    const response = await fetch(`${ARCHIVES_URL}/shows/random/`)
    const data = await response.json()
    setRandomArchive(data)
  }

  useEffect(() => {
    if (!archives.length) {
      fetchRandom()
    }
  }, [archives])

  if (!archives.length) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ alignSelf: 'center' }}>No favourites yet?</Text>
        <Text style={{ alignSelf: 'center' }}>
          Here is a random show for you.
        </Text>
        {randomArchive && (
          <View style={{ width: '100%', marginTop: 20 }}>
            <ArchiveListItem
              onClick={() => onClick(randomArchive)}
              track={randomArchive}
            />
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={{ marginTop: 20 }}>
      {[...archives]
        .sort((a, b) => b.lastUpdated - a.lastUpdated)
        .map((a) => (
          <ArchiveListItem
            key={a.archive.id}
            track={a.archive}
            onClick={onClick}
          />
        ))}
    </View>
  )
}
