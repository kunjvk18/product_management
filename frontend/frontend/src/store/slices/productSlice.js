import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productServices from '../../services/productServices';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    try {
        const products = await productServices.getProductsService();
        return products;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
});

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (product, { rejectWithValue }) => {
        try {
            const { productData, callback } = product
            const newProduct = await productServices.createProductService(productData);
            if (callback && typeof callback === 'function') { // Check if callback is a function
                callback(); // Call the callback function if it exists
            }
            return newProduct;
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || 'Something went wrong'
            );
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const updatedProduct = await productServices.updateProductService(id, productData);
            return updatedProduct;
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || 'Something went wrong'
            );
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (data, { rejectWithValue }) => {
        try {
            const { productId, callback } = data;
            let res = await productServices.deleteProductService(productId);
            if (callback && typeof callback === 'function') { // Check if callback is a function
                console.log("gggg", res)
                callback(); // Call the callback function if it exists
            }
            return productId;
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || 'Something went wrong'
            );
        }
    }
);

// Slice
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetProducts: (state) => {
            state.products = []
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.loading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.products.findIndex(
                    (product) => product.id === updatedProduct.id
                );
                state.products[index] = updatedProduct;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const deletedProductId = action.payload;
                state.products = state?.products?.filter(
                    (product) => product._id !== deletedProductId
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;