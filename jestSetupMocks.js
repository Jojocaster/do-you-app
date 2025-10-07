jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(),
  processFontFamily: jest.fn(),
  loadedNativeFonts: [],
}))
