import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { fetchFilters, Filter } from '../store/slices/filtersSlice'
import { isToday } from 'date-fns'
import { useDispatch } from 'react-redux'

export const FilterArchivesScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const {
    shows: all,
    error,
    lastUpdated,
    loading,
  } = useSelector((state: RootState) => state.filters)
  const sortedFilters = [...all].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  )

  const onPress = (artist: Filter) => {
    navigation.navigate({ name: 'Archives', params: { artist }, merge: true })
  }

  useEffect(() => {
    if (!lastUpdated || !isToday(lastUpdated)) {
      dispatch(fetchFilters())
    }
  }, [])

  return (
    <View
      style={{
        backgroundColor: Colors.common.pink,

        height: '100%',
      }}
    >
      <ScrollView indicatorStyle={'white'} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2,
            padding: 24,
          }}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons color="white" name="close" size={24} />
        </TouchableOpacity>

        <View style={{ padding: 24, gap: 16 }}>
          {sortedFilters?.map((artist) => (
            <TouchableOpacity key={artist.id} onPress={() => onPress(artist)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                    fontFamily: 'Lato_900Black',
                  }}
                >
                  {artist.name}
                </Text>
                <MaterialCommunityIcons
                  style={{ marginTop: 4, marginLeft: 4 }}
                  name="chevron-right"
                  color={Colors.common.yellow}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
