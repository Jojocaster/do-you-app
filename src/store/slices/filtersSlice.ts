import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ARCHIVES_URL } from '../../constants/Endpoints'

export interface Filter {
  id: number
  name: string
}

interface Filters {
  shows: Filter[]
  loading: boolean
  error: boolean
  lastUpdated: number | null
}

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const response = await fetch(`${ARCHIVES_URL}/hosts/page/1/size/60/`)
    const data = await response.json()
    return data as Filter[]
  }
)

const initialState: Filters = {
  shows: [],
  loading: false,
  error: false,
  lastUpdated: null,
}

const filtersSlice = createSlice({
  initialState,
  name: 'filters',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.loading = true
      state.error = false
    }),
      builder.addCase(fetchFilters.fulfilled, (state, action) => {
        state.loading = false
        state.shows = action.payload
        state.error = false
        state.lastUpdated = new Date().getTime()
      }),
      builder.addCase(fetchFilters.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default filtersSlice.reducer
