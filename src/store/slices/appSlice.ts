import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColorSchemeName } from 'react-native'
import { getEnv } from '../../constants/Env'

export interface RemoteTheme {
  name: string
  theme: ColorSchemeName | null
  icon: string | null
  playerImage: string | null
}
interface Config {
  assets: string
  defaultTheme: RemoteTheme
  themes: RemoteTheme[]
}
interface AppState {
  // used to manage "what's new" modals based on the version
  whatsNew: string | null
  config: Config | null
  // store last config update
  updatedAt: number | null
}

const initialState: AppState = {
  whatsNew: null,
  config: null,
  updatedAt: null,
}

export const fetchConfig = createAsyncThunk('app/fetchConfig', async () => {
  const url = getEnv('API_URL')
  const response = await fetch(`${url}/config`)
  const data = await response.json()

  return data as Config
})

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    updateWhatsNew(state, action: PayloadAction<string>) {
      state.whatsNew = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      console.log('[fetchConfig]: resolved')
      state.updatedAt = new Date().getTime()
      state.config = action.payload
    })
  },
})

export const { updateWhatsNew } = appSlice.actions
export default appSlice.reducer
