import { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { Events } from '../Events/Events'
import { Schedule } from '../Schedule/Schedule'
import { Text } from '../Themed'

export const LiveTabs: React.FC<{ onChange: () => void }> = ({ onChange }) => {
  const theme = useColorScheme()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Schedule' },
    { key: 'second', title: 'Events' },
  ])

  const FirstRoute = useCallback(() => <Schedule />, [theme])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors[theme].primary, height: 2 }}
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
            fontWeight: 'bold',
          }}
        >
          {route.title}
        </Text>
      )}
    />
  )
  const renderScene = SceneMap({
    first: FirstRoute,
    second: Events,
  })
  return (
    <TabView
      style={{ height: layout.height / 2 }}
      sceneContainerStyle={{
        paddingHorizontal: Space.viewPadding,
        backgroundColor: Colors[theme].tabs.body,
      }}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(id) => {
        onChange()
        setIndex(id)
      }}
      initialLayout={{ width: layout.width }}
    />
  )
}
