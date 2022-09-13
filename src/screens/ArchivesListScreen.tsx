import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { ArchivesList } from '../components/ArchivesList/ArchivesList'
import { Button2 } from '../components/Button2/Button2'
import { Heading } from '../components/Heading/Heading'
import { Text, View } from '../components/Themed'
import { ARCHIVES_URL } from '../constants/Endpoints'
import Space from '../constants/Space'
import useColorScheme from '../hooks/useColorScheme'
import { Filter } from '../store/slices/filtersSlice'

export default function ArchivesListScreen({
  navigation,
  route,
}: RootTabScreenProps<'ArchivesList'>) {
  const theme = useColorScheme()
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

  return (
    <View style={styles.view}>
      <View style={styles.content}>
        <Heading style={{ marginBottom: 10, fontSize: 28 }}>Archives</Heading>
        <View
          style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }}
        >
          {activeFilter ? (
            <View
              style={{
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

      <View style={[styles.content, { flex: 1 }]}>
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
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    flex: 1,
    paddingTop: Space.viewPaddingVertical,
    position: 'relative',
  },
  content: {
    paddingHorizontal: Space.viewPadding,
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
})
