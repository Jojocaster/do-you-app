import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { Linking } from 'react-native'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import { ARCHIVES_URL } from '../../constants/Endpoints'
import useColorScheme from '../../hooks/useColorScheme'
import { Archive } from '../Archive/Archive'
import { Text, View } from '../Themed'
import { ArchiveItem } from './Archives.types'

const LoadMore: React.FC<{
  canLoadMore: boolean
  loadMore: () => void
  isLoading: boolean
}> = ({ canLoadMore, isLoading, loadMore }) => {
  const theme = useColorScheme()

  if (isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (!canLoadMore) {
    return null
  }

  return (
    <TouchableOpacity onPress={loadMore}>
      <View
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors[theme].primary,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}
        >
          Load more
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const Archives: React.FC = () => {
  // const navigation = useNavigation()
  const theme = useColorScheme()
  const [page, setPage] = useState(1)
  const [archives, setArchives] = useState<ArchiveItem[]>([])
  const [isRefreshing, setRefreshing] = useState(false)
  const [isLoadingMore, setLoadingMore] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)

  const loadPage = async (pageNumber: number) => {
    setLoadingMore(true)

    try {
      const response = await fetch(`${ARCHIVES_URL}/shows/page/${pageNumber}`)
      const data = await response.json()

      if (!data.length) {
        setCanLoadMore(false)
        return
      }

      // cache images for later use
      // for (let archive of data) {
      //   //@ts-ignore
      //   const isCached = await Image.queryCache([archive.picture_url])
      //   if (!isCached) {
      //     await Image.prefetch(archive.picture_url)
      //   }
      // }

      setArchives([...archives, ...data])
      setPage(pageNumber)
    } catch (e) {
      console.log('error loading page', e)
    } finally {
      setLoadingMore(false)
    }
  }

  const onClick = useCallback((archive: ArchiveItem) => {
    Linking.openURL(`https://www.mixcloud.com/do_you_radio/${archive.slug}`)

    // Next version :)
    // navigation.navigate('Root', {
    //   screen: 'Archives',
    //   params: {
    //     screen: 'ArchiveDetails',
    //     params: {
    //       track: archive,
    //     },
    //   },
    // })
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)

    try {
      const response = await fetch(`${ARCHIVES_URL}/shows/page/1`)
      const data: ArchiveItem[] = await response.json()

      // cache images for later use
      // for (let archive of data) {
      //   //@ts-ignore
      //   const isCached = await Image.queryCache([archive.picture_url])
      //   if (!isCached) {
      //     await Image.prefetch(archive.picture_url)
      //   }
      // }

      setArchives(data)
    } catch (e) {
      console.log('error while refreshing')
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadPage(1)
  }, [])

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
          colors={[Colors[theme].primary]}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      data={archives}
      renderItem={(track) => (
        <Archive onClick={(t) => onClick(t)} track={track.item} />
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
