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
import { Button2 } from '../components/Button2/Button2'
import { Link } from '../components/Link/Link'
import Colors from '../constants/Colors'

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
          marginTop: 20,
        }}
      >
        <Text style={{ marginBottom: 10 }}>
          We have a lot of features in the works.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          If you can contribute, your support will be greatly appreciated.
        </Text>
        <Text>If not, your love will be more than enough.</Text>
        <View style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap' }}>
          <Button2 onPress={onClick} icon="coffee">
            Buy me a coffee
          </Button2>
        </View>
      </View>
    </>
  )
}

const Subscribe = () => {
  const onClick = () => {
    Linking.openURL('https://doyou.world/')
  }

  return (
    <>
      <Heading multiline={false} style={{ fontSize: 28 }}>
        Support the station
      </Heading>

      <View
        style={{
          marginTop: 15,
        }}
      >
        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Do!! You!!! World</Text> is a
          totally independent station, free of corporate investment.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          A radio station solely funded by the listeners that will always be
          free at the point of use.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          However, to allow the station to function, grow and develop, we rely
          on support from people like yourself.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Follow the link below to learn about how you can help support the
          station to cover staff, rent, studio equipment, licensing, developing
          the service and keeping it free for all to use.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          If you are able to contribute, it is greatly appreciated.
        </Text>
        {/* <Text style={{ marginBottom: 10 }}>
          Your money goes towards paying for staff, rent, studio equipment,
          licensing, developing the service and keeping the it free for all to
          use.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          If you are able to contribute it is greatly appreciated.
        </Text> */}
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
          DO!!YOU!!! X
        </Text>
        <View style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap' }}>
          <Button2 onPress={onClick} icon="heart-multiple">
            Find out more
          </Button2>
        </View>
      </View>
    </>
  )
}

export const Weblink: React.FC<{ uri: string }> = ({ children, uri }) => {
  const theme = useColorScheme()
  return (
    <Text
      style={{
        fontWeight: 'bold',
        color: Colors[theme].primary,
        textDecorationLine: 'underline',
        textDecorationColor: Colors[theme].primary,
      }}
      onPress={() => Linking.openURL(uri)}
    >
      {children}
    </Text>
  )
}

const Credits: React.FC = () => (
  <View>
    <Heading style={{ fontSize: 28 }}>Credits</Heading>
    <Text style={{ marginTop: 15 }}>
      <Weblink uri="https://github.com/Jojocaster">Joel Beaudon</Weblink>: Web &
      App Developer
    </Text>
    <Text style={{ marginTop: 10 }}>
      <Weblink uri="https://www.erinrimmer.com/">Erin Rimmer</Weblink>: UI & UX
      designer
    </Text>
    <Text style={{ marginTop: 10 }}>
      <Weblink uri="https://github.com/Rassibassi/">Rasmus Jones</Weblink>:{' '}
      Backend
    </Text>
  </View>
)

const Account = () => {
  return (
    <View>
      <Heading style={{ fontSize: 28 }} multiline={false}>
        Manage your data
      </Heading>

      <Text style={{ marginTop: 15, marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Do!! You!!! World</Text> does not
        use/share/store any of your personal data.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        However, the chat (hosted by minnit.chat) may retain some of your data
        on their servers if you have an account with them.
      </Text>
      <Text style={{ marginBottom: 20 }}>
        If you wish to delete your Minnit account, please use the link below.
      </Text>
      <Link link="https://minnit.chat/accountsettings">
        Delete Minnit account
      </Link>
    </View>
  )
}

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
        {/* <View style={styles.section}>
          <Support />
        </View> */}
        <View style={styles.section}>
          <Credits />
        </View>
        <View style={styles.section}>
          <Account />
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
