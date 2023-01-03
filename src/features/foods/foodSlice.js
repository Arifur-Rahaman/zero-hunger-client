import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { foodService } from "./foodService";

const initialState = {
    foods:[],
    selectedFood: {},
    userFoods:[],
    isLoading: false,
    isUploading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const createFood = createAsyncThunk(
    'food/createFood',
    async (foodData, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await foodService.createFood(foodData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getFoods = createAsyncThunk(
    'food/getFoods',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await foodService.getFood(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)
export const getUserFoods = createAsyncThunk(
    'food/getUserFoods',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await foodService.getUserFoods(token)
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
        setSelectedFood: (state, action)=>{
            state.selectedFood = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(createFood.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFood.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createFood.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })

            .addCase(getFoods.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.foods = action.payload
            })
            .addCase(getFoods.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
            .addCase(getUserFoods.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserFoods.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userFoods = action.payload
            })
            .addCase(getUserFoods.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
    }
})

export const {setSelectedFood} = foodSlice.actions
export default foodSlice.reducer