import { createSlice } from "@reduxjs/toolkit";
import {
    getDiscountsThunk,
    getOrderDetailThunk,
    getOrdersThunk,
    getPaymentsThunk
} from "../action/order";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: null,
        payment: null,
        discount: null,
    },
    reducers: {
        clearOrder: (state) => {
            state.data = null;
            state.payment = null;
            state.discount = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getOrdersThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.list = payload;
                }
            }
        );
        builder.addCase(
            getDiscountsThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.discount = payload;
                }
            }
        );
        builder.addCase(
            getPaymentsThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.payment = payload;
                }
            }
        );
    },
})
export const {
    clearOrder
} = orderSlice.actions;
export default orderSlice.reducer