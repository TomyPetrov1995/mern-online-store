import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

export const getAllCategories = createAsyncThunk("category/getAllCategories",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/categories");
            return data;
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })

export const getOneCategory = createAsyncThunk("category/getOneCategory",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/categories");
            return data;
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })

const categorySlice = createSlice({
    name : "category",
    initialState : {
        category:null,
        categoryList : [],
        status: null,
        isLoading :false
    },
    extraReducers : (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.isLoading = true;
            state.status = null;
            state.categoryList = []
        });
        builder.addCase(getAllCategories.fulfilled,(state, {payload}) => {
            state.categoryList = payload.categories
            state.status = payload.message
            state.isLoading = false;
        });
        builder.addCase(getAllCategories.rejected,(state, {payload}) => {
            state.status = payload.message
            state.isLoading = false;
        })
    }
});

export default categorySlice.reducer;