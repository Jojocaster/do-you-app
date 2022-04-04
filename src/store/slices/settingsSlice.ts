import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  liveStatusNotification: boolean
  settingsLoaded: boolean
}
const initialState: SettingsState = {
  liveStatusNotification: false,
  settingsLoaded: false,
}

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    const { getItem } = useAsyncStorage('settings')
    const settings = await getItem()

    return settings
      ? JSON.parse(settings)
      : { ...initialState, settingsLoaded: true }
  }
)

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settings: SettingsState) => {
    const { setItem } = useAsyncStorage('settings')
    const item = JSON.stringify(settings)
    await setItem(item)
    return settings
  }
)

const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSettings.fulfilled,
      (state, action: PayloadAction<SettingsState>) => {
        // can't override whole state at once, hence going one key at the time
        const keys = Object.keys(action.payload) as Array<keyof SettingsState>

        keys.map((key) => {
          state[key] = action.payload[key]
        })
      }
    ),
      builder.addCase(updateSettings.fulfilled, (state, action) => {
        // can't override whole state at once, hence going one key at the time
        const keys = Object.keys(action.payload) as Array<keyof SettingsState>

        keys.map((key) => {
          state[key] = action.payload[key]
        })
      })
  },
})

export default settingsSlice.reducer
