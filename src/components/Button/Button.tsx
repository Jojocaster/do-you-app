import { ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export type ButtonVariant = 'pink' | 'purple' | 'yellow'

export const Button: React.FC<{
  onPress: () => void
  children: string
  variant: ButtonVariant
}> = ({ onPress, children, variant }) => {
  const backgroundVariant = background[variant]
  const colorVariant = text[variant]

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        backgroundVariant,
        {
          alignSelf: 'flex-start',
          borderRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 24,
        },
      ]}
    >
      <Text style={[colorVariant, { fontFamily: 'Lato_700Bold' }]}>
        {children}
      </Text>
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

const text = StyleSheet.create<Record<ButtonVariant, any>>({
  pink: {
    color: 'white',
  },
  yellow: {
    color: 'black',
  },
  purple: {
    color: 'white',
  },
})
