import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestService } from "./requestService";

const initialState = {
    requests:[],
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const makeRequest = createAsyncThunk(
    'request/makeRequest',
    async (requestData, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.makeRequest(requestData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getRequest = createAsyncThunk(
    'request/getRequest',
    async (foodId, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.getRequest(foodId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.requests = action.payload
            })
            .addCase(getRequest.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
            .addCase(makeRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(makeRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.error=''
            })
            .addCase(makeRequest.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
    }
})

export default foodSlice.reducer