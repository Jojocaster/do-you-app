/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'
import { Status } from '../components/Status/Status'
import { View } from '../components/Themed'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import LiveScreen from '../screens/LiveScreen'
import TracksScreen from '../screens/TracksScreen'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../../types'
import LinkingConfiguration from './LinkingConfiguration'
import MoreScreen from '../screens/MoreScreen'
import { ChatScreen } from '../screens/ChatScreen'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Live"
      sceneContainerStyle={{ backgroundColor: '#212020' }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarStyle: { paddingVertical: 5 },
        tabBarLabelStyle: { marginBottom: 6 },
      }}
    >
      <BottomTab.Screen
        name="Live"
        component={LiveScreen}
        options={({ navigation }: RootTabScreenProps<'Live'>) => ({
          title: 'Live',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="headphones" size={19} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Tracks"
        component={TracksScreen}
        options={({ navigation }) => ({
          title: 'Track IDs',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="playlist-music-outline"
              style={{ marginTop: -2 }}
              size={25}
              color={color}
            />
          ),
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}
          //   >
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation }: RootTabScreenProps<'Chat'>) => ({
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={19} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="More"
        component={MoreScreen}
        options={({ navigation }: RootTabScreenProps<'More'>) => ({
          title: 'More',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="dots-horizontal" size={19} color={color} />
          ),
        })}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
  style?: any
  size?: number
}) {
  return <MaterialCommunityIcons size={30} {...props} />
}
