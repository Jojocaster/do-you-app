import React from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { RootTabScreenProps } from '../../../types'
import { Settings } from '../../components/Settings/Settings'
import { Text, View } from '../../components/Themed'
import { ScrollView } from 'react-native'
import Colors from '../../constants/Colors'
import { Button } from '../../components/Button/Button'

const Subscribe = () => {
  const onClick = () => {
    Linking.openURL('https://doyou.world/collections/memberships')
  }

  return (
    <>
      <View style={styles.subscribeHeader}>
        <Text style={styles.sectionTitle}>Support the station</Text>
      </View>
      <View style={styles.sectionContent}>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Do!! You!!! World</Text> is a totally
          independent station, free of corporate investment.
        </Text>
        <Text style={styles.paragraph}>
          A radio station solely funded by the listeners that will always be
          free at the point of use.
        </Text>
        <Text style={styles.paragraph}>
          However, to allow the station to function, grow and develop, we rely
          on support from people like yourself.
        </Text>
        <Text style={styles.paragraph}>
          Follow the link below to learn about how you can help support the
          station to cover staff, rent, studio equipment, licensing, developing
          the service and keeping it free for all to use.
        </Text>
        <Text style={styles.paragraph}>
          If you are able to contribute, it is greatly appreciated.
        </Text>
        {/* <Text style={styles.paragraph}>
          Your money goes towards paying for staff, rent, studio equipment,
          licensing, developing the service and keeping the it free for all to
          use.
        </Text>
        <Text style={styles.paragraph}>
          If you are able to contribute it is greatly appreciated.
        </Text> */}
        <Text style={styles.paragraphBold}>DO!!YOU!!! X</Text>
        <View style={styles.buttonContainer}>
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
    <Text style={styles.weblink} onPress={() => Linking.openURL(uri)}>
      {children}
    </Text>
  )
}

const Credits: React.FC = () => (
  <View>
    <View style={styles.creditsHeader}>
      <Text style={styles.sectionTitleWhite}>Credits</Text>
    </View>
    <View style={styles.sectionContent}>
      <Text>
        <Weblink uri="https://github.com/Jojocaster">Joel Beaudon</Weblink>: Web
        & App Developer
      </Text>
      <Text style={styles.creditItem}>
        <Weblink uri="https://github.com/Rassibassi/">Rasmus Jones</Weblink>:{' '}
        Backend
      </Text>
    </View>
  </View>
)

// const Account = () => {
//   return (
//     <View>
//       <View style={styles.accountHeader}>
//         <Text style={styles.sectionTitleWhite}>Manage your data</Text>
//       </View>
//       <View style={styles.sectionContent}>
//         <Text style={styles.accountParagraph}>
//           <Text style={styles.boldText}>Do!! You!!! World</Text> does not
//           use/share/store any of your personal data.
//         </Text>
//         <Text style={styles.accountParagraph}>
//           However, the chat (hosted by minnit.chat) may retain some of your data
//           on their servers if you have an account with them.
//         </Text>
//         <Text style={styles.accountParagraph}>
//           If you wish to delete your Minnit account, please use the link below.
//         </Text>
//         <Link link="https://minnit.chat/accountsettings">
//           Delete Minnit account
//         </Link>
//       </View>
//     </View>
//   )
// }

export default function MoreScreen({ navigation }: RootTabScreenProps<'More'>) {
  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Settings />

        <Subscribe />

        <Credits />

        {/* <View style={styles.section}>
          <Account />
        </View> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {},
  section: {},
  subscribeHeader: {
    padding: 24,
    backgroundColor: Colors.common.yellow,
  },
  sectionTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
  },
  sectionTitleWhite: {
    color: 'white',
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
  },
  sectionContent: {
    padding: 24,
  },
  paragraph: {
    marginBottom: 10,
  },
  paragraphBold: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
  },
  weblink: {
    fontWeight: 'bold',
    color: Colors.common.purple,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.common.purple,
  },
  creditsHeader: {
    padding: 24,
    backgroundColor: Colors.common.pink,
  },
  creditItem: {
    marginTop: 16,
  },
  accountHeader: {
    padding: 24,
    backgroundColor: Colors.common.purple,
  },
  accountParagraph: {
    marginBottom: 16,
  },
})
