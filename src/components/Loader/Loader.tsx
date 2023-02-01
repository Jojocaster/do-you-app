import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text } from '../Themed'

export const Loader: React.FC<{ children?: string; testID?: string }> = ({
  children,
  testID,
}) => {
  const theme = useColorScheme()

  return (
    <View
      testID={testID}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <View>
        <MaterialCommunityIcons
          name="radio"
          size={24}
          color={Colors[theme].tint}
        />
      </View>
      {children && (
        <Text style={{ marginTop: 15, fontFamily: 'Lato_900Black' }}>
          {children}
        </Text>
      )}
    </View>
  )
}
