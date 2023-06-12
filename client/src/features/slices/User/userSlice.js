import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js"

export const createUser = createAsyncThunk("auth/createUser",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.post(`/auth/register`,payload);

            if(data.token){
                window.localStorage.setItem("token",data.token);
            }
            return data
        }catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e)
        }
    });

export const getMe = createAsyncThunk("auth/getMe",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.get(`/auth/me`);
            return data

        }catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e)
        }
    })

export const updateUser = createAsyncThunk("auth/updateUser",
    async (payload,thunkAPI) => {
        try {
            const formData = new FormData();
             formData.append("avatar",payload.value.avatar)
             formData.append("name",payload.value.name)
             formData.append("email",payload.value.email)
             formData.append("password",payload.value.password)

            const {data} = await axios.put(`/auth/update/${payload.id}`,formData,
                {headers :{
                    "Content-Type":"multipart/form-data"
                    }});
            return data

        }catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e)
        }
    })


export const loginUsers = createAsyncThunk("auth/loginUsers",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.post(`/auth/login`,payload);
            if (data.token){
                window.localStorage.setItem("token",data.token)
            }
            return data;

        }catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

const initialState = {
    user:null,
    token:null,
    isLoading:false,
    status:null
}
const userSlice = createSlice({
    name : "auth",
    initialState ,
    reducers :{
        logOut :(state) => {
            state.user = null
            state.token = null
            state.isLoading=null
            state.status = null
        }
    },
    extraReducers : (builder) => {
        //REGISTER
        builder.addCase(createUser.pending,(state, {payload}) => {
            state.isLoading = true;
            state.status = null;

        })
        builder.addCase(createUser.fulfilled,(state, {payload}) => {
            state.token = payload.token;
            state.user = payload.user;
            state.status = payload.message;
            state.isLoading = false
        })
        builder.addCase(createUser.rejected,(state, {payload}) => {
            state.isLoading = false;
            state.status = payload.message
        })

        //LOGIN
        builder.addCase(loginUsers.pending,(state, {payload}) => {
            state.isLoading = true;
            state.status = null;
        })
        builder.addCase(loginUsers.fulfilled,(state, {payload}) => {
            state.token = payload.token;
            state.user = payload.user;
            state.status = payload.message;
            state.isLoading = false
        })
        builder.addCase(loginUsers.rejected,(state, {payload}) => {
            state.isLoading = false;
            state.status = payload.message
        })

        //ПРОВЕРКА АВТОРИЗАЦИИ
        builder.addCase(getMe.pending,(state, {payload}) => {
            state.isLoading = true;
            state.status = null;
        })
        builder.addCase(getMe.fulfilled,(state, {payload}) => {
            state.token = payload?.token;
            state.user = payload?.user;
            state.status = null;
            state.isLoading = false
        })
        builder.addCase(getMe.rejected,(state, {payload}) => {
            state.isLoading = false;
            state.status = payload.message
        })

        //UPDATE USER
        //ПРОВЕРКА АВТОРИЗАЦИИ
        builder.addCase(updateUser.pending,(state, {payload}) => {
            state.isLoading = true;
            state.status = null;
        })
        builder.addCase(updateUser.fulfilled,(state, {payload}) => {
            state.user = payload.user;
            state.status = payload.message

        })
        builder.addCase(updateUser.rejected,(state, {payload}) => {
            state.isLoading = false;
            state.status = payload.message
        })

    }
});

export const checkIsAuth = state => Boolean(state.auth.token);
export const {logOut} = userSlice.actions;
export default userSlice.reducer