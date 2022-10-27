import React, { useCallback, useMemo } from 'react'
import { Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import useColorScheme from '../../hooks/useColorScheme'
import { formatArchiveDate, formatArchiveTitle } from '../../utils/archives'
import { ArchiveItem } from '../ArchivesList/ArchivesList.types'
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
      <TouchableNativeFeedback onPress={() => onClick(track)}>
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
      </TouchableNativeFeedback>
    ),
    [theme]
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  content: {
    backgroundColor: 'transparent',
    flex: 1,
    marginHorizontal: 20,
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
