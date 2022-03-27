import React from 'react'
import {
  Dimensions,
  ImageBackground,
  Touchable,
  TouchableHighlight,
} from 'react-native'
import { StyledCover } from './Cover.styles'
import deviceInfo from '../../constants/Layout'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

export const Cover: React.FC<{ background: string; onPlay: () => void }> = ({
  background,
  onPlay,
}) => {
  const coverSize = (60 / 100) * deviceInfo.window.width
  const theme = useColorScheme()
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
      <TouchableHighlight underlayColor="transparent" onPress={() => onPlay()}>
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
            name="play-circle"
            size={80}
            color={Colors[theme].background}
          />
        </ImageBackground>
      </TouchableHighlight>
    </StyledCover>
  )
}
