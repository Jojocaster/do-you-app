import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum PlayerStatus {
  PLAYING,
  LOADING,
  PAUSED,
  BUFFERING,
}

const initialState = {
  status: PlayerStatus.PAUSED,
}

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    updatePlayerStatus(state, action: PayloadAction<PlayerStatus>) {
      state.status = action.payload
    },
  },
})

export const { updatePlayerStatus } = playerSlice.actions
export default playerSlice.reducer
