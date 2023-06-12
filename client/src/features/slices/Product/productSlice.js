import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

export const getAllProducts = createAsyncThunk("product/getAllProducts",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/products");
            return data;
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })

export const getOneProduct = createAsyncThunk("product/getOneProduct",
    async (payload,thunkAPI) => {
        try {
            const {data} =await axios.get(`/products/${payload}`);
            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    }
)

//CREATE BASKET
export const createCart = createAsyncThunk("product/createCart",
    async (payload,thunkAPI) => {
        try {
            const {data} =await axios.post(`/basket`,payload.id);
            return data
        }catch (e) {

        }
    }
)

export const getCart = createAsyncThunk("product/getCart",
    async (payload,thunkAPI) => {
        try {
            const {data} =await axios.get(`/basket`);
            return data
        }catch (e) {

        }
    }
)

export const addProductToCart = createAsyncThunk("product/addProductToCart",
    async (payload,thunkAPI) => {
    try {
            const {data} =await axios.post(`/basket/add`,payload);

            return data
        }catch (e) {

        }
    }
)

export const updateProductToCart = createAsyncThunk("product/updateProductToCart",
    async (payload,thunkAPI) => {
        try {
            const {data} =await axios.put(`/basket/add`,payload);
            return data
        }catch (e) {

        }
    }
)

export const removeProduct = createAsyncThunk("product/removeProduct",
    async (id,thunkAPI) => {
        try {
            const {data} =await axios.delete(`/basket/${id}`);

            return data
        }catch (e) {

        }
    }
)
const productSlice = createSlice({
    name : "product",
    initialState : {
        productList : [],
        currentCart : null,
        cartList : [],
        productPrice:null,
        product :null,
        cartProduct:null,
        filteredByPrice:[],
        filteredByCategory:[],
        status: null,
        isLoading :false,
        cartProductPrice :[],
        price:0
    },
    reducers:{
        //FILTERED PRODUCT BY PRICE
      getProductsByPrice : (state, {payload}) => {
          const list = state.productList.filter(({price}) => price < payload );
          state.filteredByPrice = list;
      },

        //FILTERED PRODUCT BY CATEGORY
      filteredProductByCategory :(state, {payload})=>{
          const list = state.productList.filter(({category}) => category.name === payload.name);

          state.filteredByCategory = list;

      },

      //DECREMENT
      decrement :(state, {payload}) => {
          if (state.number < 2) return
          state.number = state.number - 1
      },
      increment :(state, {payload}) => {
            state.number = state.number + 1;
        }
    },
    extraReducers : (builder) => {

        //GET ALL PRODUCTS
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
            state.categoryList = []
        });
        builder.addCase(getAllProducts.fulfilled,(state, {payload}) => {
            state.productList = payload.products.reverse()
            state.isLoading = false;
        });
        builder.addCase(getAllProducts.rejected,(state, {payload}) => {
            state.status = payload.message
            state.isLoading = false;
        });

        //GET ONE PRODUCTS
        builder.addCase(getOneProduct.pending, (state) => {
            state.isLoading = true;
            state.product = null
        });
        builder.addCase(getOneProduct.fulfilled,(state, {payload}) => {
            state.product = payload.product
            state.isLoading = true;
        });
        builder.addCase(getOneProduct.rejected,(state, {payload}) => {
            state.isLoading = false;
        });

        //GET BASKET
        builder.addCase(getCart.pending,(state, {payload}) => {
            // state.status = payload.message
        });
        builder.addCase(getCart.fulfilled,(state, {payload}) => {
            state.cartList = payload?.basket?.products
        });
        builder.addCase(getCart.rejected,(state, {payload}) => {
            state.status = payload.message
        });


        //CREATE BASKET
        builder.addCase(addProductToCart.pending,(state, {payload}) => {
            // state.status = payload.message
        });
        builder.addCase(addProductToCart.fulfilled,(state, {payload}) => {
            state.isLoading = true
            state.cartList = payload?.basket?.products
            state.status = payload.message
            state.cartProduct = payload?.basket;
            console.log(payload)
        });
        builder.addCase(addProductToCart.rejected,(state, {payload}) => {
            state.status = payload.message
            state.cartList = payload?.basket?.products
        });

        //UPDATE BASKET
        builder.addCase(updateProductToCart.pending,(state, {payload}) => {
            // state.status = payload.message
        });
        builder.addCase(updateProductToCart.fulfilled,(state, {payload}) => {
            state.isLoading = true
            state.cartList = payload?.basket?.products
            state.status = payload.message
            state.cartProduct = payload?.basket;
            state.price = payload.product?.allPrice
            // console.log()
        });
        builder.addCase(updateProductToCart.rejected,(state, {payload}) => {
            // state.status = payload.message
            // state.cartList = payload?.basket?.products
        });

        //REMOVE PRODUCT TO CART
        builder.addCase(removeProduct.pending,(state, {payload}) => {
            // state.status = payload.message
        });
        builder.addCase(removeProduct.fulfilled,(state, {payload}) => {
            state.isLoading = true;
            state.cartList = payload?.basket?.products
        });
        builder.addCase(removeProduct.rejected,(state, {payload}) => {
            state.status = payload.message
        });
    }
});

export const {getProductsByPrice,filteredProductByCategory,decrement,increment} = productSlice.actions;
export default productSlice.reducer;