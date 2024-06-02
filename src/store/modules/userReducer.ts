import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Taro from '@tarojs/taro';

interface UserState {
  openid?: string,
  session_key?: string,
  userStatus?: number,
  avatar?: string,
  name?: string,
  inviteCode?: string,  // 自身邀请码
  fromInviteCode?: string // 来自别人的邀请码
}
const initialState = {
  user: {
    openid: '',
    session_key: '',
    userStatus: 0,
    avatar: '',
    name: '',
    inviteCode: '',
    fromInviteCode: ''
  } as UserState
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.user = {
        ...state.user,
        ...action.payload
      }
      Taro.setStorage({
        key: 'user',
        data: state.user
      })
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
