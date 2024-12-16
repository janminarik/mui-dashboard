import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
  username: null | string;
}

const initialState: UserState = {
  isAuth: false,
  username: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setIsAuth(state: UserState, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
