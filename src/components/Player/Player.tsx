import React, { useEffect, useMemo, useState } from 'react'
import { ImageBackground, TouchableHighlight } from 'react-native'
import { StyledCover } from './Player.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
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
import { getShowTitle } from '../../utils/show'
import {
  registerBackgroundTask,
  unregisterBackgroundTask,
} from '../../utils/tasks'
import { fetchShowInfo } from '../../store/slices/showSlice'

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useDispatch()
  const [playerState, setPlayerState] = useState<State>(State.None)
  const theme = useColorScheme()
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )
  const { batterySaver } = useSelector((state: RootState) => state.settings)
  const currentTitle = getShowTitle({ currentShow, currentTrack })
  const initPlayer = async () => {
    // fetch show info before init player
    dispatch(fetchShowInfo())

    if (!batterySaver) {
      await registerBackgroundTask()
    }

    await TrackPlayer.add([
      {
        // url: 'https://hooliganexpress.out.airtime.pro/hooliganexpress_b',
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
    if (currentTrack || currentShow) {
      // only update when playing to prevent showing controls when not playing
      if (playerState !== State.None || playerState !== State.Stopped) {
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

  const onPress = async () => {
    // const currentPlayerTrack = await TrackPlayer.getCurrentTrack()

    const state = await TrackPlayer.getState()

    // only stop if playing, otherwise play - buffering / connecting will play just fine
    if (state === State.Playing) {
      unregisterBackgroundTask()
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

  const playerImg = currentShow?.image_path
    ? { uri: currentShow?.image_path }
    : require('../../../assets/images/doyou.webp')

  return useMemo(
    () => (
      <StyledCover
        style={{
          // shadowColor: '#000000',
          // shadowOffset: {
          //   width: 0,
          //   height: 15,
          // },
          // zIndex: 5,
          // shadowOpacity: 0.5,
          // shadowRadius: 10,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
          borderColor: '#3A70D6',
          borderWidth: 3,
        }}
      >
        <TouchableHighlight underlayColor="transparent" onPressIn={onPress}>
          <ImageBackground
            source={playerImg}
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
              }}
            >
              <View
                style={{ position: 'relative', backgroundColor: 'transparent' }}
              >
                <MaterialCommunityIcons
                  name={PlayerStateIcons[playerState]}
                  size={60}
                  color={Colors[theme].player.icon}
                />
                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, .7)',
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
            </View>
          </ImageBackground>
        </TouchableHighlight>
      </StyledCover>
    ),
    [playerState, theme, currentShow]
  )
}
