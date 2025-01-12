import { backend_url } from "./constants";
import axios from "axios";

export const addOrder = async (orderObj) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${backend_url}order/`,
            orderObj,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res;
    } catch (e) {
        return e;
    }
}

export const getUserOrders = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${backend_url}order/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(res.data)
        return res.data;
    } catch (e) {
        return e;
    }
}

