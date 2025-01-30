import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
        const result = await axios.get("http://localhost:5000/api/shop/products/get");
        return result?.data;
    }
);

const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                console.log(action.payload , "action payload index");
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.productList = [];
            });
    },
});

export default shoppingProductSlice.reducer
