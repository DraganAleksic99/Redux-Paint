import { RootState, Point } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { endStroke } from '../sharedAction'

const initialState: RootState['currentStroke'] = {
  points: [],
  color: '#000',
  width: 5
}

const slice = createSlice({
  name: 'currentStroke',
  initialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload]
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload)
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload
    },
    setStrokeWidth: (state, action: PayloadAction<number>) => {
      state.width = Number(action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(endStroke, state => {
      state.points = []
    })
  }
})

export default slice.reducer
export const { beginStroke, updateStroke, setStrokeColor, setStrokeWidth } = slice.actions
