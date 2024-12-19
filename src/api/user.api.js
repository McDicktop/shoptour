import { backend_url } from "./constants";
import { toast } from "react-toastify";
import axios from "axios";

export const getUserData = async (token) => {
    try {
        const res = await axios.get(backend_url + "auth/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const userLogin = async (currentUser) => {
    try {
        const res = await axios.post(backend_url + "auth/auth", {
            username: currentUser.username,
            password: currentUser.password,
        });

        return res.data;
    } catch (e) {
        return e.response.data.message;
        // toast(e.response.data.message);

    }
};

export const createUser = async (currentUser) => {
    try {
        const res = await toast.promise(
            axios.post(backend_url + "auth/register", {
                username: currentUser.username,
                password: currentUser.password,
            }),
            {
                pending: "Пользователь создается",
                success: "Пользователь успешно создан 👌",
            }
        );

        return res.data;
    } catch (e) {
        toast(e.response.data.message);
    }
};