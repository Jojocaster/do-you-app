import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Button2 } from '../components/Button2/Button2'
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

const Item: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <View style={styles.textContainer}>{children}</View>
)

export default function ModalScreen({
  navigation,
}: RootTabScreenProps<'ArchivesList'>) {
  const theme = useColorScheme()

  return (
    <TouchableWithoutFeedback>
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
          <Item>
            <Text style={styles.text}>
              You can now disable notifications for re-runs. Just head over to
              the{' '}
              <Link onClick={() => navigation.navigate('More')}>Settings</Link>!
            </Text>
          </Item>
          <Item>
            <Text style={styles.text}>
              Want to relive Gaia? Listen to all Jukebox shows? Use the new{' '}
              <Link onClick={() => navigation.navigate('Archives')}>
                Archives
              </Link>{' '}
              filter and listen to your favourite shows all over again!
            </Text>
          </Item>
          <View
            style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}
          >
            <View>
              <Button2 variant="lg" onPress={() => navigation.goBack()}>
                OK
              </Button2>
            </View>
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
