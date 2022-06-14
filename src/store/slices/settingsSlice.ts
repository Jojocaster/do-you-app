import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  batterySaver: boolean
  darkTheme: boolean
  pushEnabled: boolean
  useNativeTheme: boolean
  volume: number
  token?: string
}

const initialState: SettingsState = {
  batterySaver: false,
  pushEnabled: false,
  useNativeTheme: true,
  darkTheme: false,
  volume: 1,
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
      //@ts-ignore
      state[name] = value
    },
  },
})
export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer
