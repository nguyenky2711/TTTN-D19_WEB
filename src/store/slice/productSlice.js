import { createSlice } from "@reduxjs/toolkit";
import {
    createProductThunk,
    getListProductThunk
} from "../action/product";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: null
    },
    reducers: {
        clearProduct: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getListProductThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.data = payload;
                }
            }
        );
    },
})
export const {
    clearProduct
} = productSlice.actions;
export default productSlice.reducer