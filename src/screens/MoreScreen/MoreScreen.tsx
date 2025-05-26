import React from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { RootTabScreenProps } from '../../../types'
import { Settings } from '../../components/Settings/Settings'
import { Text, View } from '../../components/Themed'
import { ScrollView } from 'react-native'
import { Link } from '../../components/Link/Link'
import Colors from '../../constants/Colors'
import { Button } from '../../components/Button/Button'

const Subscribe = () => {
  const onClick = () => {
    Linking.openURL('https://doyou.world/collections/memberships')
  }

  return (
    <>
      <View style={{ padding: 24, backgroundColor: Colors.common.yellow }}>
        <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 20 }}>
          Support the station
        </Text>
      </View>
      <View
        style={{
          padding: 24,
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
          <Button onPress={onClick} variant="purple">
            Find out more
          </Button>
        </View>
      </View>
    </>
  )
}

export const Weblink: React.FC<{ uri: string; children: string }> = ({
  children,
  uri,
}) => {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        color: Colors.common.purple,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.common.purple,
      }}
      onPress={() => Linking.openURL(uri)}
    >
      {children}
    </Text>
  )
}

const Credits: React.FC = () => (
  <View>
    <View style={{ padding: 24, backgroundColor: Colors.common.pink }}>
      <Text
        style={{ color: 'white', fontFamily: 'Lato_700Bold', fontSize: 20 }}
      >
        Credits
      </Text>
    </View>
    <View
      style={{
        padding: 24,
      }}
    >
      <Text>
        <Weblink uri="https://github.com/Jojocaster">Joel Beaudon</Weblink>: Web
        & App Developer
      </Text>
      <Text style={{ marginTop: 16 }}>
        <Weblink uri="https://github.com/Rassibassi/">Rasmus Jones</Weblink>:{' '}
        Backend
      </Text>
    </View>
  </View>
)

const Account = () => {
  return (
    <View>
      <View style={{ padding: 24, backgroundColor: Colors.common.purple }}>
        <Text
          style={{ color: 'white', fontFamily: 'Lato_700Bold', fontSize: 20 }}
        >
          Manage your data
        </Text>
      </View>
      <View
        style={{
          padding: 24,
        }}
      >
        <Text style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Do!! You!!! World</Text> does not
          use/share/store any of your personal data.
        </Text>
        <Text style={{ marginBottom: 16 }}>
          However, the chat (hosted by minnit.chat) may retain some of your data
          on their servers if you have an account with them.
        </Text>
        <Text style={{ marginBottom: 0 }}>
          If you wish to delete your Minnit account, please use the link below.
        </Text>
        <Link link="https://minnit.chat/accountsettings">
          Delete Minnit account
        </Link>
      </View>
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
        style={
          {
            // paddingVertical: Space.viewPaddingVertical,
            // paddingHorizontal: Space.viewPadding,
          }
        }
      >
        <Settings />

        <Subscribe />

        <Credits />
        <View style={styles.section}>
          <Account />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {},
  section: {},
})
