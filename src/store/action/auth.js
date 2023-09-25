import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../api/auth';
const {
    resetPassword,
    verifyEmail,
    activeAccount,
    changePassword,
    register,
    login,
    changeInfor,
    getUserById,
} = auth;

export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async (data) => {
        const res = await resetPassword(data);
        return res;
    }
);

export const verifyEmailThunk = createAsyncThunk(
    'auth/verifyEmail',
    async (data) => {
        const res = await verifyEmail(data);
        return res;
    }
);

export const activeAccountThunk = createAsyncThunk(
    'authenticate/activeAccount',
    async (data) => {
        const res = await activeAccount(data);
        return res;
    }
);

export const changePasswordThunk = createAsyncThunk(
    'authenticate/changePassword',
    async (data) => {
        console.log(data)
        const res = await changePassword(data);
        return res;
    }
);
export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data) => {
        try {
            const res = await register(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const loginThunk = createAsyncThunk(
    'auth/login',
    async (data) => {
        try {
            const res = await login(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const changeInforThunk = createAsyncThunk(
    'authenticate/changeInfor',
    async (data) => {
        console.log(data)
        const res = await changeInfor(data);
        return res;
    }
);
export const getUserByIdThunk = createAsyncThunk(
    'authenticate/getUserById',
    async (data) => {
        console.log(data)
        const res = await getUserById(data);
        return res;
    }
);
