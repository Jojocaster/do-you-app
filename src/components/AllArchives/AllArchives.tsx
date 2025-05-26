import React, { useEffect, useState } from 'react'
import { BananaLoader } from '../BananaLoader/BananaLoader'
import { getArchives } from '../ArchivesList/ArchivesList.utils'
import { ArchiveItem } from '../ArchivesList/ArchivesList.types'
import { FlatList, Image, RefreshControl, View } from 'react-native'
import { ArchiveListItem } from '../ArchiveListItem/ArchiveListItem'
import gif from '../../../assets/images/ezgif-5f13f00e4e5b50.gif'
import { Filter } from '../../store/slices/filtersSlice'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

export const AllArchives: React.FC<{ filter?: Filter }> = ({ filter }) => {
  const { navigate } = useNavigation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [archives, setArchives] = useState<ArchiveItem[]>([])
  const [page, setPage] = useState(1)
  const [limitReached, setLimitReached] = useState(false)

  useEffect(() => {
    loadPage(1)
  }, [])

  const onRefresh = async () => {
    setIsRefreshing(true)

    try {
      const data = await getArchives({ page: 1, filter })

      setArchives(data)
      setPage(1)
    } catch (e) {
      console.log('error while refreshing')
    } finally {
      setIsRefreshing(false)
      setLimitReached(false)
    }
  }

  const loadPage = async (pageNumber: number) => {
    if (limitReached) {
      return
    }

    setLoading(true)

    if (pageNumber === 1) {
      setIsRefreshing(true)
    }

    try {
      const data = await getArchives({ page: pageNumber, filter })

      if (!data.length) {
        setLimitReached(true)
        return
      }

      setArchives([...archives, ...data])
      setPage(pageNumber)
    } catch (e) {
      console.log('oops')
    } finally {
      if (pageNumber === 1) {
        setIsRefreshing(false)
      }
      setLoading(false)
    }
  }

  if (isRefreshing && !archives.length) {
    return <BananaLoader text="Loading archives ..." />
  }

  return (
    <FlatList
      data={archives}
      refreshControl={
        <RefreshControl
          tintColor={Colors.common.pink}
          colors={[Colors.common.purple]}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={(track) => (
        <ArchiveListItem
          onClick={(track) => {
            navigate('ArchiveDetails', { track })
          }}
          track={track.item}
          key={track.index}
        />
      )}
      ListFooterComponentStyle={{
        paddingTop: 16,
        paddingBottom: 16,
      }}
      ListFooterComponent={
        <View style={{ alignItems: 'center' }}>
          {isLoading ? (
            <Image
              resizeMode="contain"
              style={{
                height: 100,
              }}
              source={gif}
            />
          ) : null}
        </View>
      }
      keyExtractor={(track, index) => `${track.id} + ${index}`}
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={50}
      onEndReached={() => {
        loadPage(page + 1)
      }}
      onEndReachedThreshold={0.2}
      contentContainerStyle={{ gap: 24 }}
      overScrollMode="never"
      style={{
        backgroundColor: '#F9F9FB',
        padding: 24,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
