import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { ARCHIVES_URL } from '../../constants/Endpoints'
import useColorScheme from '../../hooks/useColorScheme'
import { useFetch } from '../../hooks/useFetch'
import { Button2 } from '../Button2/Button2'
import { Text, View } from '../Themed'

export interface Filter {
  id: number
  name: string
}

export const Filters = () => {
  const navigation = useNavigation()
  // const [filters, setFilters] = useState<{ id: number; name: string }[]>([])
  const theme = useColorScheme()
  const { data, loading, error, refetch } = useFetch<Filter[]>(
    `${ARCHIVES_URL}/hosts/page/1/size/50/`
  )

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

  if (loading) {
    return (
      <View style={[styles.view, styles.loaderView]}>
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (error) {
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
        <Button2 onPress={refetch}>Retry</Button2>
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.view}>
        {data?.map((host) => (
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
