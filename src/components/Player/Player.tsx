import React, { useEffect, useMemo, useState } from 'react'
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
  PlayerStateIcons,
  PLAYER_SIZE,
  STREAM_HEADERS,
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

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useDispatch()
  const [playerState, setPlayerState] = useState<State>(State.None)
  const theme = useColorScheme()
  const currentTitle = useShowTitle()
  const { status } = useSelector((state: RootState) => state.player)
  const {
    currentShow,
    currentTrack,
    lastNotified,
    status: showStatus,
  } = useSelector((state: RootState) => state.show)
  const { liveStatusNotification } = useSelector(
    (state: RootState) => state.settings
  )

  const initPlayer = async () =>
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

  // TODO: remove redux bits for now
  useTrackPlayerEvents(
    [Event.RemoteStop, Event.PlaybackState],
    async (event) => {
      if (event.type === Event.PlaybackState) {
        const { state } = event

        setPlayerState(state)

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

    initNotifications()
  }, [])

  useEffect(() => {
    if (currentTrack) {
      // only update when playing to prevent showing controls when not playing
      if (status === PlayerStatus.PLAYING) {
        TrackPlayer.updateNowPlayingMetadata({
          artist: ARTIST_NAME,
          artwork: currentShow?.image_path || logo,
          album: DEFAULT_SHOW_NAME,
          title: currentTitle,
        })
      }

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
    // const currentPlayerTrack = await TrackPlayer.getCurrentTrack()

    const state = await TrackPlayer.getState()

    // only stop if playing, otherwise play - buffering / connecting will play just fine
    if (state === State.Playing) {
      await TrackPlayer.stop()
    } else {
      // reset queue (& buffer)
      await TrackPlayer.reset()
      // re-add track
      await initPlayer()
      // and finally play track again
      await TrackPlayer.play()
    }
  }

  return (
    <StyledCover
      style={{
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        borderColor: '#3A70D6',
        borderWidth: 3,
      }}
    >
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
            name={PlayerStateIcons[playerState]}
            size={80}
            color={Colors[theme].player.icon}
          />
        </ImageBackground>
      </TouchableHighlight>
    </StyledCover>
  )
}
