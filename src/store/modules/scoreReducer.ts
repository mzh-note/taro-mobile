import {createSlice} from '@reduxjs/toolkit';

type IInitialStateType = {
  matchId: number,
  state: number
}
const initialState = {
  score: {
    matchId: 0,
    state: 0
  } as IInitialStateType
}
const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore(state, action) {
      state.score = {
        ...state.score,
        ...action.payload
      }
    }
  }
})

export const { setScore } = scoreSlice.actions
export default scoreSlice.reducer
