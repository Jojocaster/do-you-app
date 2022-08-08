import React, { useCallback, useMemo } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import useColorScheme from '../../hooks/useColorScheme'
import { formatArchiveDate, formatArchiveTitle } from '../../utils/archives'
import { ArchiveItem } from '../Archives/Archives.types'
import { Text, View } from '../Themed'
import { MIXCLOUD_IMAGE_ENDPOINT } from './ArchiveListItem.constants'

export const ArchiveListItem: React.FC<{
  track: ArchiveItem
  onClick: (archive: ArchiveItem) => void
}> = ({ onClick, track }) => {
  const theme = useColorScheme()

  const getThumbnail = useCallback((imageUri: string) => {
    return { uri: `${MIXCLOUD_IMAGE_ENDPOINT}/300x300/${imageUri}` }
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
              {formatArchiveDate(track)}
            </Text>
            <Text style={styles.showName}>
              {formatArchiveTitle(track.name)}
            </Text>
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
  thumbnail: {
    height: 100,
    width: 100,
  },
})
