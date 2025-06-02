import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ARCHIVES_URL } from '../../constants/Endpoints'
import { RootState } from '../../store/store'
import { ArchiveListItem } from '../ArchiveListItem/ArchiveListItem'
import { ArchiveItem } from '../ArchivesList/ArchivesList.types'
import { Text } from '../Themed'
import { getRandomArchive } from '../../utils/archives'
import { Button } from '../Button/Button'

export const FavouriteArchives: React.FC<{ isFocused: boolean }> = ({
  isFocused,
}) => {
  const [randomArchive, setRandomArchive] = useState<ArchiveItem>()
  const { archives } = useSelector((state: RootState) => state.savedArchives)
  const navigation = useNavigation()

  const onClick = useCallback((archive: ArchiveItem) => {
    navigation.navigate('ArchiveDetails', {
      track: archive,
    })
  }, [])

  const fetchRandom = async () => {
    const randomArchive = await getRandomArchive()
    setRandomArchive(randomArchive)
  }

  useEffect(() => {
    if (!archives.length) {
      fetchRandom()
    }
  }, [])

  if (!archives.length) {
    return (
      <View
        style={{
          padding: 24,
          backgroundColor: '#F9F9FB',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ alignSelf: 'center' }}>No favourites yet?</Text>
        <Text style={{ alignSelf: 'center', marginTop: 8 }}>
          Here is a random show for you.
        </Text>
        {randomArchive && (
          <View style={{ width: '100%', marginTop: 32 }}>
            <ArchiveListItem
              onClick={() => onClick(randomArchive)}
              track={randomArchive}
            />
          </View>
        )}
        <View style={{ marginTop: 32, alignItems: 'center' }}>
          <Button onPress={() => fetchRandom()} variant="pink">
            Refresh
          </Button>
        </View>
      </View>
    )
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#F9F9FB' }}
      contentContainerStyle={{ padding: 24, gap: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {[...archives]
        .sort((a, b) => b.lastUpdated - a.lastUpdated)
        .map((a) => (
          <ArchiveListItem
            key={a.archive.id}
            track={a.archive}
            onClick={onClick}
          />
        ))}
    </ScrollView>
  )
}
