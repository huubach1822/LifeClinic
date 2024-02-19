import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
    'userSlice/registerUser',
    async (user, thunkAPI) => {
        const response = await axios.post("http://localhost:8080/register", user);
        return response.data
    },
)

export const loginUser = createAsyncThunk(
    'userSlice/loginUser',
    async (user, thunkAPI) => {
        const response = await axios.post("http://localhost:8080/login", user);
        return response.data
    },
)

const initialState = {
    account: {}
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.account = action.payload.account;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.account = action.payload.account;
            })
    },
})

export default userSlice.reducer