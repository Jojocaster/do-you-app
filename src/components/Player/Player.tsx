import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  ImageBackground,
  TouchableHighlight,
} from 'react-native'
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { LIVE_STREAM_URL } from '../../constants/Endpoints'
import useColorScheme from '../../hooks/useColorScheme'
import { RootState, useAppDispatch } from '../../store/store'
import { View } from '../Themed'
import {
  ARTIST_NAME,
  DEFAULT_SHOW_NAME,
  PLAYER_SIZE,
  PlayerStateIcons,
  STREAM_HEADERS,
} from './Player.constants'
import { StyledCover } from './Player.styles'
//@ts-ignore
import logo from '../../../assets/images/doyou.webp'
import useCustomTheme from '../../hooks/useCustomTheme'
import { fetchShowInfo } from '../../store/slices/showSlice'
import { getShowTitle } from '../../utils/show'
import {
  registerBackgroundTask,
  unregisterBackgroundTask,
} from '../../utils/tasks'

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useAppDispatch()
  const [playerState, setPlayerState] = useState<State>(State.None)
  const theme = useColorScheme()
  const customTheme = useCustomTheme()
  const buttonAnimation = useRef(new Animated.Value(0)).current
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )
  const { config } = useSelector((state: RootState) => state.app)
  const { batterySaver } = useSelector((state: RootState) => state.settings)
  const currentTitle = getShowTitle({ currentShow, currentTrack })

  const initPlayer = async () => {
    // fetch show info before init player
    dispatch(fetchShowInfo())

    if (!batterySaver) {
      try {
        await registerBackgroundTask()
      } catch (e) {
        throw new Error(e, { cause: 'Could not start background task' })
      }
    }

    await TrackPlayer.add([
      {
        // url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        url: LIVE_STREAM_URL,
        artwork: currentShow?.image_path || logo,
        album: DEFAULT_SHOW_NAME,
        artist: ARTIST_NAME,
        title: currentTitle,
        headers: STREAM_HEADERS,
      },
    ])
  }

  useTrackPlayerEvents(
    [Event.RemoteStop, Event.PlaybackState],
    async (event) => {
      if (event.type === Event.PlaybackState) {
        const { state } = event

        setPlayerState(state)
      }
    }
  )

  useEffect(() => {
    if (playerState === State.Playing) {
      Animated.timing(buttonAnimation, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.elastic(1),
        delay: 500,
      }).start()
    }

    if (playerState !== State.Playing && playerState !== State.Buffering) {
      Animated.timing(buttonAnimation, {
        toValue: 0,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }).start()
    }
  }, [playerState])

  useEffect(() => {
    if (currentTrack || currentShow) {
      // only update when playing to prevent showing controls when not playing
      if (playerState === State.Playing) {
        TrackPlayer.updateNowPlayingMetadata({
          artist: ARTIST_NAME,
          artwork: currentShow?.image_path || logo,
          album: DEFAULT_SHOW_NAME,
          title: currentTitle,
        })
      }
    } else {
      // stop player if show has ended
      // if (showStatus === ShowStatus.OFF) {
      //   TrackPlayer.stop()
      // }
    }
  }, [currentTrack, currentShow])

  const onPress = async (skipRetry?: boolean) => {
    // const currentPlayerTrack = await TrackPlayer.getCurrentTrack()
    try {
      const state = (await TrackPlayer.getPlaybackState()).state
      // only stop if playing, otherwise play - buffering / connecting will play just fine
      if (state === State.Playing) {
        unregisterBackgroundTask()
        await TrackPlayer.reset()
      } else {
        // reset queue (& buffer)
        await TrackPlayer.reset()
        // re-add track
        await initPlayer()
        // and finally play track again
        await TrackPlayer.play()
      }
    } catch (e: any) {
      if (e.code === 'player_not_initialized' && !skipRetry) {
        TrackPlayer.setupPlayer().then(async () => {
          await TrackPlayer.updateOptions({
            android: {
              alwaysPauseOnInterruption: true,
              appKilledPlaybackBehavior:
                AppKilledPlaybackBehavior.ContinuePlayback,
            },
            capabilities: [Capability.Pause, Capability.Play],
            compactCapabilities: [Capability.Pause, Capability.Play],
          })
          onPress(true)
        })
      }
    }
  }

  const playerImg = currentShow?.image_path
    ? { uri: currentShow?.image_path }
    : customTheme?.playerImage
    ? { uri: `${config?.assets}${customTheme?.playerImage}` }
    : require('../../../assets/images/default.webp')

  const buttonPosition = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, PLAYER_SIZE / 2 - 24 - 10],
  })
  return useMemo(
    () => (
      <StyledCover
        style={{
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
          // borderColor: Colors[theme].player.frame,
          borderColor: Colors.common.purple,
          borderWidth: 3,
        }}
      >
        <TouchableHighlight
          underlayColor="transparent"
          onPressIn={() => onPress()}
        >
          <ImageBackground
            resizeMethod="scale"
            source={playerImg}
            defaultSource={require('../../../assets/images/playerWhite.png')}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Animated.View
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                // right: 10,
                // bottom: 10,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                zIndex: 5,
                shadowOpacity: 0.3,
                shadowRadius: 4,
                transform: [
                  { translateY: buttonPosition },
                  { translateX: buttonPosition },
                ],
              }}
            >
              <View
                style={{ position: 'relative', backgroundColor: 'transparent' }}
              >
                <MaterialCommunityIcons
                  name={PlayerStateIcons[playerState]}
                  size={60}
                  // color={Colors[theme].player.icon}
                  color={Colors.common.purple}
                />
                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, .5)',
                    position: 'absolute',
                    left: 6,
                    borderRadius: 50,
                    top: 6,
                    zIndex: -1,
                    width: 48,
                    height: 48,
                  }}
                />
              </View>
            </Animated.View>
          </ImageBackground>
        </TouchableHighlight>
      </StyledCover>
    ),
    [playerState, theme, currentShow]
  )
}
