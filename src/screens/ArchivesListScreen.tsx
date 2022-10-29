import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { RootTabScreenProps } from '../../types'
import { ArchivesList } from '../components/ArchivesList/ArchivesList'
import { Button2 } from '../components/Button2/Button2'
import { FavouriteArchives } from '../components/FavouriteArchives/FavouriteArchives'
import { Heading } from '../components/Heading/Heading'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import { ARCHIVES_URL } from '../constants/Endpoints'
import Space from '../constants/Space'
import useColorScheme from '../hooks/useColorScheme'
import { Filter } from '../store/slices/filtersSlice'

// TODO: tidy up
export default function ArchivesListScreen({
  navigation,
  route,
}: RootTabScreenProps<'ArchivesList'>) {
  const theme = useColorScheme()
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Latest' },
    { key: 'second', title: 'Favourites' },
  ])
  const [activeFilter, setActiveFilter] = useState<Filter>()
  //@ts-ignore - TODO: add proper types
  const filter = route?.params?.filter

  useEffect(() => {
    setActiveFilter(filter)
  }, [route.params])

  const onPress = async () => {
    try {
      const response = await fetch(`${ARCHIVES_URL}/shows/random/`)
      const data = await response.json()

      if (data) {
        navigation.navigate('Root', {
          screen: 'Archives',
          params: {
            //@ts-ignore
            screen: 'ArchiveDetails',
            params: {
              track: data,
            },
          },
        })
      }
    } catch (e) {}
  }

  const displayFilters = () => {
    navigation.navigate('Root', {
      screen: 'Archives',
      params: {
        //@ts-ignore
        screen: 'ArchivesFilters',
        params: {},
      },
    })
  }
  // see https://github.com/satya164/react-native-tab-view/issues/1068#issuecomment-783233062
  const FirstRoute = useCallback(
    () => (
      <View style={[styles.view, { backgroundColor: Colors[theme].tabs.body }]}>
        <View
          style={[styles.content, { backgroundColor: Colors[theme].tabs.body }]}
        >
          <View
            style={{
              backgroundColor: Colors[theme].tabs.body,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {activeFilter ? (
              <View
                style={{
                  backgroundColor: Colors[theme].tabs.body,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ marginRight: 10 }}>Showing results for: </Text>
                <Button2
                  variant="sm"
                  icon="close-thick"
                  onPress={() => {
                    setActiveFilter(undefined)
                  }}
                  iconSize={14}
                >
                  {filter.name}
                </Button2>
              </View>
            ) : (
              <Button2
                variant="md"
                icon="filter-outline"
                onPress={displayFilters}
                iconSize={14}
              >
                Filter
              </Button2>
            )}
          </View>
        </View>

        <View
          style={[
            styles.content,
            { flex: 1, backgroundColor: Colors[theme].tabs.body },
          ]}
        >
          <ArchivesList filter={activeFilter} />
        </View>

        <View style={styles.button}>
          <Button2
            elevated
            variant="lg"
            icon="shuffle-variant"
            onPress={onPress}
            iconSize={14}
          >
            Random
          </Button2>
        </View>
      </View>
    ),
    [activeFilter, theme]
  )

  const SecondRoute = useCallback(
    () => (
      <View
        style={[
          styles.content,
          { flex: 1, backgroundColor: Colors[theme].tabs.body },
        ]}
      >
        <FavouriteArchives />
      </View>
    ),
    [theme]
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })

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
    <>
      <View
        style={{
          paddingTop: Space.viewPaddingVertical,
          paddingHorizontal: Space.viewPadding,
        }}
      >
        <Heading style={{ marginBottom: 10, fontSize: 28 }}>Archives</Heading>
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  )

  // return (
  //   <View style={styles.view}>
  //     <View style={styles.content}>
  //       <Heading style={{ marginBottom: 10, fontSize: 28 }}>Archives</Heading>
  //       <View
  //         style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }}
  //       >
  //         {activeFilter ? (
  //           <View
  //             style={{
  //               display: 'flex',
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <Text style={{ marginRight: 10 }}>Showing results for: </Text>
  //             <Button2
  //               variant="sm"
  //               icon="close-thick"
  //               onPress={() => {
  //                 setActiveFilter(undefined)
  //               }}
  //               iconSize={14}
  //             >
  //               {filter.name}
  //             </Button2>
  //           </View>
  //         ) : (
  //           <Button2
  //             variant="md"
  //             icon="filter-outline"
  //             onPress={displayFilters}
  //             iconSize={14}
  //           >
  //             Filter
  //           </Button2>
  //         )}
  //       </View>
  //     </View>

  //     <View style={[styles.content, { flex: 1 }]}>
  //       <ArchivesList filter={activeFilter} />
  //     </View>

  //     <View style={styles.button}>
  //       <Button2
  //         elevated
  //         variant="lg"
  //         icon="shuffle-variant"
  //         onPress={onPress}
  //         iconSize={14}
  //       >
  //         Random
  //       </Button2>
  //     </View>
  //   </View>
  // )
}

const styles = StyleSheet.create({
  view: {
    // height: '100%',
    flex: 1,
    paddingTop: Space.viewPaddingVertical,
    position: 'relative',
  },
  content: {
    paddingHorizontal: Space.viewPadding,
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
})
