import React, { useCallback, useMemo } from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'
import { formatArchiveTitle } from '../../utils/archives'
import { ArchiveItem } from '../ArchivesList/ArchivesList.types'
import { Text, View } from '../Themed'
import { MIXCLOUD_IMAGE_ENDPOINT } from './ArchiveListItem.constants'
import moment from 'moment'

export const ArchiveListItem: React.FC<{
  track: ArchiveItem
  onClick: (archive: ArchiveItem) => void
}> = ({ onClick, track }) => {
  const CustomTouchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  const getThumbnail = useCallback((imageUri: string) => {
    return { uri: `${MIXCLOUD_IMAGE_ENDPOINT}/300x300/${imageUri}` }
  }, [])

  return useMemo(
    () => (
      //@ts-ignore
      <CustomTouchable onPress={() => onClick(track)}>
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
              {moment(track.start_time).format('ddd, DD MMM yyyy')}
            </Text>
            <Text style={styles.showName}>
              {formatArchiveTitle(track.name)}
            </Text>
          </View>
        </View>
      </CustomTouchable>
    ),
    [track]
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    // overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'transparent',
    flex: 1,
    marginHorizontal: 24,
    alignSelf: 'center',
  },
  showName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  thumbnail: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 100,
    width: 100,
  },
})
