require('jest-fetch-mock').enableMocks()

jest.mock('expo-font', () => ({
  Font: {
    isLoaded: () => true,
    loadAsync: jest.fn(),
  },
}))
