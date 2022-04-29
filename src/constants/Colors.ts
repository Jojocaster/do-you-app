const tintColorLight = '#1c1c1c'
const tintColorDark = '#fff'
const brandYellow = '#FFDC3B'
const brandBlue = '#3A70D6'

export default {
  light: {
    text: '#000',
    statusBar: brandBlue,
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: brandBlue,
    primary: brandYellow,
    accent: brandBlue,
    heading: brandYellow,
    headingShadow: brandBlue,
    scheduleBackground: '#F5F5F5',
    scheduleText: '#000',
    scheduleHeading: brandBlue,
    switch: {
      trackActive: brandYellow,
      trackInactive: 'grey',
      trackDisabled: '#E1E1E1',
      thumb: 'white',
      thumDisabled: '#F5F5F5',
    },
    tracks: {
      artist: brandBlue,
    },
    volume: {
      trackTint: brandYellow,
      icons: 'black',
    },
  },
  dark: {
    text: '#fff',
    background: '#1c1c1c',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // old primary: '#E4C75E',
    primary: brandYellow,
    accent: '#000',
    statusBar: '#151515',
    heading: brandYellow,
    headingShadow: brandBlue,
    scheduleBackground: tintColorLight,
    scheduleText: '#fff',
    scheduleHeading: '#fff',
    switch: {
      trackActive: brandYellow,
      trackInactive: 'black',
      trackDisabled: 'black',
      thumb: 'white',
      thumDisabled: 'dimgrey',
    },
    tracks: {
      artist: brandYellow,
    },
    volume: {
      trackTint: 'white',
      icons: 'white',
    },
  },
}
