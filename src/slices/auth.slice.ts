import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from 'web3';
import { toggleAlert } from "./alertMessage.slice";
import AxiosClient from "../axios";

const initialState = {
    username: "",
    isLoading: false,
    value: 0,
    isLoggedIn: false,
    error: ""
}

export const loginUser = createAsyncThunk(
    "loginUser",
    async ( _ , thunk) => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const response = await AxiosClient.post('auth/login', {
                publicAddress : account
            });
            const { data } = response;
            console.log(response);
            if(!data.success){
                thunk.dispatch(toggleAlert(`${data.message} data fetch not success`))
                return thunk.rejectWithValue(data.message)
            }
            const signature = await signMessage(data.data.username, data.data.nonce);
            const userStatus = await authenticateUser(data.data.username, signature);
            if(userStatus.data.success){
                localStorage.setItem("publicAddress", account );
                localStorage.setItem("accessToken", userStatus.data.data.accessToken);
                localStorage.setItem("refreshToken", userStatus.data.data.accessToken);
                return account;
            }
            thunk.dispatch(toggleAlert(`${userStatus.data.message} success`))
            return thunk.rejectWithValue(userStatus.data.message);
        } catch (error: any) {
            console.log("error is here", error)
            const message = error.code === 4001 ? error.message : "Something unexpected happen.";
            thunk.dispatch(toggleAlert(`${message} error is here`));
            return thunk.rejectWithValue("error");
        }
    }
)

const signMessage = async(publicAddress: string, nonce: string) => {
    const web3 = new Web3(window.ethereum);
    const signature = await web3.eth.personal.sign(nonce, publicAddress, "");
    return signature;
};

const authenticateUser = async(publicAddress: string, signature: string) => {
    const isAuthenticUser = await AxiosClient.post('auth/authenticate', {
        publicAddress,
        signature,
    });
    return isAuthenticUser;
};

export const logoutUser = createAsyncThunk(
    "logoutUser",
    async ( _ , thunk) => {
        try {
            localStorage.clear();
            thunk.dispatch(toggleAlert("Logout success."))
            return "Logout success."
        } catch (error) {
            thunk.rejectWithValue("Something unexpected happen. Logout unsuccess.")
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isLoggedIn = false;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.username = payload;
                state.isLoggedIn = true;
                state.error = "";
            })
            .addCase(loginUser.rejected, (state, { payload }: any ) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.username = "";
                state.error = payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.isLoggedIn = true;
                state.error = "";
            })
            .addCase(logoutUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.error = "";
                state.username = "";
            })
            .addCase(logoutUser.rejected, (state, { payload }: any ) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.username = "";
                state.error = payload;
            })
    }
});

export default authSlice.reducer;
