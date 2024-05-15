import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from '../../services/authServices';

export const login = createAsyncThunk(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
        try {
            const { formData, callback } = loginData; // Destructure formData and callback
            const res = await authServices.loginService(formData);
            localStorage.setItem('accessToken', res.token);
            if (callback && typeof callback === 'function') {// Check if callback is a function
                callback(); // Call the callback function if it exists
            }
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (userData, { rejectWithValue }) => {
        try {
            const { formData,callback } = userData; // Destructure formData and callback
            const res = await authServices.createUserService(formData);
            if (callback && typeof callback === 'function') { // Check if callback is a function
                callback(res); // Call the callback function if it exists
            }
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await authServices.getAllUsersService();
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await authServices.getUserService();
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        users:[],
        user:null,
        token: null,
        error: null,
        isLoading: false,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user
            state.token = action.payload.token;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.users = [...state.users,action.payload]
            state.token = action.payload;
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.users = action.payload;
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isAuthenticated = true;
        })

        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    },

});

export const { logout } = authSlice.actions;
export default authSlice.reducer;