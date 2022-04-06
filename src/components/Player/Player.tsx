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
import { ARTIST_NAME, PlayerIcons, PLAYER_SIZE } from './Player.constants'
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
import { fetchSettings } from '../../store/slices/settingsSlice'
import { updateLastNotified } from '../../store/slices/showSlice'
import { useShowTitle } from '../../hooks/useShowTitle'

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useDispatch()
  const theme = useColorScheme()
  const currentTitle = useShowTitle()

  const { status } = useSelector((state: RootState) => state.player)
  const { currentTrack, lastNotified } = useSelector(
    (state: RootState) => state.show
  )
  const { liveStatusNotification } = useSelector(
    (state: RootState) => state.settings
  )

  const onPress = async () => {
    if (status === PlayerStatus.PAUSED) {
      await TrackPlayer.play()
    }
    if (status === PlayerStatus.PLAYING) {
      // stop() instead of pause() to reset buffer
      await TrackPlayer.stop()
    }
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

          case State.Paused:
          case State.Stopped:
          case State.Ready:
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
    dispatch(fetchSettings())

    const initPlayer = async () => {
      await TrackPlayer.add([
        {
          // url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          url: LIVE_STREAM_URL,
          artwork: logo,
          artist: ARTIST_NAME,
          title: currentTitle,
        },
      ])
    }

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

    initPlayer()
    initNotifications()
  }, [])

  useEffect(() => {
    if (currentTrack) {
      TrackPlayer.updateNowPlayingMetadata({
        artist: ARTIST_NAME,
        artwork: logo,
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

          dispatch(updateLastNotified(new Date().getTime()))
        }
      }
      handleNotifications()
    } else {
      // stop player if show has ended
      TrackPlayer.stop()
      // dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
    }
  }, [currentTrack])

  return (
    <StyledCover
      style={{
        backgroundColor: 'white',
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
            name={PlayerIcons[status]}
            size={80}
            color={Colors[theme].background}
          />
        </ImageBackground>
      </TouchableHighlight>
    </StyledCover>
  )
}
