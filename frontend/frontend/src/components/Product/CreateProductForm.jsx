import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Modal, Chip } from '@material-ui/core';
import { Alert, Autocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../store/slices/productSlice';
import {  toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
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
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
    },
}));

const CreateProductForm = ({ open, handleClose, users, role }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: '',
        logo: null,
        category: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target || {};
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSave = () => {
        const newErrors = {};
        // Check if any field is empty
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.description) {
            newErrors.description = 'Description is required';
        }
        if (!formData.sku) {
            newErrors.sku = 'SKU is required';
        }
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Implement your save logic here
        const formValue = new FormData()
        formValue.append('image', formData.logo)
        formValue.append('name', formData.name)
        formValue.append('description', formData.description)
        formValue.append('sku', formData.sku)
        formValue.append('category', formData.category)
        formValue.append('assignedTo', value?.map(v => v._id).join(','));
        dispatch(createProduct({
            productData: formValue,
            callback: () => {
                toast.success("Product is successfully created.", {
                    position: "top-right",
                  });
            }
        }))
        // Reset form data
        setFormData({
            name: '',
            description: '',
            sku: '',
            logo: null,
            category: '',
        });
        setValue([])
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-product-modal"
            aria-describedby="create-product-modal-description"
        >
            <div className={classes.modal}>
                <Typography variant="h6" gutterBottom>
                    Create Product
                </Typography>
                <form className={classes.form}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        required
                    />
                    <TextField
                        name="sku"
                        label="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                        error={!!errors.sku}
                        helperText={errors.sku}
                        required
                    />
                    <TextField
                        name="category"
                        label="Category"
                        value={formData.category}
                        onChange={handleChange}
                        error={!!errors.category}
                        helperText={errors.category}
                        required
                    />
                    {/* Image Upload for Product Logo */}
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => {
                            setFormData({ ...formData, logo: e.target.files[0] });
                        }}
                    />
                    {role && role.includes("admin") &&
                        <Autocomplete
                            value={value}
                            name="assignTo"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            multiple
                            id="tags-filled"
                            options={users ? users : []}
                            getOptionLabel={(option) => option.name || ''}
                            renderTags={(value, getTagProps) => {
                                return value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option.name || ''}
                                        {...getTagProps({ index })}
                                    />
                                ));
                            }}
                            renderInput={(params) => <TextField {...params} label="Users" />}
                        />}
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="contained" color="default" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateProductForm;
