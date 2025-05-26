import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Filter } from '../store/slices/filtersSlice'

export const FilterArchivesScreen = () => {
  const navigation = useNavigation()
  const all = useSelector((state: RootState) => state.filters.shows)
  const sortedFilters = [...all].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  )

  const onPress = (artist: Filter) => {
    navigation.navigate({ name: 'Archives', params: { artist }, merge: true })
  }

  return (
    <View
      style={{
        backgroundColor: Colors.common.pink,
        padding: 24,
        height: '100%',
      }}
    >
      <ScrollView indicatorStyle={'white'} contentContainerStyle={{ gap: 16 }}>
        {sortedFilters.map((artist) => (
          <TouchableOpacity onPress={() => onPress(artist)}>
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
      </ScrollView>
    </View>
  )
}
