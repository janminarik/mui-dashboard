import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string | null,
    isAuth: boolean;
}

const initialState: UserState = {
    username: null,
    isAuth: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuth(state: UserState, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        }
    }
})


export const { setIsAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;