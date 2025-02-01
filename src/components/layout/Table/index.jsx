import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useProduct } from "../../../context/dataContext";
import { useFilter } from "../../../context/filterContext";

import CustomPopup from "../Popup";
import Pagination from "../../common/Pagination";

import { AMOUNT_ON_PAGE } from "../../../constants";
import "./styles.css";

function Table({ handleEditOpen }) {
    const navigate = useNavigate();
    const columnArr = [
        "code",
        "title",
        "type",
        "description",
        "price",
        "rating",
        "quantity",
        "sale",
    ];

    const {
        page,
        totalPages,
        changePage,
        changeTotalPages,
        filter,
        setFieldsVisibility,
    } = useFilter();

    const [warningVisibility, setWarningVisibility] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const { data, deleteProduct } = useProduct();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const actualKeys = Object.keys(data[0]).filter((key) =>
            columnArr.includes(key)
        );

        console.log("Поле: ", actualKeys);
        console.log(setFieldsVisibility)

        if (actualKeys.length > 0) {
            setFieldsVisibility(
                actualKeys.map((name) => ({ name, isVisible: true }))
            );
        }
    }, [data]);

    const filterProductsArray = useMemo(() => {
        // console.log(data)

        let result = data.reduce((acc, current) => {
            for (const key of columnArr) {
                if (
                    String(current[key])
                        .toLowerCase()
                        .includes(filter.search.toLowerCase())
                ) {
                    acc.push(current);
                    return acc;
                }
            }
            return acc;
        }, []);

        if (filter.category !== null) {
            result = result.filter((el) => el.type === filter.category);
        }

        switch (filter.sort) {
            case "price_up": {
                result.sort((a, b) => a.price - b.price);
                break;
            }
            case "price_down": {
                result.sort((a, b) => b.price - a.price);
                break;
            }
            default:
        }

        return result;
    }, [data, filter.search, filter.category, filter.fields]);

    useEffect(() => {
        changePage(1);
        changeTotalPages(
            Math.ceil(filterProductsArray.length / AMOUNT_ON_PAGE)
        );
    }, [filterProductsArray.length]);

    const popupCloseHandler = () => {
        setWarningVisibility(false);
    };

    return (
        <>
            {filterProductsArray.length > 0 &&
            filter.fields &&
            filter.fields.some((el) => el.isVisible) ? (
                <table className="table">
                    <thead>
                        <tr>
                            {filter.fields
                                .filter((el) => el.isVisible)
                                .map((name, ind) => {
                                    return <th key={`${ind}`}>{name.name}</th>;
                                })}
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProductsArray
                            .slice(
                                AMOUNT_ON_PAGE * (page - 1),
                                AMOUNT_ON_PAGE * page
                            )
                            .map((product, index) => {
                                const { _id } = product;

                                return (
                                    <tr key={`ind_${index}`}>
                                        {Object.entries(
                                            filter.fields.reduce(
                                                (acc, item) => {
                                                    if (item.isVisible) {
                                                        acc[item.name] =
                                                            product[item.name];
                                                    }

                                                    return acc;
                                                },
                                                {}
                                            )
                                        ).map(([key, value]) => (
                                            <td key={`table_${key}`}>
                                                {key !== "sale"
                                                    ? value
                                                    : !value.status
                                                    ? "No sale"
                                                    : value.value}
                                            </td>
                                        ))}
                                        <td
                                            className="clickableSection"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/product/${_id}`);
                                            }}
                                        >
                                            🔎
                                        </td>
                                        <td
                                            className="clickableSection"
                                            onClick={() => {
                                                handleEditOpen(product);
                                            }}
                                        >
                                            ✏️
                                        </td>
                                        <td
                                            className="clickableSection"
                                            onClick={() => {
                                                setWarningVisibility(true);
                                                setIdToDelete(_id);
                                            }}
                                        >
                                            ❌
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : filter.fields && filter.fields.every((el) => !el.isVisible) ? (
                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    No selected fields...
                </h1>
            ) : (
                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    {console.log(filterProductsArray)}
                    No products found...
                </h1>
            )}

            <Pagination amountPerPage={totalPages} />

            <CustomPopup
                onClose={popupCloseHandler}
                show={warningVisibility}
                title="Delete product?"
            >
                <button
                    className="rounded-full w-24 py-1 mr-4 cursor-pointer font-bold text-slate-200 bg-red-500 hover:bg-red-600"
                    onClick={async () => {
                        const { message } = await deleteProduct(idToDelete);
                        setIdToDelete(null);
                        setWarningVisibility(false);
                        toast(message);
                    }}
                >
                    Ok
                </button>
                <button
                    className="rounded-full w-24 py-1 cursor-pointer font-bold text-slate-200 bg-sky-700 hover:bg-sky-800"
                    onClick={() => setWarningVisibility(false)}
                >
                    Cancel
                </button>
            </CustomPopup>
        </>
    );
}

export default Table;
