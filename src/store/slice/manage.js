import { createSlice } from "@reduxjs/toolkit";
import { getDiscountsThunk, getUsersThunk, statisticTotalByDateThunk, statisticTotalByMonthThunk } from "../action/manage";

const manageSlice = createSlice({
    name: 'manage',
    initialState: {
        users: null,
        discount: null,
        // discount: null,

    },
    reducers: {
        clearManage: (state) => {
            state.users = null;
            state.discount = null;
            // state.statistic.date = null;
            // state.statistic.month = null;
            // state.discount = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUsersThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.users = payload;
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
        // builder.addCase(
        //     statisticTotalByDateThunk.fulfilled,
        //     (state, { payload }) => {
        //         if (payload) {
        //             state.statistic.date = payload;
        //         }
        //     }
        // );
        // builder.addCase(
        //     statisticTotalByMonthThunk.fulfilled,
        //     (state, { payload }) => {
        //         if (payload) {
        //             state.statistic.month = payload;
        //         }
        //     }
        // );

    },
})
export const {
    clearManage
} = manageSlice.actions;
export default manageSlice.reducer