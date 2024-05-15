import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/slices/authSlice';
import {
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
} from '@material-ui/core';

const CreateUser = (props) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'regular',
    });

    const handleNewUserDataChange = (event) => {
        setNewUserData({ ...newUserData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const handleCreateNewUser = () => {
        // Implement logic to create a new user
        const errors = validateNewUserData(newUserData);
        if (errors && Object.keys(errors).length === 0) {
            dispatch(createUser({
                formData: newUserData,
                callback: (res) => {
                    if (res) alert("user created successfully")
                }
            }))
        } else {
            setErrors(errors);
        }
    };

    const validateNewUserData = (data) => {
        const errors = {};
        if (!data.name) {
            errors.name = 'Name is required';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email address';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        }
        if (!data.role) {
            errors.role = 'Role is required';
        }
        return errors;
    };

    return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Create New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        value={newUserData.name}
                        onChange={handleNewUserDataChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        value={newUserData.email}
                        onChange={handleNewUserDataChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        value={newUserData.password}
                        onChange={handleNewUserDataChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <FormControl fullWidth error={Boolean(errors.role)}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            required
                            value={newUserData.role}
                            onChange={handleNewUserDataChange}
                        >
                            <MenuItem value="regular">Regular</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                        {errors && errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateNewUser} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default CreateUser;