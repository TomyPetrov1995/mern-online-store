import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

export const getBrand = createAsyncThunk("brand/getBrand",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.get(`/brands/${payload}`);
            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })

const brandSlice = createSlice({
    name : "brand",
    initialState : {
        brandList :[]
    },
    extraReducers : (builder) => {

    }
});

export default brandSlice.reducer;