import React, { useEffect } from 'react'
import { ImageBackground, Platform, TouchableHighlight } from 'react-native'
import { StyledCover } from './Player.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import {
  PlayerStatus,
  updatePlayerStatus,
} from '../../store/slices/playerSlice'
import {
  ARTIST_NAME,
  DEFAULT_SHOW_NAME,
  PlayerIcons,
  PLAYER_SIZE,
} from './Player.constants'
import { LIVE_STREAM_URL } from '../../constants/Endpoints'
import { View } from '../Themed'
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player'
//@ts-ignore
import logo from '../../../assets/images/doyou.webp'
import * as Notifications from 'expo-notifications'
import { AndroidNotificationPriority } from 'expo-notifications'
import { ShowStatus, updateLastNotified } from '../../store/slices/showSlice'
import { useShowTitle } from '../../hooks/useShowTitle'
//@ts-ignore
import playerBg from '../../../assets/images/playerBg.png'
//@ts-ignore
import playerRecord from '../../../assets/images/playerRecord.png'

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useDispatch()
  // const recordAnim = useRef(new Animated.Value(0))
  // const spin = recordAnim.current.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // })
  const theme = useColorScheme()
  const currentTitle = useShowTitle()
  const { status } = useSelector((state: RootState) => state.player)
  const {
    currentTrack,
    lastNotified,
    status: showStatus,
  } = useSelector((state: RootState) => state.show)
  const { liveStatusNotification } = useSelector(
    (state: RootState) => state.settings
  )

  const initPlayer = async () => {
    await TrackPlayer.add([
      {
        // url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        url: LIVE_STREAM_URL,
        artwork: logo,
        album: DEFAULT_SHOW_NAME,
        artist: ARTIST_NAME,
        title: currentTitle,
      },
    ])
  }

  useTrackPlayerEvents(
    [Event.RemoteStop, Event.PlaybackState],
    async (event) => {
      if (event.type === Event.PlaybackState) {
        const { state } = event
        switch (state) {
          case State.Buffering:
          case State.Connecting:
            dispatch(updatePlayerStatus(PlayerStatus.LOADING))
            break
          // ios triggers "ready" while buffering, hence the exception
          case State.Ready:
            if (Platform.OS === 'ios') {
              dispatch(updatePlayerStatus(PlayerStatus.LOADING))
              // use as "paused" on Android to avoid loading icon on Android
            } else {
              dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
            }
          case State.Paused:
          case State.Stopped:
          case State.None:
            dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
            break

          case State.Playing:
            dispatch(updatePlayerStatus(PlayerStatus.PLAYING))
            break
        }
      }
    }
  )

  useEffect(() => {
    const initNotifications = async () => {
      // check permission for iOS
      const permission = await Notifications.getPermissionsAsync()

      if (
        permission.granted ||
        permission.ios?.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL
      ) {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        })

        // create notif channle for icons & vibrate on Android
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync(
            'notification-sound-channel',
            {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
            }
          )
        }
      }
    }

    // Will play quicker if init from the start
    // However, iOS doesn't seem to like that - the media won't play if loaded before users actually perform an action

    // Update: this displays a notification before anything gets played, hence commenting it out.
    // TODO: reduce buffer
    // if (Platform.OS === 'android') {
    //   initPlayer()
    // }

    initNotifications()
    // Animated.loop(
    //   Animated.timing(recordAnim.current, {
    //     toValue: 1,
    //     duration: 1000,
    //     easing: Easing.linear,
    //     useNativeDriver: true,
    //   })
    // ).start()
  }, [])

  useEffect(() => {
    if (currentTrack) {
      TrackPlayer.updateNowPlayingMetadata({
        artist: ARTIST_NAME,
        artwork: logo,
        album: DEFAULT_SHOW_NAME,
        title: currentTitle,
      })

      const handleNotifications = async () => {
        // if we get a new show name while the player is off, send a notification
        // checking for player state should be enough to prevent notifications when a show name changes
        if (
          status !== PlayerStatus.PLAYING &&
          liveStatusNotification &&
          !lastNotified
        ) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `We're on baby!`,
              body: `Now live: ${currentTitle}`,
              priority: AndroidNotificationPriority.HIGH,
              vibrate: [0, 250, 250, 250],
              //@ts-ignore - missing types
              android: {
                channelId: 'notification-sound-channel', //and this
              },
            },
            trigger: null,
          })
        }
        // update lastNotified even if playijng to avoid duplicated notifications later on
        dispatch(updateLastNotified(new Date().getTime()))
      }
      handleNotifications()
    } else {
      // stop player if show has ended
      if (showStatus === ShowStatus.OFF) {
        TrackPlayer.stop()
      }
    }
  }, [currentTrack])

  // TODO: handle player state better on iOS, loading state doesn't work properly there
  const onPress = async () => {
    const currentPlayerTrack = await TrackPlayer.getCurrentTrack()

    console.log('currentPlayerTrack', currentPlayerTrack)

    // currentTrack is sometimes set to null after resuming from background, preventing "play" from working normally
    // re-adding the track allows it to play again
    // iOS also requires it as the track needs to be init by user action
    if (currentPlayerTrack === null) {
      await initPlayer()
    }

    const playerState = await TrackPlayer.getState()

    // only stop if playing, otherwise play - buffering / connecting will play just fine
    if (playerState === State.Playing) {
      await TrackPlayer.stop()
    } else {
      await TrackPlayer.play()
    }
  }

  return (
    <StyledCover
      style={{
        // backgroundColor: 'red',
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        borderColor: '#3A70D6',
        borderWidth: 3,
        // overflow: 'hidden',
        // position: 'relative',
      }}
    >
      {/* <Image
        source={playerBg}
        style={{ width: PLAYER_SIZE, height: PLAYER_SIZE }}
      />
      <Animated.Image
        source={playerRecord}
        style={{
          transform: [{ rotate: spin }],
          position: 'absolute',
          left: 27,
          top: 48,
          width: 69,
          height: 69,
          zIndex: -1,
        }}
      /> */}
      <TouchableHighlight underlayColor="transparent" onPress={onPress}>
        <ImageBackground
          source={require('../../../assets/images/doyou.webp')}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'white',
              position: 'absolute',
            }}
          />
          <MaterialCommunityIcons
            name={PlayerIcons[status]}
            size={80}
            color={Colors[theme].accent}
          />
        </ImageBackground>
      </TouchableHighlight>
    </StyledCover>
  )
}
