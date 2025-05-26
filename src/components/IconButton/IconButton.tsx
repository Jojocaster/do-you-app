import { ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ButtonVariant } from '../Button/Button'

const colors = {
  pink: 'white',
  yellow: 'black',
  purple: 'white',
}

export const IconButton: React.FC<{
  onPress: () => void
  variant: ButtonVariant
  name: any
}> = ({ onPress, variant, name }) => {
  const backgroundVariant = background[variant]

  const colorVariant = colors[variant]

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        backgroundVariant,
        {
          alignSelf: 'flex-start',
          borderRadius: 4,
          padding: 8,
        },
      ]}
    >
      <MaterialCommunityIcons color={colorVariant} name={name} size={24} />
    </TouchableOpacity>
  )
}

const background = StyleSheet.create<Record<ButtonVariant, any>>({
  pink: {
    backgroundColor: Colors.common.pink,
  },
  yellow: {
    backgroundColor: Colors.common.yellow,
  },
  purple: {
    backgroundColor: Colors.common.purple,
  },
})
