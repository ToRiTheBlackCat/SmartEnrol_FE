import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../Service/type";

const initialState: authState = {
    accountId: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserRedux: (state, action: PayloadAction<authState>) =>{
            state.token = action.payload.token;
            state.accountId = action.payload.accountId;
        },
        logout: (state) =>{
            state.token = null;
            state.accountId = null;
        },
    },
});
export const {setUserRedux, logout} = authSlice.actions;
export default authSlice.reducer