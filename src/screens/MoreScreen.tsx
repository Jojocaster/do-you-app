import React from 'react'
import { Linking } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { AppVersion } from '../components/AppVersion/AppVersion'
import { Container } from '../components/Container/Container'
import { Heading } from '../components/Heading/Heading'
import { Home } from '../components/Home/Home'
import { Settings } from '../components/Settings/Settings'
import { Text, View } from '../components/Themed'

export default function MoreScreen({ navigation }: RootTabScreenProps<'More'>) {
  return (
    <Home>
      <Container>
        <Settings />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View>
            <Heading style={{ fontSize: 32 }}>Credits</Heading>

            <Text style={{ marginVertical: 10 }}>
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
