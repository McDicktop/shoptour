import { backend_url } from "./constants";
import axios from "axios";

export const addOrder = async (orderObj) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${backend_url}order/`, orderObj, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (e) {
        return e;
    }
};

export const getUserOrders = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backend_url}order/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (e) {
        return e;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backend_url}order/getone/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (e) {
        return e;
    }
};

export const makePaymentByOrderId = async (orderId, body) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
            `${backend_url}order/payment/${orderId}`,
            {
                ...body
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data;
    } catch (e) {
        return e;
    }
};
