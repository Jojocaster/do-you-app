import React, { useEffect, useState } from 'react'
import { ImageBackground, TouchableHighlight } from 'react-native'
import { StyledCover } from './Player.styles'
import deviceInfo from '../../constants/Layout'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import {
  PlayerStatus,
  updatePlayerStatus,
} from '../../store/slices/playerSlice'
import { PlayerIcons } from './Player.constants'
import { LIVE_STREAM_URL } from '../../constants/Endpoints'
import { View } from '../Themed'
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player'
//@ts-ignore
import logo from '../../../assets/images/doyou.webp'

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useDispatch()
  const theme = useColorScheme()
  const { status } = useSelector((state: RootState) => state.player)
  const { current } = useSelector((state: RootState) => state.show)
  const coverSize = (60 / 100) * deviceInfo.window.width

  const onPress = async () => {
    if (status === PlayerStatus.PAUSED) {
      // dispatch(updatePlayerStatus(PlayerStatus.LOADING))
      await TrackPlayer.play()
      // dispatch(updatePlayerStatus(PlayerStatus.PLAYING))
    }
    if (status === PlayerStatus.PLAYING) {
      // stop() instead of pause() to reset buffer
      await TrackPlayer.stop()
      // dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
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

      // if (event.type === Event.RemoteStop || event.type === Event.RemotePause) {
      //   console.log('remote stop')

      //   dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
      // }
    }
  )

  // useTrackPlayerEvents([Event.RemoteStop], async (event) => {
  //   if (event.type === Event.RemoteStop) {
  //     dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
  //   }
  // })

  useEffect(() => {
    const initPlayer = async () => {
      await TrackPlayer.add([
        {
          // url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          url: LIVE_STREAM_URL,
          artwork: logo,
          artist: 'DoYouWorld',
          //TODO: use current show's name from schedule as fallback
          title: current?.name || `It's a family affair.`,
        },
      ])
    }

    initPlayer()
  }, [])

  useEffect(() => {
    if (current) {
      TrackPlayer.updateNowPlayingMetadata({
        artist: 'DoYouWorld',
        artwork: logo,
        //TODO: use current show's name from schedule as fallback
        title: current.name || `It's a family affair.`,
      })
    } else {
      // stop player if show has ended
      TrackPlayer.stop()
      dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
    }
  }, [current])

  return (
    <StyledCover
      style={{
        backgroundColor: 'white',
        width: coverSize,
        height: coverSize,
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
