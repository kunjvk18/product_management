import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetProducts } from '../../store/slices/productSlice';
import ProductList from './ProductList';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Button, Box, CircularProgress } from '@material-ui/core';
import CreateProductForm from './CreateProductForm';
import { Add } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { getAllUsers, getUser } from '../../store/slices/authSlice';
import {  toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '35px'
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    }, button: {
        display: 'flex',
        alignItems: 'center',
        gap: "5px",
    }
}));

const ProductGrid = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products, error, isLoading } = useSelector((state) => state.product);
    const { user, users } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
    console.log(user)

    useEffect(() => {
        dispatch(getProducts());

        return () => {
            dispatch(resetProducts())
        }
    }, []);


    useEffect(() => {
        if (user && user.role === 'admin') {
            dispatch(getAllUsers())
        }
    }, [user])

    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        if (Array.isArray(products) && products.length) {
            setFilteredProducts(products)
        }
    }, [products])

    useEffect(() => {
        const filtered = products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreateProduct = () => {
        setOpenCreateProductModal(true); // Open the modal
    };

    const handleCloseCreateProductModal = () => {
        setOpenCreateProductModal(false); // Close the modal
    };

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct({
            productId: id,
            callback: () => {
                return <Alert severity="success">Product is successfully deleted.</Alert>
            }
        }))
    }

    return <>
        <Container className={classes.container}>
            <Box className={classes.wrapper}>
                <Typography variant="h4" gutterBottom>
                    Products
                </Typography>
                <Box className={classes.searchContainer}>
                    <TextField
                        label="Search by name or SKU"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        variant="standard"
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleCreateProduct}>
                        <Add /> Create Product
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={2}>
                {filteredProducts && filteredProducts.length > 0 ?
                    <ProductList
                        role={user?.role}
                        products={filteredProducts}
                        handleDeleteProduct={handleDeleteProduct}
                    />
                    : <p>No Data Found!!!!!!!!</p>
                }
            </Grid>
            {/* Modal for Create Product Form */}
            <CreateProductForm
                role={user?.role}
                users={users}
                open={openCreateProductModal}
                handleClose={handleCloseCreateProductModal}
            />
        </Container>
        { error && toast.error(error, {
                    position: "top-right",
                    toastId:error
                  })}
        {!!isLoading && <CircularProgress />}

    </>
};

export default ProductGrid;