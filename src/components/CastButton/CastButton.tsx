import React from 'react'
import { CastButton as NativeCastButton } from 'react-native-google-cast'
import Colors from '../../constants/Colors'

export const CastButton: React.FC = () => {
  return (
    <NativeCastButton
      style={{ width: 32, height: 32, tintColor: Colors.common.purple }}
    />
  )
}
