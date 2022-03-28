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
import { Audio } from 'expo-av'

export const Player: React.FC<{ background: string }> = ({ background }) => {
  const dispatch = useDispatch()
  const [sound, setSound] = useState<Audio.Sound>()

  const coverSize = (60 / 100) * deviceInfo.window.width
  const theme = useColorScheme()
  const { status } = useSelector((state: RootState) => state.player)

  const onPress = async () => {
    if (status === PlayerStatus.PAUSED) {
      play()
    }
    if (status === PlayerStatus.PLAYING && sound) {
      await sound.pauseAsync()
      dispatch(updatePlayerStatus(PlayerStatus.PAUSED))
    }
  }

  const play = async () => {
    try {
      if (!sound) {
        Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        })

        console.log('Loading Sound')
        const { sound } = await Audio.Sound.createAsync(
          {
            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          },
          { shouldPlay: true }
        )
        setSound(sound)
      } else {
        dispatch(updatePlayerStatus(PlayerStatus.LOADING))

        await sound.playAsync()
      }
      console.log('Playing sound')
      dispatch(updatePlayerStatus(PlayerStatus.PLAYING))
      // Notifications.scheduleNotificationAsync({
      //   content: {
      //     title: 'DoYouWorld',
      //     body: 'Radio is playing.',
      //   },
      //   trigger: null,
      // })
    } catch (e) {
      console.log('error while playing', e)
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <StyledCover
      style={{
        backgroundColor: 'white',
        width: coverSize,
        height: coverSize,
        borderColor: '#3A70D6',
        borderWidth: 2,
      }}
    >
      <TouchableHighlight underlayColor="transparent" onPress={onPress}>
        <ImageBackground
          source={require('../../../assets/images/logo.webp')}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
