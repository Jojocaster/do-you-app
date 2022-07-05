import React, { useEffect, useRef } from 'react'
import { Octicons } from '@expo/vector-icons'
import { Animated } from 'react-native'
import { Text, View } from '../Themed'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

export const Loader: React.FC<{ children?: string }> = ({ children }) => {
  const theme = useColorScheme()
  const fadeAnim = useRef(new Animated.Value(1)).current

  // commented out for now as this might created memory leaks
  // useEffect(() => {
  // Animated.loop(
  //   Animated.sequence([
  //     Animated.timing(fadeAnim, {
  //       toValue: 0.5,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),
  //   ])
  // ).start()
  // }, [])

  return (
    <View
      testID="noTracks"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Octicons name="radio-tower" size={30} color={Colors[theme].tint} />
      </Animated.View>
      {children && (
        <Text style={{ marginTop: 20, fontFamily: 'Lato_900Black' }}>
          {children}
        </Text>
      )}
    </View>
  )
}
