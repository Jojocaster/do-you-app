/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../../types'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ArchivesScreen from '../screens/ArchivesScreen'
import ChatScreen from '../screens/ChatScreen/ChatScreen'
import LiveScreen from '../screens/LiveScreen/LiveScreen'
import ModalScreen from '../screens/ModalScreen'
import MoreScreen from '../screens/MoreScreen/MoreScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import TracksScreen from '../screens/TracksScreen'
import LinkingConfiguration from './LinkingConfiguration'
import ScheduleScreen from '../screens/ScheduleModalScreen/ScheduleScreen'
import TrackIDScreen from '../screens/TrackIDScreen/TrackIDScreen'
import { TrackDetailsScreen } from '../screens/TrackIDModalScreen/TrackDetailsScreen'
import { ArchiveScreen } from '../screens/ArchiveScreen/ArchiveScreen'
import { FilterArchivesScreen } from '../screens/FilterArchivesScreen'
import { ArchiveDetailsNewScreen } from '../screens/ArchiveDetailsScreen/ArchiveDetailsNewScreen'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const theme = useColorScheme()
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
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
      <Stack.Group>
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
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            contentStyle: { marginTop: '50%', backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen
            name="TrackDetails"
            component={TrackDetailsScreen as any}
          />
        </Stack.Group>
      </Stack.Group>
      {/* <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          contentStyle: { backgroundColor: 'rgba(0, 0, 0, .5)' },
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
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
        tabBarActiveTintColor: Colors.common.purple,
        tabBarStyle: { paddingVertical: 5 },
        tabBarLabelStyle: { marginBottom: 6 },
      }}
    >
      <BottomTab.Screen
        name="LiveStack"
        component={LiveStackScreen}
        options={() => ({
          title: 'Live',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="headphones" size={19} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Tracks"
        component={TrackIDScreens}
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
        })}
      />
      {/* <BottomTab.Screen
        name="Live"
        component={LiveScreen}
        options={({ navigation }: RootTabScreenProps<'Live'>) => ({
          title: 'Live',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="headphones" size={19} color={color} />
          ),
        })}
      /> */}
      {/* <BottomTab.Screen
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
      /> */}
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
        name="Archives"
        component={ArchiveScreens}
        options={({ navigation }) => ({
          title: 'Archives',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-music-outline"
              size={19}
              color={color}
            />
          ),
        })}
      />
      {/* <BottomTab.Screen
        name="Archives"
        component={ArchivesScreen}
        options={({ navigation }: RootTabScreenProps<'Archives'>) => ({
          title: 'Archives',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-music-outline"
              size={19}
              color={color}
            />
          ),
        })}
      /> */}
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

const LiveStack = createNativeStackNavigator()

const LiveStackScreen = () => {
  return (
    <LiveStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* todo: fix types */}
      <LiveStack.Screen name="Live" component={LiveScreen as any} />
      <LiveStack.Group
        screenOptions={{
          presentation: 'modal',
          contentStyle: { marginTop: '20%', backgroundColor: 'transparent' },
        }}
      >
        <LiveStack.Screen name="Schedule" component={ScheduleScreen as any} />
      </LiveStack.Group>
    </LiveStack.Navigator>
  )
}

const TrackIDStack = createNativeStackNavigator()

const TrackIDScreens = () => {
  return (
    <TrackIDStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <TrackIDStack.Screen name="TrackID" component={TrackIDScreen} />
    </TrackIDStack.Navigator>
  )
}

const ArchiveStack = createNativeStackNavigator()

const ArchiveScreens = () => {
  return (
    <ArchiveStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <ArchiveStack.Screen name="Archives" component={ArchiveScreen} />
      <ArchiveStack.Screen
        name="ArchiveDetails"
        component={ArchiveDetailsNewScreen}
      />

      <ArchiveStack.Group
        screenOptions={{
          presentation: 'modal',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <ArchiveStack.Screen
          name="FilterArchives"
          component={FilterArchivesScreen as any}
        />
      </ArchiveStack.Group>
    </ArchiveStack.Navigator>
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
