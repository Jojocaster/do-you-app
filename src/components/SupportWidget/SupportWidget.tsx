import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export const SupportWidget = () => {
  const onPress = () => {
    Linking.openURL('https://doyou.world/collections/memberships')
  }
  return (
    <View
      style={{
        borderRadius: 8,
        padding: 16,
        paddingTop: 16,
        marginHorizontal: 16,
        // backgroundColor: Colors.light.primary,
        backgroundColor: '#FDC151',
      }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          marginBottom: 16,
          fontFamily: 'Lato_900Black',
        }}
      >
        Support the station
      </Text>

      <Text style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Do!! You!!! World</Text> is a
        totally independent station, free of corporate investment.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        A radio station solely funded by the listeners that will always be free
        at the point of use.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        However, to allow the station to function, grow and develop, we rely on
        support from people like yourself.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Tap the button below to learn about how you can help support the station
        to cover staff, rent, studio equipment, licensing, developing the
        service and keeping it free for all to use.
      </Text>

      <TouchableOpacity
        onPress={onPress}
        style={{
          marginTop: 6,
          alignSelf: 'flex-start',
          borderRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 24,
          backgroundColor: '#4747DF',
        }}
      >
        <Text style={{ color: 'white', fontFamily: 'Lato_700Bold' }}>
          More info
        </Text>
      </TouchableOpacity>
    </View>
  )
}
