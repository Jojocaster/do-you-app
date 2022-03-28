import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TRACKLIST_URL } from '../../constants/Endpoints'

interface TrackInfo {
  album: string
  artist: string
  label: string
  played_datetime: string
  release_date: string
  song_link: string
  timecode: string
  title: string
}

export interface TracksInfoState {
  tracks: TrackInfo[]
  lastUpdated: number | null
}

export const fetchTracksInfo = createAsyncThunk(
  'tracksInfo/fetchShowInfo',
  async () => {
    const response = await fetch(TRACKLIST_URL)
    const data = await response.json()
    return data as { tracks: TrackInfo[] }
  }
)

const initialState: TracksInfoState = {
  tracks: [],
  lastUpdated: null,
}

const tracksInfoSlice = createSlice({
  initialState,
  name: 'tracksInfo',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTracksInfo.fulfilled,
      (state, action: PayloadAction<{ tracks: TrackInfo[] }>) => {
        console.log(action.payload)

        state.tracks = action.payload.tracks
        state.lastUpdated = new Date().getTime()
      }
    ),
      builder.addCase(fetchTracksInfo.rejected, (state) => {
        state.lastUpdated = new Date().getTime()
      })
  },
})

export default tracksInfoSlice.reducer
