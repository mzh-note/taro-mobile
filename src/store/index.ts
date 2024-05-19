import {configureStore} from '@reduxjs/toolkit';
import userSlice from '@/store/modules/userReducer';
import scoreSlice from '@/store/modules/scoreReducer';

const store = configureStore({
  reducer: {
    user: userSlice,
    score: scoreSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
