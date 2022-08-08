import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Animated, ImageBackground, Pressable, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { deviceHeight, deviceWidth } from '../../../constants/Layout'
import useColorScheme from '../../../hooks/useColorScheme'
import { MIXCLOUD_IMAGE_ENDPOINT } from '../../ArchiveListItem/ArchiveListItem.constants'
import { ArchiveItem } from '../../Archives/Archives.types'
import { View } from '../../Themed'

export const ArchiveDetailsHeader: React.FC<{
  scrollY: Animated.Value
  track: ArchiveItem
}> = ({ scrollY, track }) => {
  const theme = useColorScheme()
  const navigation = useNavigation()
  const opacity = useRef(new Animated.Value(0))
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
        <ImageBackground source={{ uri: imageSource }} style={{ flex: 1 }} />
      </Animated.View>
      <View style={styles.close}>
        <Pressable
          pressRetentionOffset={20}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons size={36} color="white" name="arrow-left" />
        </Pressable>
      </View>
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
