import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { RootTabScreenProps } from '../../types'

import { Heading } from '../components/Heading/Heading'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

const Link: React.FC<{ children: string; onClick: () => void }> = ({
  onClick,
  children,
}) => {
  const theme = useColorScheme()
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <Text
        style={{
          fontWeight: 'bold',
          textDecorationColor: Colors[theme].primary,
          color: Colors[theme].primary,
          textDecorationLine: 'underline',
        }}
      >
        {children}
      </Text>
    </TouchableWithoutFeedback>
  )
}

export default function ModalScreen({
  navigation,
}: RootTabScreenProps<'Live'>) {
  const theme = useColorScheme()
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={[
            styles.container,
            {
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowRadius: 10,
              shadowOpacity: 0.2,
              borderTopWidth: 3,
              borderBottomWidth: 3,
              borderTopColor: Colors[theme].primary,
              borderBottomColor: Colors[theme].secondary,
            },
          ]}
        >
          <Heading style={styles.title} multiline={false}>
            What's new
          </Heading>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              <Link onClick={() => navigation.navigate('Archives')}>
                Archives
              </Link>{' '}
              are now available! 🎉
            </Text>
            <Text>Search, filters, embed player & more coming soon.</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Notifications are now fully supported.
            </Text>
            <Text style={styles.text}>
              Head over to the{' '}
              <Link onClick={() => navigation.navigate('More')}>Settings</Link>{' '}
              to enable notifications and make sure you never miss a show again.
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Disclaimer:</Text> This may
              affect your productivity.
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Link onClick={() => navigation.goBack()}>Close</Link>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    // flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'transparent',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 20,
    fontSize: 32,
  },
  text: { lineHeight: 20 },
})
