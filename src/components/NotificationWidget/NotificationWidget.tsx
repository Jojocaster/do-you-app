import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Colors from '../../constants/Colors'

export const NotificationWidget = () => {
  const { pushEnabled } = useSelector((state: RootState) => state.settings)
  const { navigate } = useNavigation()

  const onPressSettings = () => {
    navigate('Root', {
      screen: 'More',
    })
  }

  if (pushEnabled) {
    return null
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressSettings}>
      <View
        style={{
          borderRadius: 8,
          padding: 16,
          paddingTop: 16,
          marginHorizontal: 16,
          // backgroundColor: Colors.light.primary,
          backgroundColor: Colors.common.pink,
        }}
      >
        <Text
          style={{ color: 'white', fontSize: 20, fontFamily: 'Lato_900Black' }}
        >
          Is it 11:11 already?
        </Text>

        <Text style={{ color: 'white', marginTop: 16 }}>
          Make sure to enable push notifications so you don't miss any of your
          favourite shows ever again.
        </Text>
        <TouchableOpacity
          onPress={onPressSettings}
          style={{
            alignSelf: 'flex-start',
            borderRadius: 4,
            marginTop: 16,
            paddingVertical: 8,
            paddingHorizontal: 24,
            backgroundColor: '#FDC151',
          }}
        >
          <Text style={{ color: 'black', fontFamily: 'Lato_700Bold' }}>
            Go to settings
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
