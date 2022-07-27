const tintColorLight = '#1c1c1c'
const tintColorDark = '#fff'
const brandYellow = '#FFDC3B'
const brandBlue = '#3a5ed6'

const common = {
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
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: brandBlue,
    primary: brandBlue,
    secondary: brandYellow,
    accent: brandBlue,
    heading: brandYellow,
    headingShadow: brandBlue,
    scheduleBackground: '#F8F8F8',
    scheduleText: '#000',
    scheduleUnderline: brandYellow,
    scheduleHeading: brandBlue,
    archive: {
      webviewBackground: '#F8F8F8',
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
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // old primary: '#E4C75E',
    primary: brandYellow,
    secondary: brandBlue,
    accent: '#000',
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
      icon: 'black',
    },
    volume: {
      trackTint: 'white',
      thumb: brandYellow,
      icons: 'white',
    },
    chatText: brandYellow,
  },
}

export type Palette = typeof Colors['light']
export default Colors
