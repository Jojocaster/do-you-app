import React from 'react'
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Heading } from '../components/Heading/Heading'
import { Settings } from '../components/Settings/Settings'
import { Text, View } from '../components/Themed'
//@ts-ignore
import kofiDark from '../../assets/images/kofi-dark.png'
//@ts-ignore
import kofiLight from '../../assets/images/kofi-light.png'
import useColorScheme from '../hooks/useColorScheme'
import { ScrollView } from 'react-native'
import Space from '../constants/Space'

const Support = () => {
  const theme = useColorScheme()
  const source = theme === 'dark' ? kofiDark : kofiLight
  const onClick = () => {
    Linking.openURL('https://ko-fi.com/O4O1C9QG9')
  }

  return (
    <>
      <Heading multiline={false} style={{ fontSize: 32 }}>
        Support the app
      </Heading>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text style={{ marginBottom: 5 }}>
          We have a lot of features in the works.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          If you can contribute, your support will be greatly appreciated.
        </Text>
        <Text>If not, your love will be more than enough.</Text>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={onClick}>
          <Image
            style={{ width: 143, height: 36 }}
            source={source}
            accessibilityLabel="Buy Me a Coffee at ko-fi.com"
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

const Subscribe = () => {
  const theme = useColorScheme()
  const source = theme === 'dark' ? kofiDark : kofiLight
  const onClick = () => {
    Linking.openURL('https://ko-fi.com/doyouworld/tiers')
  }

  return (
    <>
      <Heading multiline={false} style={{ fontSize: 32 }}>
        Support the station
      </Heading>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text style={{ marginBottom: 5 }}>
          Do!! You!!! World! is a totally independent station, free of corporate
          investment. A radio station solely funded by the listeners that will
          always be free at the point of use.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          However, to allow the station to function, grow and develop, we rely
          on donations and subscriptions from people like yourself.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          Your money goes towards paying for staff, rent, studio equipment,
          licensing, developing the service and keeping the it free for all to
          use.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          If you are able to contribute it is greatly appreciated.
        </Text>
        <Text style={{ marginBottom: 5 }}>DO!!YOU!!! </Text>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={onClick}>
          <Image
            style={{ width: 143, height: 36 }}
            source={source}
            accessibilityLabel="Buy Me a Coffee at ko-fi.com"
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

export const Weblink: React.FC<{ uri: string }> = ({ children, uri }) => (
  <Text
    style={{ textDecorationLine: 'underline' }}
    onPress={() => Linking.openURL(uri)}
  >
    {children}
  </Text>
)

const Credits: React.FC = () => (
  <View>
    <Heading style={{ fontSize: 32 }}>Credits</Heading>

    <Text style={{ marginVertical: 10 }}>
      - Out to Charlie Bones & Oscar for giving us the{' '}
      <Text style={{ fontStyle: 'italic' }}>perfect sound forever</Text> and
      making the radio world a better place.
    </Text>
    <Text>
      - Out to{' '}
      <Weblink uri="https://github.com/Rassibassi/">Rassibassi</Weblink>,{' '}
      <Weblink uri="https://www.erinrimmer.com/">Erin Rimmer</Weblink> &{' '}
      <Weblink uri="https://github.com/jackhkmatthews">jackhkmatthews</Weblink>{' '}
      for their work on{' '}
      <Weblink uri="https://doyoutrackid.com/">
        https://doyoutrackid.com
      </Weblink>
    </Text>
  </View>
)

export default function MoreScreen({ navigation }: RootTabScreenProps<'More'>) {
  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator
    >
      <View
        style={{
          paddingVertical: Space.viewPaddingVertical,
          paddingHorizontal: Space.viewPadding,
        }}
      >
        <Settings />
        <View style={styles.section}>
          <Subscribe />
        </View>
        <View style={styles.section}>
          <Support />
        </View>
        <View style={styles.section}>
          <Credits />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {},
  section: {
    marginTop: 20,
  },
})
