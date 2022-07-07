import { format, parse } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { ArchiveItem } from '../Archives/Archives.types'
import { Text, View } from '../Themed'
import { MIXCLOUD_IMAGE_ENDPOINT } from './Archive.constants'

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  const theme = useColorScheme()
  return useMemo(
    () => (
      <View style={[styles.tag, { backgroundColor: Colors[theme].primary }]}>
        <Text style={{ color: 'white', fontSize: 12 }}>#{tag}</Text>
      </View>
    ),
    [theme]
  )
}

export const Archive: React.FC<{
  track: ArchiveItem
  onClick: (archive: ArchiveItem) => void
}> = ({ onClick, track }) => {
  // const tags = track.tags?.split(', ')
  const theme = useColorScheme()

  const getThumbnail = useCallback((imageUri: string) => {
    return { uri: `${MIXCLOUD_IMAGE_ENDPOINT}/300x300/${imageUri}` }
  }, [])

  const getDate = useCallback((track: ArchiveItem) => {
    try {
      const titleItems = track.name?.split(' - ')
      if (titleItems.length > 1) {
        const formattedDate = parse(titleItems[1], 'dd/M/yy', new Date())
        return format(formattedDate, 'E, MMM dd')
      }
      return format(new Date(track.date), 'E, MMM dd')
    } catch (e) {
      console.log(e)

      return format(new Date(track.date), 'E, MMM dd')
    }
  }, [])

  const formatTitle = useCallback((title: string) => {
    try {
      const titleItems = title.split(' - ')
      return titleItems[0]
    } catch (e) {
      return title
    }
  }, [])

  return useMemo(
    () => (
      <TouchableOpacity onPress={() => onClick(track)}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={getThumbnail(track.picture_url)}
          />
          <View style={styles.content}>
            <Text
              style={{
                textTransform: 'uppercase',
                fontSize: 10,
                marginBottom: 5,
              }}
            >
              {getDate(track)}
            </Text>
            <Text style={styles.showName}>{formatTitle(track.name)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [theme]
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    alignSelf: 'center',
  },
  showName: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  tag: {
    marginRight: 5,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    height: 32,
  },
  thumbnail: {
    height: 100,
    width: 100,
  },
})
