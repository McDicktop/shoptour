import { useState, useCallback } from "react";
import CustomPopup from "./layout/Popup";
import AddForm from "./layout/Product/addForm";
import EditForm from "./layout/Product/editForm";
import Table from "./layout/Table";
import AddIcon from "./assets/icons/add.icon";
import { useFilter } from "../context/filterContext";
import FieldsSelectForm from "./layout/Product/fieldsSelectForm";
import { useProduct } from "../context/dataContext";

function AdminPanel() {
    const amount = 10;

    const { categories } = useProduct();

    const { filter, setCategory, setSort, setSearch } = useFilter();

    const [addVisibility, setAddVisibility] = useState(false);
    const [editVisibility, setEditVisibility] = useState(false);
    const [fieldsSelectVisiility, setFieldsSelectVisiility] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [productEdit, setProductEdit] = useState(null);

    const handleChangeSort = useCallback(
        (e) => {
            setSort(e.target.value);
        },
        [setSort]
    );

    const handleChangeCategory = useCallback(
        (e) => {
            // if (e.target.value === 'all') setCategory(null)
            // setCategory(e.target.value)
            setCategory(e.target.value === 'all' ? null : e.target.value)
        },
        [setCategory]
    );

    const popupCloseHandler = () => {
        setAddVisibility(false);
        setEditVisibility(false);
        setFieldsSelectVisiility(false);

        setProductEdit(null);
        setIsSuccess(null);
    };

    const handleSubmitForm = (value) => {
        setIsSuccess(value);
    };

    const handleOpenEditForm = (element) => {
        setEditVisibility(true);
        setProductEdit(element);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <button
                    className="addBtn"
                    onClick={() => setAddVisibility(!addVisibility)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <AddIcon />
                    Add
                </button>

                <input
                    type="text"
                    value={filter.search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "200px",
                        height: "32px",
                        borderRadius: "12px",
                        border: "1px solid black",
                    }}
                />

                <select
                    onChange={(e) => {
                        handleChangeSort(e);
                    }}
                    name="filter"
                    id="filter_id"
                >
                    <option value="none">None</option>
                    <option value="price_up">Price UP</option>
                    <option value="price_down">Price DOWN</option>
                </select>


                <select
                    onChange={(e) => {
                        handleChangeCategory(e);
                    }}
                    name="cat"
                    id="cat_id"
                >

                    {categories && categories.map((category, ind) => {
                        return (
                            <option key={`cat_${ind}`} value={category}>{category}</option>
                        )
                    })}


                    {/* <option value="none">None</option>
                    <option value="price_up">Price UP</option>
                    <option value="price_down">Price DOWN</option> */}
                </select>

                <button
                    className="addBtn"
                    onClick={() => setFieldsSelectVisiility(!fieldsSelectVisiility)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    Select
                </button>
            </div>

            <Table
                handleEditOpen={handleOpenEditForm}
                searchQuery={filter.search}
                filterType={filter.sort}
                filterCat={filter.category}
                amount={amount}
            />

            <CustomPopup
                onClose={popupCloseHandler}
                show={addVisibility}
                title="Add product"
            >
                {isSuccess === null ? (
                    <AddForm
                        closeForm={popupCloseHandler}
                    />
                ) : (
                    <div>{isSuccess}</div>
                )}
            </CustomPopup>

            <CustomPopup
                onClose={popupCloseHandler}
                show={editVisibility}
                title="Edit product"
            >
                <EditForm
                    handleFormSubmit={handleSubmitForm}
                    closeForm={popupCloseHandler}
                    productProp={productEdit}
                />
            </CustomPopup>


            <CustomPopup
                onClose={popupCloseHandler}
                show={fieldsSelectVisiility}
                title="Select to view"
            >
                <FieldsSelectForm closeForm={popupCloseHandler} />
            </CustomPopup>
        </>
    );
}

export default AdminPanel;
