import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view'
import { FavouriteArchives } from '../../components/FavouriteArchives/FavouriteArchives'
import Colors from '../../constants/Colors'
import { ArchivesList } from '../../components/ArchivesList/ArchivesList'
import { AllArchives } from '../../components/AllArchives/AllArchives'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Filter } from '../../store/slices/filtersSlice'
import { getRandomArchive } from '../../utils/archives'

export const ArchiveScreen = ({ route }) => {
  const { navigate } = useNavigation()
  const [filter, setFilter] = useState<Filter>()
  const [isLoading, setLoading] = useState(false)
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Saved' },
  ])

  useEffect(() => {
    if (route.params?.artist) {
      setFilter(route.params?.artist)
    }
  }, [route.params?.artist])

  const onRandom = async () => {
    const randomArchive = await getRandomArchive()

    navigate('ArchiveDetails', { track: randomArchive })
  }

  // see https://github.com/satya164/react-native-tab-view/issues/1068#issuecomment-783233062
  const FirstRoute = useCallback(
    () => (
      <View
        style={[
          {
            flexGrow: 1,
            backgroundColor: 'white',
          },
        ]}
      >
        <AllArchives filter={filter} />
        {filter ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',

              backgroundColor: Colors.common.yellow,
              padding: 12,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
              onPress={() => setFilter(undefined)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{}}>Filter: </Text>
                <Text style={{ fontWeight: 'bold' }}>{filter.name}</Text>
              </View>
              <MaterialCommunityIcons name="close" style={{}} size={20} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    ),
    [filter]
  )

  const SecondRoute = useCallback(
    () => (
      <View style={[{ flex: 1, backgroundColor: 'white' }]}>
        <FavouriteArchives />
      </View>
    ),
    []
  )
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })

  const renderButtons = () => {
    if (index === 0) {
      return () => (
        <>
          <TouchableOpacity onPress={onRandom}>
            <MaterialCommunityIcons
              name="shuffle-variant"
              color="white"
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('FilterArchives')}>
            <MaterialIcons name="search" color="white" size={24} />
          </TouchableOpacity>
        </>
      )
    }

    return undefined
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.common.pink, height: 4 }}
      style={{
        backgroundColor: Colors.common.purple,
      }}
      tabStyle={{ width: layout.width * 0.3 }}
      renderTabBarItem={({ key, ...props }) => (
        <TabBarItem {...props} key={key} />
      )}
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            color: focused ? 'white' : '#ccc',
            fontSize: 16,
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
    <View style={{ height: '100%' }}>
      <Header title="Archives" buttons={renderButtons()} />
      <TabView
        sceneContainerStyle={{ height: '100%', backgroundColor: '#ccc' }}
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  )
}
