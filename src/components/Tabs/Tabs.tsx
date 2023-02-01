import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { Text } from '../Themed'

export const Tabs: React.FC<{
  scene: any
  routes: { key: string; title: string }[]
}> = ({ scene, routes, ...rest }) => {
  const theme = useColorScheme()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [allRoutes] = useState(routes)

  const renderScene = SceneMap(scene)

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

  return (
    <TabView
      {...rest}
      overScrollMode="never"
      sceneContainerStyle={{
        paddingHorizontal: Space.viewPadding,
        backgroundColor: Colors[theme].tabs.body,
      }}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes: allRoutes }}
      renderScene={renderScene}
      onIndexChange={(id) => {
        setIndex(id)
      }}
      initialLayout={{ width: layout.width }}
    />
  )
}
