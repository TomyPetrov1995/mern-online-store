import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {BASE_URL} from "../../utils/constants";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: ({ _id }) => `/api/products/${_id}`,
            providesTags: ["Product"],
        })
    }),
});

export const { useGetProductQuery } = apiSlice;