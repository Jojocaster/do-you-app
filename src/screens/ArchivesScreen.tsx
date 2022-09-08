import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Platform } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Text, View } from '../components/Themed'
import ArchiveDetailsScreen from './ArchiveDetailsScreen'
import ArchivesFiltersScreen from './ArchivesFiltersScreen'
import ArchivesListScreen from './ArchivesListScreen'

const Stack = createNativeStackNavigator()

export default function ArchivesScreen({
  navigation,
}: RootTabScreenProps<'Archives'>) {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ArchivesList" component={ArchivesListScreen} />
        <Stack.Screen
          name="ArchivesFilters"
          options={{
            animation:
              Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
          }}
          component={ArchivesFiltersScreen}
        />
        <Stack.Screen
          name="ArchiveDetails"
          options={{
            animation:
              Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
          }}
          component={ArchiveDetailsScreen}
        />
      </Stack.Navigator>
    </View>
  )
}
