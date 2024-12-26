import { useState } from "react";

import CustomPopup from "./layout/Popup";

import AddForm from "./layout/Forms/addForm";
import EditForm from "./layout/Forms/editForm";
import Table from "./layout/Table";
import FieldsSelectForm from "./layout/Forms/fieldsSelectForm";

import { useProduct } from "../context/dataContext";
import { useFilter } from "../context/filterContext";

import AddIcon from "./assets/icons/add.icon";
import ViewIcon from "./assets/icons/view.icon";

function AdminPanel() {
    const amount = 10;

    const { categories } = useProduct();
    const { filter, setCategory, setSort, setSearch } = useFilter();

    const [addVisibility, setAddVisibility] = useState(false);
    const [editVisibility, setEditVisibility] = useState(false);
    const [fieldsSelectVisiility, setFieldsSelectVisiility] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [productEdit, setProductEdit] = useState(null);

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
            <div className="flex flex-row gap-4 items-center justify-center">
                <button
                    onClick={() => setAddVisibility(!addVisibility)}
                    className="w-24 h-8 p-1 flex justify-center rounded-2xl bg-gray-300 font-semibold hover:bg-gray-400"
                >
                    <AddIcon />Add
                </button>

                <input
                    type="text"
                    value={filter.search}
                    placeholder="type to search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-48 h-8 pl-4 pr-4 border rounded-2xl font-normal"
                />

                <select
                    onChange={(e) => setSort(e.target.value)}
                    name="filter"
                    id="filter_id"
                    className="w-24 border rounded-2xl h-8 p-1 cursor-pointer"
                >
                    <option value="none">unsort</option>
                    <option value="price_up">price ⬆️</option>
                    <option value="price_down">price ⬇️</option>
                </select>

                <select
                    onChange={(e) => setCategory(e.target.value === "all" ? null : e.target.value)}
                    name="cat"
                    id="cat_id"
                    className="w-24 border rounded-2xl h-8 p-1 cursor-pointer"
                >
                    {categories &&
                        categories.map((category, ind) => {
                            return (
                                <option key={`cat_${ind}`} value={category}>
                                    {category}
                                </option>
                            );
                        })}
                </select>

                <button
                    className="w-24 h-8 p-1 flex justify-center rounded-2xl bg-gray-300 font-semibold hover:bg-gray-400"
                    onClick={() => setFieldsSelectVisiility(!fieldsSelectVisiility)}
                >
                    <ViewIcon />View
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
                    <AddForm closeForm={popupCloseHandler} />
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
                title="Select categories to view in the table"
            >
                <FieldsSelectForm closeForm={popupCloseHandler} />
            </CustomPopup>
        </>
    );
}

export default AdminPanel;