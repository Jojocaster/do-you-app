import { Platform } from 'react-native'

const tintColorLight = '#1c1c1c'
const tintColorDark = '#fff'
const brandYellow = '#FFDC3B'
const brandBlue = '#3a5ed6'

const common = {
  purple: '#4747DF',
  pink: Platform.select({ ios: '#F869BB', android: '#f978c2' }), // iOS
  yellow: '#FDC151',
  warning: brandYellow,
  success: '#27ae60',
}

const Colors = {
  common,
  light: {
    text: '#000',
    link: brandBlue,
    statusBar: brandBlue,
    background: '#fff',
    backgroundDark: '#F9F9FB',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: brandBlue,
    primary: brandBlue,
    secondary: brandYellow,
    hero: '#F8F8F8',
    accent: brandBlue,
    button: {
      background: '#F3DD7C',
      text: 'black',
      back: 'white',
    },
    tabs: {
      header: '#1c1c1c',
      body: '#F9F9FB',
    },
    heading: brandYellow,
    headingShadow: brandBlue,
    scheduleBackground: '#F9F9FB',
    scheduleText: '#000',
    scheduleUnderline: brandYellow,
    scheduleHeading: brandBlue,
    archive: {
      webviewBackground: '#FFF',
    },
    switch: {
      trackActive: brandYellow,
      trackInactive: 'grey',
      trackDisabled: '#E1E1E1',
      thumb: 'white',
      thumDisabled: '#F5F5F5',
    },
    player: {
      icon: brandBlue,
      frame: brandBlue,
    },
    tracks: {
      artist: brandBlue,
    },
    volume: {
      trackTint: brandYellow,
      thumb: brandYellow,
      icons: 'black',
    },
    chatText: brandBlue,
  },
  dark: {
    text: '#fff',
    link: brandYellow,
    background: '#1c1c1c',
    backgroundDark: '#F8F8F8',
    button: {
      background: '#F3DD7C',
      text: 'black',
      back: 'rgba(255, 255, 255, .4)',
    },
    tabs: {
      header: '#1c1c1c',
      body: '#151515',
    },
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // old primary: '#E4C75E',
    primary: brandYellow,
    secondary: brandBlue,
    accent: '#000',
    hero: 'rgba(255,255,255,0.05)',
    statusBar: '#151515',
    heading: brandYellow,
    headingShadow: brandBlue,
    scheduleBackground: tintColorLight,
    scheduleUnderline: brandYellow,
    scheduleText: '#fff',
    scheduleHeading: '#fff',
    archive: {
      webviewBackground: '#282828',
    },
    switch: {
      trackActive: brandYellow,
      trackInactive: 'black',
      trackDisabled: 'black',
      thumb: 'white',
      thumDisabled: 'dimgrey',
    },
    player: {
      icon: brandBlue,
      frame: brandBlue,
    },
    volume: {
      trackTint: 'white',
      thumb: brandYellow,
      icons: 'white',
    },
    chatText: brandYellow,
  },
  monochrome: {
    text: '#000',
    link: 'black',
    statusBar: 'black',
    background: '#fff',
    backgroundDark: '#F9F9FB',
    tint: 'black',
    tabIconDefault: 'black',
    tabIconSelected: 'black',
    primary: 'black',
    secondary: 'black',
    accent: 'black',
    hero: '#F8F8F8',
    button: {
      background: 'black',
      text: 'white',
      back: 'white',
    },
    heading: 'black',
    headingShadow: 'rgba(0, 0, 0, .2)',
    scheduleBackground: '#F8F8F8',
    scheduleText: '#000',
    scheduleUnderline: 'black',
    scheduleHeading: 'black',
    archive: {
      webviewBackground: '#F8F8F8',
    },
    tabs: {
      header: '#1c1c1c',
      body: '#F9F9FB',
    },
    switch: {
      trackActive: 'black',
      trackInactive: 'grey',
      trackDisabled: 'black',
      thumb: 'white',
      thumDisabled: '#F5F5F5',
    },
    player: {
      icon: 'black',
      frame: 'black',
    },
    tracks: {
      artist: 'black',
    },
    volume: {
      trackTint: 'black',
      thumb: 'black',
      icons: 'black',
    },
    chatText: 'black',
  },
}

export type Palette = typeof Colors['light']
export default Colors
