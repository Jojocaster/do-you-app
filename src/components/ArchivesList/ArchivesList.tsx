import { useIsFocused, useNavigation } from '@react-navigation/native'
import { differenceInHours } from 'date-fns'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Filter } from '../../store/slices/filtersSlice'
import { ArchiveListItem } from '../ArchiveListItem/ArchiveListItem'

import { LoadMore } from '../LoadMore/LoadMore'
import { ArchiveItem } from './ArchivesList.types'
import { getArchives } from './ArchivesList.utils'

export const ArchivesList: React.FC<{ filter?: Filter }> = ({ filter }) => {
  const navigation = useNavigation()
  const theme = useColorScheme()
  const listRef = useRef<FlatList>(null)
  const isFocused = useIsFocused()
  const [lastRefreshed, setLastRefreshed] = useState(0)
  const [page, setPage] = useState(1)
  const [archives, setArchives] = useState<ArchiveItem[]>([])
  const [isRefreshing, setRefreshing] = useState(false)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [canLoadMore, setCanLoadMore] = useState(true)

  // load data on mount
  useEffect(() => {
    loadPage(1)
  }, [])

  // refresh data when filter changes
  useEffect(() => {
    const refreshList = async () => {
      await onRefresh()
      listRef?.current?.scrollToOffset({ offset: 0, animated: true })
    }

    refreshList()
  }, [filter])

  const loadPage = async (pageNumber: number) => {
    // prevent loading if we reached the end
    if (!canLoadMore) {
      return
    }

    setLoadingMore(true)

    try {
      const data = await getArchives({ page: pageNumber, filter })

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
      const data = await getArchives({ page: 1, filter: filter })

      setArchives(data)
      setPage(1)
    } catch (e) {
      console.log('error while refreshing')
    } finally {
      setRefreshing(false)
      setCanLoadMore(true)
    }
  }

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
      ref={listRef}
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
        <ArchiveListItem onClick={onClick} track={track.item} />
      )}
      ListFooterComponentStyle={{
        paddingTop: 10,
        paddingBottom: 30,
      }}
      ListFooterComponent={
        <LoadMore canLoadMore={canLoadMore} isLoading={isLoadingMore} />
      }
      keyExtractor={(track, index) => `${track.id} + ${index}`}
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={50}
      onEndReached={() => loadPage(page + 1)}
      onEndReachedThreshold={0.2}
      overScrollMode="never"
      style={{
        marginTop: 10,
        width: '100%',
      }}
    />
  )
}
