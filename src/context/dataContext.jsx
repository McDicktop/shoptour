import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
    getProducts,
    removeProduct,
    addProductApi,
    editProductApi
} from "../api/product.api.js";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [data, setData] = useState([]);

    const [categories, setCategories] = useState([]);   // ДОБАВИЛ СОСТОЯНИЕ ДЛЯ КАТЕГОРИЙ ТОВАРОВ


    useEffect(() => {
        const fetchData = async () => {
            const shopData = await getProducts();
            setData(shopData);

            const cats = Array.from(new Set(shopData.map((el) => el.type)));    // ПОЛУЧАЮ ВСЕ ВИДЫ КАТЕГОРИЙ ИЗ ДАННЫХ В БД
            cats.unshift('all');
            setCategories(cats);
        };
        fetchData();
    }, []);



    const deleteProduct = async (id) => {
        const res = await removeProduct(id);

        if (!res.message) {
            setData((prev) =>
                prev.filter((el) => el._id !== res._id)
            );
            return { message: "Product was removed!" };
        }

        return { message: res.response.data.message }
    };

    const addProduct = async (formData) => {

        const res = await addProductApi(formData);

        if (!res.message) {
            setData((prev) => [...prev, res]);
            return { message: 'Product added!', status: 200 }
        }

        switch (res.status) {
            case 400: {
                return { message: res.response.data.message }
            }
            default: {
                return { message: 'Internal server error' }
            }
        }
    };

    const editProduct = async (editedObj, id) => {

        const res = await editProductApi(editedObj, id);

        if (!res.message) {
            setData((prev) => prev.map((el) => el._id === id ? res : el));
            return { message: 'Product changed!', status: 200 }
        }
        switch (res.status) {
            case 404: {
                return { message: res.response.data.message }
            }
            case 400: {
                if (res.response.data.message.code === 11000) return { message: "The code already exists" }
                return { message: res.response.data.message[0].message }
            }
            default: {
                return { message: 'Internal server error' }
            }
        }
    }

    const getProduct = (id) => {
        return data.find(el => el._id === id);
    }

    const contextValue = {
        data,
        getProduct,
        categories,
        deleteProduct,
        addProduct,
        editProduct
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useProduct = () => {
    return useContext(DataContext);
};
