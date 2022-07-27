import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { Animated, ImageBackground, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { deviceHeight, deviceWidth } from '../../../constants/Layout'
import useColorScheme from '../../../hooks/useColorScheme'
import { MIXCLOUD_IMAGE_ENDPOINT } from '../../ArchiveListItem/ArchiveListItem.constants'
import { ArchiveItem } from '../../Archives/Archives.types'
import { View } from '../../Themed'

export const ArchiveDetailsHeader: React.FC<{ track: ArchiveItem }> = ({
  track,
}) => {
  const theme = useColorScheme()
  const opacity = useRef(new Animated.Value(0))
  const imageSource = `${MIXCLOUD_IMAGE_ENDPOINT}${track.picture_url}`
  const imageSize = deviceWidth / 2

  const onLoad = () => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: Colors[theme].scheduleBackground,
        },
      ]}
    >
      <Animated.Image
        onLoad={onLoad}
        progressiveRenderingEnabled
        blurRadius={20}
        style={[
          styles.backdrop,
          {
            opacity: opacity.current,
          },
        ]}
        source={{ uri: imageSource }}
      />
      <View
        style={{
          borderColor: Colors[theme].secondary,
          borderWidth: 3,
          height: imageSize,
          width: imageSize,
        }}
      >
        <ImageBackground source={{ uri: imageSource }} style={{ flex: 1 }} />
      </View>
      {/* <Badge
        style={{ marginTop: 10 }}
        backgroundColor={Colors[theme].primary}
        color="white"
      >
        {format(track.audio_length * 1000, 'hh:mm:ss')}
      </Badge> */}
      <MaterialCommunityIcons
        size={36}
        color="white"
        name="arrow-left"
        style={styles.close}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  header: {
    height: deviceHeight * 0.4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backdrop: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    height: '200%',
    width: '200%',
  },
})
