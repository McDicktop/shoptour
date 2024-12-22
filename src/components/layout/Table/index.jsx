import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/dataContext";
import { toast } from "react-toastify";
import CustomPopup from "../Popup";
import Pagination from "../../common/Pagination";
import { useFilter } from "../../../context/filterContext";
import "./styles.css";

function Table({ handleEditOpen, searchQuery, filterType, filterCat, amount }) {
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

    const popupCloseHandler = () => {
        setWarningVisibility(false);
    };

    const [warningVisibility, setWarningVisibility] = useState(false);

    const [idToDelete, setIdToDelete] = useState(null);

    const { data, deleteProduct } = useProduct();

    useEffect(() => {
        const actualKeys = Object.keys(data[0]).filter((key) =>
            columnArr.includes(key)
        );
        setFieldsVisibility(
            actualKeys.map((name) => ({ name, isVisible: true }))
        );
        changePage(1); //  ПОСЛЕ ИЗМЕНЕНИЯ КАТЕГОРИИ ИЛИ ВВОДА В ПОИСКОВОЙ СТРОКЕ ПЕРЕХОД НА 1 СТР.
    }, [filter.search, filter.category]);

    function filterProductsArray(search) {
        const filtered = data.reduce((acc, current) => {
            for (const key of columnArr) {
                if (
                    String(current[key])
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    acc.push(current);
                    return acc;
                }
            }
            return acc;
        }, []);

        const result =
            filterCat === null
                ? filtered
                : filtered.filter((el) => el.type === filterCat);

        changeTotalPages(Math.ceil(result.length / amount));

        switch (filterType) {
            case "price_up": {
                return result.sort((a, b) => a.price - b.price);
            }
            case "price_down": {
                return result.sort((a, b) => b.price - a.price);
            }
            default: {
                return result;
            }
        }
    }

    return (
        <>
            {filterProductsArray(searchQuery).length > 0 && filter.fields && filter.fields.some((el) => el.isVisible) ? (
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
                        {filterProductsArray(searchQuery)
                            .slice(amount * (page - 1), amount * page)
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
                    className="popup_btns"
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
                    className="popup_btns"
                    onClick={() => setWarningVisibility(false)}
                >
                    Cancel
                </button>
            </CustomPopup>
        </>
    );
}

export default Table;

// Пагинация таблицы (с параметром amountPerPage)
// Возможность скрытия колонок через чекбокс
