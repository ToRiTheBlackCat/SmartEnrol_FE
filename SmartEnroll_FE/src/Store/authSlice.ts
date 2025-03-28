import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../Service/type";
import Cookies from "js-cookie";

interface UpdateUserPayload {
    accountName?: string;
    email?: string;
    area?: string;
}

const storedUser = Cookies.get("user");
const initialState: authState = storedUser
  ? JSON.parse(storedUser)
  : {
      accountId: null,
      token: null,
      accountName: null,
      email: null,
    };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserRedux: (state, action: PayloadAction<authState>) => {
            state.token = action.payload.token;
            state.accountId = action.payload.accountId;
            state.accountName = action.payload.accountName;
            state.email = action.payload.email;
        },
        updateUserInfo: (state, action: PayloadAction<UpdateUserPayload>) => {
            if (action.payload.accountName) {
                state.accountName = action.payload.accountName;
            }
            if (action.payload.email) {
                state.email = action.payload.email;
            }
        },
        logout: (state) => {
            state.token = null;
            state.accountId = null;
            state.accountName = null;
            state.email = null;
            Cookies.remove("user")
        },
    },
});

export const { setUserRedux, updateUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
