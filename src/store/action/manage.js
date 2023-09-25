import { createAsyncThunk } from '@reduxjs/toolkit';
import manage from '../api/manage';
const {
    getUsers,
    changeStatusAccount,
    getDiscounts,
    updateDiscount,
    creatDiscount,
    getDiscountById,
    statisticTotalByDate,
    statisticTotalByMonth,
    getSizes,
    statisticItemByDate,
    statisticItemByMonth,
} = manage

export const getUsersThunk = createAsyncThunk(
    'manage/getUsers',
    async (data) => {
        const res = await getUsers(data);
        return res;
    }
);
export const changeStatusAccountThunk = createAsyncThunk(
    'manage/changeStatusAccount',
    async (data) => {
        const res = await changeStatusAccount(data);
        return res;
    }
);
export const getDiscountsThunk = createAsyncThunk(
    'manage/getDiscounts',
    async (data) => {
        const res = await getDiscounts(data);
        return res;
    }
);
export const updateDiscountThunk = createAsyncThunk(
    'manage/updateDiscount',
    async (data) => {
        const res = await updateDiscount(data);
        return res;
    }
);
export const creatDiscountThunk = createAsyncThunk(
    'manage/creatDiscount',
    async (data) => {
        const res = await creatDiscount(data);
        return res;
    }
);
export const getDiscountByIdThunk = createAsyncThunk(
    'manage/getDiscountById',
    async (data) => {
        const res = await getDiscountById(data);
        return res;
    }
);
export const statisticTotalByDateThunk = createAsyncThunk(
    'manage/statisticTotalByDate',
    async (data) => {
        const res = await statisticTotalByDate(data);
        return res;
    }
);
export const statisticTotalByMonthThunk = createAsyncThunk(
    'manage/statisticTotalByMonth',
    async (data) => {
        const res = await statisticTotalByMonth(data);
        return res;
    }
);
export const statisticItemByDateThunk = createAsyncThunk(
    'manage/statisticItemByDate',
    async (data) => {
        const res = await statisticItemByDate(data);
        return res;
    }
);
export const statisticItemByMonthThunk = createAsyncThunk(
    'manage/statisticItemByMonth',
    async (data) => {
        const res = await statisticItemByMonth(data);
        return res;
    }
);
export const getSizesThunk = createAsyncThunk(
    'manage/getSizes',
    async (data) => {
        const res = await getSizes(data);
        return res;
    }
);