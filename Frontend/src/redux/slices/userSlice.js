import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, changePassword } from '../../service/userService'

export const registerRedux = createAsyncThunk(
    'userSlice/registerRedux',
    async (user, thunkAPI) => {
        const response = await registerUser(user)
        return response.data
    },
)

export const loginRedux = createAsyncThunk(
    'userSlice/loginRedux',
    async (user, thunkAPI) => {
        const response = await loginUser(user)
        return response.data
    },
)

export const changePwRedux = createAsyncThunk(
    'userSlice/changePwRedux',
    async (user, thunkAPI) => {
        const response = await changePassword(user)
        return response.data
    }
)

const initialState = {
    account: {}
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        logoutAccount(state) {
            state.account = {}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerRedux.fulfilled, (state, action) => {
                state.account = action.payload.account;
            })
            .addCase(loginRedux.fulfilled, (state, action) => {
                state.account = action.payload.account;
            })
            .addCase(changePwRedux.fulfilled, (state, action) => {
                if (action.payload.code === 0) {
                    state.account = action.payload.account;
                }
            })
    },
})

export const { logoutAccount } = userSlice.actions
export default userSlice.reducer