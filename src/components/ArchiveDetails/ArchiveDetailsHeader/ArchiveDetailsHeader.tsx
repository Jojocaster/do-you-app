import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import {
  Animated,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../../constants/Colors'
import { MIXCLOUD_URL } from '../../../constants/Endpoints'
import { deviceHeight, deviceWidth } from '../../../constants/Layout'
import useColorScheme from '../../../hooks/useColorScheme'
import {
  addArchive,
  deleteArchive,
} from '../../../store/slices/savedArchivesSlice'
import { RootState } from '../../../store/store'
import { MIXCLOUD_IMAGE_ENDPOINT } from '../../ArchiveListItem/ArchiveListItem.constants'
import { ArchiveItem } from '../../ArchivesList/ArchivesList.types'
import { Button2 } from '../../Button2/Button2'
import { View } from '../../Themed'

export const ArchiveDetailsHeader: React.FC<{
  scrollY: Animated.Value
  track: ArchiveItem
}> = ({ scrollY, track }) => {
  const dispatch = useDispatch()
  const { archives } = useSelector((state: RootState) => state.savedArchives)
  const savedArchive = archives?.find((a) => a.archive.id === track.id)
  const theme = useColorScheme()
  const navigation = useNavigation()
  const opacity = useRef(new Animated.Value(0))
  const heartScale = useRef(new Animated.Value(1))
  const imageSource = `${MIXCLOUD_IMAGE_ENDPOINT}${track.picture_url}`
  const imageSize = deviceWidth / 2

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

  const updateArchive = () => {
    if (savedArchive) {
      dispatch(deleteArchive(track))
    } else {
      dispatch(addArchive(track))
    }
  }

  const onPressIn = () => {
    Animated.spring(heartScale.current, {
      toValue: 0.8,
      friction: 4,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(heartScale.current, {
      toValue: 1,
      friction: 2,
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
            transform: [{ translateY: headerScroll }],
          },
        ]}
        source={{ uri: imageSource }}
      />
      <Animated.View
        style={{
          borderColor: Colors[theme].secondary,
          borderWidth: 3,
          height: imageSize,
          width: imageSize,
          // transform: [{ translateY: imageScroll }],
        }}
      >
        <ImageBackground source={{ uri: imageSource }} style={{ flex: 1 }}>
          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`${MIXCLOUD_URL}/${track.slug}`)}
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
                color={Colors[theme].secondary}
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </Animated.View>

      <View style={styles.close}>
        <Pressable
          pressRetentionOffset={20}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons size={30} color="white" name="arrow-left" />
        </Pressable>
      </View>
      <Animated.View
        style={[styles.like, { transform: [{ scale: heartScale.current }] }]}
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
    </View>
  )
}

const styles = StyleSheet.create({
  close: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  like: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    right: 20,
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
