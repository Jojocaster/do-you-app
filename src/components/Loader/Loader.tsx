import { Octicons } from '@expo/vector-icons'
import React from 'react'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text, View } from '../Themed'

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
        <Octicons name="radio-tower" size={30} color={Colors[theme].tint} />
      </View>
      {children && (
        <Text style={{ marginTop: 20, fontFamily: 'Lato_900Black' }}>
          {children}
        </Text>
      )}
    </View>
  )
}
