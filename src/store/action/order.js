import { createAsyncThunk } from '@reduxjs/toolkit';
import order from '../api/order';
const {
    getDiscounts,
    getDiscountByID,
    getOrderDetail,
    getOrders,
    getPayments,
    getPaymentByID,
    creatOrder,
    changeStatusOrder,
    getOrdersByUser,
    updateReivew,
} = order

export const getPaymentsThunk = createAsyncThunk(
    'payment/getPayments',
    async (data) => {
        const res = await getPayments(data);
        return res;
    }
);
export const getPaymentByIDThunk = createAsyncThunk(
    'discount/getPaymentByID',
    async (data) => {
        const res = await getPaymentByID(data);
        return res;
    }
);
export const getDiscountsThunk = createAsyncThunk(
    'discount/getDiscounts',
    async (data) => {
        const res = await getDiscounts(data);
        return res;
    }
);
export const getDiscountByIDThunk = createAsyncThunk(
    'discount/getDiscountByID',
    async (data) => {
        const res = await getDiscountByID(data);
        return res;
    }
);
export const getOrdersThunk = createAsyncThunk(
    'order/getOrders',
    async (data) => {
        const res = await getOrders(data);
        return res;
    }
);
export const getOrdersByUserThunk = createAsyncThunk(
    'order/getOrdersByUser',
    async (data) => {
        const res = await getOrdersByUser(data);
        return res;
    }
);
export const getOrderDetailThunk = createAsyncThunk(
    'order/getOrderDetail',
    async (data) => {
        const res = await getOrderDetail(data);
        return res;
    }
);
export const creatOrderThunk = createAsyncThunk(
    'order/creatOrder',
    async (data) => {
        const res = await creatOrder(data);
        return res;
    }
);
export const changeStatusOrderThunk = createAsyncThunk(
    'order/changeStatusOrder',
    async (data) => {
        const res = await changeStatusOrder(data);
        return res;
    }
);
export const updateReivewThunk = createAsyncThunk(
    'order/review/updateReivew',
    async (data) => {
        const res = await updateReivew(data);
        return res;
    }
);