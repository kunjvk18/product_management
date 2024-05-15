import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TextField,
    Typography,
    Container,
    CircularProgress,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    loginMain: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '45px 35px',
        border: '1px solid #3f51b5',
        borderRadius: '15px',
        boxShadow: '0 0 8px 7px #00000012',
        width: '40%',
    },
    loginForm: {
        display: "flex",
        flexDirection: 'column',
        gap: '25px',
        marginTop:'25px',
    },
    loginButton:{
        padding:'8px 45px',
        width:'fit-content',
    }
}));

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({
            formData,
            callback: () => {
                navigate('/products')
            }
        }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box className={classes.loginMain}>
                <Typography component="h2" variant="h4" color='primary'>
                    Login
                </Typography>
                <form className={classes.loginForm} onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email" // Set type to 'email' for email validation
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'} // Show password if 'showPassword' is true
                            value={formData.password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            autoComplete="current-password"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </form>
                {error && <Typography color="error">{error}</Typography>}
            </Box>
        </Container>
    );
};

export default Login;
