import { useIsFocused, useNavigation } from '@react-navigation/native'
import { differenceInHours } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import Colors from '../../constants/Colors'
import { ARCHIVES_URL } from '../../constants/Endpoints'
import useColorScheme from '../../hooks/useColorScheme'
import { ArchiveListItem } from '../ArchiveListItem/ArchiveListItem'
import { LoadMore } from '../LoadMore/LoadMore'
import { View } from '../Themed'
import { ArchiveItem } from './Archives.types'

export const Archives: React.FC = () => {
  const navigation = useNavigation()
  const theme = useColorScheme()
  const isFocused = useIsFocused()
  const [lastRefreshed, setLastRefreshed] = useState(0)
  const [page, setPage] = useState(1)
  const [archives, setArchives] = useState<ArchiveItem[]>([])
  const [isRefreshing, setRefreshing] = useState(false)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [canLoadMore, setCanLoadMore] = useState(true)

  const loadPage = async (pageNumber: number) => {
    setLoadingMore(true)

    try {
      const response = await fetch(`${ARCHIVES_URL}/shows/page/${pageNumber}/`)
      const data = await response.json()

      if (!data.length) {
        setCanLoadMore(false)
        return
      }

      setArchives([...archives, ...data])
      setPage(pageNumber)
    } catch (e) {
      console.log('error loading page', e)
    } finally {
      setLoadingMore(false)
    }
  }

  const onClick = useCallback((archive: ArchiveItem) => {
    // Next version :)
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

  const onRefresh = async () => {
    setRefreshing(true)

    try {
      const response = await fetch(`${ARCHIVES_URL}/shows/page/1/`)
      const data: ArchiveItem[] = await response.json()

      setArchives(data)
    } catch (e) {
      console.log('error while refreshing')
    } finally {
      setRefreshing(false)
    }
  }

  // load data on mount
  useEffect(() => {
    loadPage(1)
  }, [])

  // refetch data when screen is focused, only if it's been more than an hour since last fetch
  useEffect(() => {
    if (isFocused) {
      const now = new Date().getTime()
      if (differenceInHours(now, lastRefreshed) >= 1) {
        onRefresh()
        setLastRefreshed(now)
      }
    }
  }, [isFocused])

  if (isLoadingMore && !archives.length) {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          tintColor={Colors[theme].primary}
          colors={[Colors[theme].primary]}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      data={archives}
      renderItem={(track) => (
        <ArchiveListItem onClick={(t) => onClick(t)} track={track.item} />
      )}
      ListFooterComponentStyle={{
        paddingTop: 10,
        paddingBottom: 30,
      }}
      ListFooterComponent={
        <LoadMore
          canLoadMore={canLoadMore}
          loadMore={() => loadPage(page + 1)}
          isLoading={isLoadingMore}
        />
      }
      keyExtractor={(track, index) => `${track.id} + ${index}`}
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={50}
      overScrollMode="never"
      style={{
        marginTop: 10,
        width: '100%',
      }}
    />
  )
}
