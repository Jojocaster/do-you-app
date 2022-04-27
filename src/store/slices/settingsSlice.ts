import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColorSchemeName } from 'react-native'

export interface SettingsState {
  liveStatusNotification: boolean
  useNativeTheme: boolean
  darkTheme: boolean
}
const initialState: SettingsState = {
  liveStatusNotification: false,
  useNativeTheme: true,
  darkTheme: false,
}

const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    // TODO: type properly
    updateSettings: (
      state,
      action: PayloadAction<{ name: keyof SettingsState; value: any }>
    ) => {
      const { name, value } = action.payload
      state[name] = value
    },
  },
})
export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer
