import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
const API_URL = 'http://localhost:3001/api/';

const loginService = async (loginData) => {
    const res = await axios.post(API_URL + 'auth/login', loginData);
    return res.data;
}

const getAllUsersService = async () => {
    const res = await axiosInstance.get(API_URL + 'users');
    return res.data;
}

const createUserService = async (userData) => {
    const res = await axiosInstance.post(API_URL + 'auth/register', userData);
    return res.data;
}

const getUserService = async () => {
    const res = await axiosInstance.get(API_URL + 'users/profile', );
    return res.data;
}

const authServices = {
    loginService,
    getAllUsersService,
    createUserService,
    getUserService
    
};

export default authServices;
