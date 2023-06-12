import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/User/userSlice";
import categorySlice from "./slices/Category/categorySlice";
import productSlice from "./slices/Product/productSlice";
import {apiSlice} from "./api/apiSlice";
import brandSlice from "./slices/Brand/brandSlice";

const store = configureStore({
    reducer :{
        auth : userSlice,
        category : categorySlice,
        product : productSlice,
        brand : brandSlice
    },
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
    devTools :true
});

export default store;