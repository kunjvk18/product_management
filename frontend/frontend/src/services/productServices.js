import axios from "axios";
import axiosInstance from "../utils/axiosInstance";


const getProductsService = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

const createProductService = async (productData) => {
  const response = await axios.post('http://localhost:3001/api/products', productData,{
    headers: { 
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}` ,
        "Content-Type": "multipart/form-data" 
    },
  });
  return response.data;
};

const updateProductService = async (id, productData) => {
  const response = await axiosInstance.put(`/products/${id}`, productData);
  return response.data;
};

const deleteProductService = async (id) => {
  await axiosInstance.delete(`/products/${id}`);
};

const productServices = {
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
};

export default productServices;
