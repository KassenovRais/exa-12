import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../Interface/Interface'
import {userAuth} from '../Store/Services/User.store'

interface State {
  user: Omit<IUser , 'password' | '_id'> | null,
}
const initialState: State = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(userAuth.endpoints.postNewUser.matchFulfilled, (state, action: PayloadAction<Omit <IUser ,'password' | '_id'>>) => {
        state.user = action.payload;
      })
      .addMatcher(userAuth.endpoints.sessionsUser.matchFulfilled, (state, action: PayloadAction<Omit <IUser ,'password' | '_id'>>) => {        
        state.user = action.payload;        
      })
      .addMatcher(userAuth.endpoints.logoutUser.matchFulfilled , (state ) => {        
        state.user = null
        
      })
  }
})

export const {} = authSlice.actions;

export default authSlice.reducer;
