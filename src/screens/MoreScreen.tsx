import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Linking } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { AppVersion } from '../components/AppVersion/AppVersion'
import { Container } from '../components/Container/Container'
import { Home } from '../components/Home/Home'
import { Text, View } from '../components/Themed'

export default function MoreScreen({ navigation }: RootTabScreenProps<'More'>) {
  return (
    <Home>
      <Container>
        <View
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Lato_900Black',
                marginBottom: 20,
              }}
            >
              Credits
            </Text>
            <Text style={{ marginBottom: 10 }}>
              - Out to Charlie Bones for giving us the{' '}
              <Text style={{ fontStyle: 'italic' }}>perfect sound forever</Text>{' '}
              and making the radio world a better place.
            </Text>
            <Text style={{ marginBottom: 10 }}>
              - Out to{' '}
              <Text
                style={{ textDecorationLine: 'underline' }}
                onPress={() =>
                  Linking.openURL('https://github.com/Rassibassi/doyoutrackid')
                }
              >
                Rassibassi X Erin Rimmer X jackhkmatthews
              </Text>{' '}
              for generating track IDs.
            </Text>
          </View>

          <AppVersion />
        </View>
      </Container>
    </Home>
  )
}
