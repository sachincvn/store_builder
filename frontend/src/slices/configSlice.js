import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
    const { data } = await axios.get('/api/config');
    return data;
});

const initialState = {
    settings: {
        appName: 'Blinkit Clone',
        homeTitle: 'Welcome',
        themeColor: '#0c831f',
        navColor: '#ffffff',
        navTextColor: '#000000',
        buttonColor: '#0c831f',
        footerColor: '#111827',
        footerTextColor: '#ffffff',
        bannerImage: '',
        promoCode: '',
        gradientType: 'default',
    },
    loading: false,
    error: null,
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfig.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(fetchConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default configSlice.reducer;
