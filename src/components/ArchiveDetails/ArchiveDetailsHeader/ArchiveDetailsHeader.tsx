import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import {
  Animated,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Colors from '../../../constants/Colors'
import { MIXCLOUD_URL } from '../../../constants/Endpoints'
import { deviceHeight, deviceWidth } from '../../../constants/Layout'
import { MIXCLOUD_IMAGE_ENDPOINT } from '../../ArchiveListItem/ArchiveListItem.constants'
import { ArchiveItem } from '../../ArchivesList/ArchivesList.types'
import { View } from '../../Themed'

export const ArchiveDetailsHeader: React.FC<{
  scrollY: Animated.Value
  track: ArchiveItem
}> = ({ scrollY, track }) => {
  const opacity = useRef(new Animated.Value(0))
  const imageSource = `${MIXCLOUD_IMAGE_ENDPOINT}${track.picture_url}`

  const imageSize = deviceWidth * 0.5

  const headerScroll = scrollY.interpolate({
    inputRange: [0, deviceHeight],
    outputRange: [0, deviceHeight * 0.5],
    extrapolate: 'extend',
  })

  const onLoad = () => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const openMixcloud = () => {
    Linking.openURL(`${MIXCLOUD_URL}/${track.slug}`)
  }

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: Colors.common.yellow,
        },
      ]}
    >
      <Animated.Image
        onLoad={onLoad}
        progressiveRenderingEnabled
        blurRadius={10}
        style={[
          styles.backdrop,
          {
            opacity: opacity.current,
            transform: [{ translateY: headerScroll }],
          },
        ]}
        source={{ uri: imageSource }}
      />
      <Animated.View
        style={{
          borderColor: Colors.common.yellow,
          borderWidth: 3,
          height: imageSize,
          width: imageSize,
        }}
      >
        <ImageBackground source={{ uri: imageSource }} style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={openMixcloud}
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                position: 'absolute',
                width: 46,
                height: 46,
                borderRadius: 50,
                backgroundColor: 'rgba(0, 0, 0, .3)',
              }}
            />
            <MaterialCommunityIcons
              name="play-circle-outline"
              size={60}
              color={Colors.common.yellow}
            />
          </TouchableOpacity>
        </ImageBackground>
      </Animated.View>

      {/* <View style={styles.close}>
        <Pressable
          pressRetentionOffset={20}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            size={30}
            color="white"
            name="arrow-left"
            style={styles.shadow}
          />
        </Pressable>
      </View> */}
      {/* <View style={styles.ctas}>
        <MaterialCommunityIcons
          onPress={openMixcloud}
          name="cloud"
          size={30}
          color="#5000FF"
          style={[styles.shadow, { marginRight: 16 }]}
        />
        <Animated.View
          style={[
            styles.like,
            styles.shadow,
            { transform: [{ scale: heartScale.current }] },
          ]}
        >
          <Pressable
            pressRetentionOffset={20}
            onPress={updateArchive}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <MaterialCommunityIcons
              size={30}
              color="#f54242"
              name={savedArchive ? 'heart' : 'heart-outline'}
            />
          </Pressable>
        </Animated.View>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.3,
  },
  close: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  ctas: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  like: {
    backgroundColor: 'transparent',
  },
  header: {
    height: deviceHeight * 0.45,
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
