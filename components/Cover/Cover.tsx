import React from 'react'
import { Dimensions, ImageBackground } from 'react-native'
import { Text } from '../Themed'
import { StyledCover } from './Cover.styles'
import deviceInfo from '../../constants/Layout'

export const Cover: React.FC<{ background: string }> = ({ background }) => {
  const coverSize = (60 / 100) * deviceInfo.window.width

  return (
    <StyledCover
      style={{ backgroundColor: 'white', width: coverSize, height: coverSize }}
    >
      <ImageBackground
        source={require('../../assets/images/logo.webp')}
        style={{ width: '100%', height: '100%' }}
      ></ImageBackground>
    </StyledCover>
  )
}
