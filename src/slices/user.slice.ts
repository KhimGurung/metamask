import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../axios";
import { toggleAlert } from "./alertMessage.slice";

const initialState = {
    username: "",
    isLoading: false,
    isLoggedIn: false,
    error: "",
    value: 0
}

/**
 * api call for registration of the user
 */
export const registerUser = createAsyncThunk(
    "registerUser",
    async ( _ , thunk) => {
        try {
            /** request for available accounts in the browser and fetch first one */
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const publicAddress = accounts[0];

            /** make api request to register the user */
            const { data } = await AxiosClient.post('users', {
                name: publicAddress,
                username: publicAddress,
            })

            /** on successfull registration of user, store the public address, refresh and access token in localstorage for global access */
            if(data.success){
                localStorage.setItem("publicAddress", publicAddress );
                localStorage.setItem("accessToken", data.data.accessToken );
                localStorage.setItem("refreshToken", data.data.refreshToken );
                return data.username;
            }
            else{
                /** in case of error show error alert with message and reject the process */
                thunk.dispatch(toggleAlert(data.message.split(",")));
                return thunk.rejectWithValue(data.message);
            }
        } catch (error) {
            return thunk.rejectWithValue("error");
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isLoggedIn = true;
                state.username = "";
                state.error = "";
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.username = payload;
                state.isLoggedIn = true;
                state.error = "";
            })
            .addCase(registerUser.rejected, (state, { payload }: any) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.username = "";
                state.error = payload;
            })
    }
})

export default userSlice.reducer
