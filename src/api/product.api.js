import { backend_url } from "./constants";
import axios from "axios";

export const getProducts = async () => {
    try {
        const res = await axios.get(backend_url + 'product');
        return res.data;
    }
    catch (e) {
        console.error(e);
    }
}

export const getProductById = async (id) => {
    try {
        const res = await axios.get(backend_url + 'product/' + id);
        return res.data;
    } catch (e) {
        return e;
    }
}

export const addProductApi = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${backend_url}product/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
        return data;
    } catch (e) {
        return e;
    }
}

export const removeProduct = async (id) => {

    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${backend_url}product/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data;
    } catch (e) {
        return e;
    }
}


export const editProductApi = async (editedObj, id) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.put(`${backend_url}product/${id}`,
            editedObj,
            {
                headers: { Authorization: `Bearer ${token}` }
            });

        return data;
    } catch (e) {
        return e;
    }
}