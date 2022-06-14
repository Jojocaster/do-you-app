import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text, View } from '../Themed'

//TODO: fix types
export const Button: React.FC<{
  color?: string
  icon: any
  onPress: () => void
}> = ({ children, color, icon, onPress }) => {
  const theme = useColorScheme()
  const textColor = color || Colors[theme].text

  return (
    <TouchableOpacity
      onPressIn={onPress}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <View style={[styles.button, {}]}>
        <MaterialCommunityIcons name={icon} size={14} color={textColor} />
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 1,
    paddingBottom: 4,
  },
  text: {
    fontSize: 12,
    marginLeft: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})
