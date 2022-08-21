import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showAlert: false,
    message: ""
}

const alertMessageSlice = createSlice({
    name: "alertMessage",
    initialState,
    reducers: {
        toggleAlert: (state, action) => {
            state.showAlert = !state.showAlert;
            state.message = action.payload;
        }
    }
});

export const { toggleAlert } = alertMessageSlice.actions;
export default alertMessageSlice.reducer;