import React from 'react'
import {
  Image,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import { RootTabScreenProps } from '../../types'
import { AppVersion } from '../components/AppVersion/AppVersion'
import { Container } from '../components/Container/Container'
import { Heading } from '../components/Heading/Heading'
import { Home } from '../components/Home/Home'
import { Settings } from '../components/Settings/Settings'
import { Text, View } from '../components/Themed'
//@ts-ignore
import kofiDark from '../../assets/images/kofi-dark.png'
//@ts-ignore
import kofiLight from '../../assets/images/kofi-light.png'
import useColorScheme from '../hooks/useColorScheme'

const Support = () => {
  const theme = useColorScheme()
  const source = theme === 'dark' ? kofiDark : kofiLight
  const onClick = () => {
    Linking.openURL('https://ko-fi.com/O4O1C9QG9')
  }

  return (
    <View
      style={{
        // position: 'absolute',
        // bottom: 10,
        marginTop: 10,
      }}
    >
      <Text style={{ marginBottom: 5 }}>There's a lot more to come.</Text>
      <Text style={{ marginBottom: 5 }}>
        If you can contribute, your support will be greatly appreciated.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        If not, your love will be more than enough.
      </Text>
      <TouchableOpacity onPress={onClick}>
        <Image
          style={{ width: 143, height: 36 }}
          source={source}
          accessibilityLabel="Buy Me a Coffee at ko-fi.com"
        />
      </TouchableOpacity>
    </View>
  )
}

const Link: React.FC<{ uri: string }> = ({ children, uri }) => (
  <Text
    style={{ textDecorationLine: 'underline' }}
    onPress={() => Linking.openURL(uri)}
  >
    {children}
  </Text>
)

export default function MoreScreen({ navigation }: RootTabScreenProps<'More'>) {
  return (
    <Home>
      <Container style={{ height: '100%' }}>
        <Settings />
        <View
          style={{
            position: 'relative',
            display: 'flex',
            marginTop: 10,
            height: '100%',
          }}
        >
          <View>
            <Heading style={{ fontSize: 32 }}>Credits</Heading>

            <Text style={{ marginVertical: 10 }}>
              - Out to Charlie Bones for giving us the{' '}
              <Text style={{ fontStyle: 'italic' }}>perfect sound forever</Text>{' '}
              and making the radio world a better place.
            </Text>
            <Text>
              - Out to{' '}
              <Link uri="https://github.com/Rassibassi/">Rassibassi</Link>,{' '}
              <Link uri="https://www.erinrimmer.com/">Erin Rimmer</Link> &{' '}
              <Link uri="https://github.com/jackhkmatthews">
                jackhkmatthews
              </Link>{' '}
              for their work on{' '}
              <Link uri="https://doyoutrackid.com/">
                https://doyoutrackid.com
              </Link>
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Heading multiline={false} style={{ fontSize: 32 }}>
              Support us
            </Heading>

            <Support />
          </View>
        </View>
      </Container>
    </Home>
  )
}
