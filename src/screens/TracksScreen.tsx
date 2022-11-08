import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useCallback, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { RootTabScreenProps } from '../../types'
import { Heading } from '../components/Heading/Heading'
import { MonoText } from '../components/StyledText'
import { Text, View } from '../components/Themed'
import { Tracks } from '../components/Tracks/Tracks'
import Colors from '../constants/Colors'
import Space from '../constants/Space'
import useColorScheme from '../hooks/useColorScheme'
import { Weblink } from './MoreScreen'

export default function TrackScreen({
  navigation,
}: RootTabScreenProps<'Tracks'>) {
  const theme = useColorScheme()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Latest' },
    // { key: 'second', title: 'Favourites' },
  ])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors[theme].primary }}
      style={{
        backgroundColor: Colors[theme].background,
      }}
      tabStyle={{ width: layout.width * 0.3 }}
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            color: focused
              ? Colors[theme].primary
              : Colors[theme].tabIconDefault,
            textTransform: 'uppercase',
            fontSize: 12,
            fontFamily: 'Lato_900Black',
            fontWeight: 'bold',
          }}
        >
          {route.title}
        </Text>
      )}
    />
  )

  const FirstRoute = useCallback(() => <Tracks />, [theme])

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    // second: SecondRoute,
  })

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: Space.viewPadding }}>
        <Heading style={{ fontSize: 28, marginBottom: 10 }} multiline={false}>
          Track IDs
        </Heading>
      </View>
      <TabView
        sceneContainerStyle={{
          paddingHorizontal: Space.viewPadding,
          backgroundColor: Colors[theme].tabs.body,
        }}
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      {/* <View
        style={[
          styles.codeHighlightContainer,
          styles.homeScreenFilename,
          { marginBottom: 20, backgroundColor: Colors[theme].hero },
        ]}
      >
        <MonoText>
          Source:{' '}
          <Weblink uri="https://doyoutrackid.com">doyoutrackid.com</Weblink>
        </MonoText>
      </View>

      <Tracks /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Space.viewPaddingVertical,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    marginHorizontal: '10%',
    height: 1,
    width: '80%',
  },
  homeScreenFilename: {
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    padding: 20,
    width: '100%',
  },
})
