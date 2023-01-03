import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "./authService"

const signedInUser = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: signedInUser ? signedInUser : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const signin = createAsyncThunk(
    'auth/signin',
    async (userData, thunkApi) => {
        try {
            return await authService.signin(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, thunkApi) => {
        try {
            return await authService.signup(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const signout = createAsyncThunk(
    'auth/signout',
    async (_, thunkApi) => {
        await authService.signout()
    }
)

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (data, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await authService.updateUserProfile(data, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.error = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(signout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { reset } = authSlice.actions
export default authSlice.reducer