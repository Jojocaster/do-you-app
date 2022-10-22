import { useNavigation } from '@react-navigation/native'
import { isToday } from 'date-fns'
import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { fetchFilters, Filter } from '../../store/slices/filtersSlice'
import { RootState } from '../../store/store'
import { Button2 } from '../Button2/Button2'
import { Text, View } from '../Themed'

export const Filters = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { shows, error, lastUpdated, loading } = useSelector(
    (state: RootState) => state.filters
  )
  const theme = useColorScheme()

  const selectHost = (host: Filter) => {
    navigation.navigate('Root', {
      screen: 'Archives',
      params: {
        //@ts-ignore
        screen: 'ArchivesList',
        params: {
          filter: host,
        },
      },
    })
  }

  useEffect(() => {
    if (!lastUpdated || !isToday(lastUpdated)) {
      dispatch(fetchFilters())
    }
  }, [])

  if (!shows.length && loading) {
    return (
      <View style={[styles.view, styles.loaderView]}>
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (!shows.length && error) {
    return (
      <View
        style={[
          styles.view,
          styles.loaderView,
          { flexDirection: 'column', alignItems: 'center' },
        ]}
      >
        <Text style={{ marginBottom: 20 }}>
          Oops, looks like there was an error.
        </Text>
        <Button2 onPress={() => dispatch(fetchFilters())}>Retry</Button2>
      </View>
    )
  }

  const sortedShows = [...shows].sort((a, b) =>
    a.name < b.name ? -1 : a.name < b.name ? 1 : 0
  )

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.view}>
        {sortedShows?.map((host) => (
          <View key={host.id} style={styles.genre}>
            <Button2 onPress={() => selectHost(host)}>{host.name}</Button2>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
  },
  loaderView: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  genre: {
    marginRight: 10,
    marginBottom: 10,
  },
})
