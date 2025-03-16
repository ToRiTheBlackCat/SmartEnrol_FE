import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../Service/type";

interface UpdateUserPayload {
    accountName?: string;
    email?: string;
    area?: string;
}

const initialState: authState = {
    accountId: null,
    token: null,
    accountName: null,
    email: null,
    area: null,
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
            state.area = action.payload.area;
        },
        updateUserInfo: (state, action: PayloadAction<UpdateUserPayload>) => {
            if (action.payload.accountName) {
                state.accountName = action.payload.accountName;
            }
            if (action.payload.email) {
                state.email = action.payload.email;
            }
            if(action.payload.area){
                state.area = action.payload.area;
            }
        },
        logout: (state) => {
            state.token = null;
            state.accountId = null;
            state.accountName = null;
            state.email = null;
        },
    },
});

export const { setUserRedux, updateUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
