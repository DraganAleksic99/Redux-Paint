import { RootState } from '../../types'
import { endStroke } from './actions'
import { createSlice } from '@reduxjs/toolkit'

const initialStrokes: RootState['strokes'] = []

const strokes = createSlice({
  name: 'strokes',
  initialState: initialStrokes,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload
      if (historyIndex === 0) {
        state.push(stroke)
      } else {
        state.splice(-historyIndex, historyIndex, stroke)
      }
    })
  }
})

export default strokes.reducer
