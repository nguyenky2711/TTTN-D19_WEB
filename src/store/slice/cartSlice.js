import { createSlice } from "@reduxjs/toolkit";
import {
    getCartThunk,
} from "../action/cart";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: null
    },
    reducers: {
        clearCart: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getCartThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.data = payload;
                }
            }
        );
    },
})
export const {
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer