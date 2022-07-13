import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  // used to manage "what's new" modals based on the version
  whatsNew: string | null
}

const initialState: AppState = {
  whatsNew: null,
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    updateWhatsNew(state, action: PayloadAction<string>) {
      state.whatsNew = action.payload
    },
  },
})

export const { updateWhatsNew } = appSlice.actions
export default appSlice.reducer
