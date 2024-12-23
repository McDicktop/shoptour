import { useState, useCallback } from "react";
import CustomPopup from "./layout/Popup";
import AddForm from "./layout/Forms/addForm";
import EditForm from "./layout/Forms/editForm";
import Table from "./layout/Table";
import AddIcon from "./assets/icons/add.icon";
import { useFilter } from "../context/filterContext";
import FieldsSelectForm from "./layout/Forms/fieldsSelectForm";
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
                    onClick={() => setAddVisibility(!addVisibility)}
                    className="w-24 h-10 p-1 border-black border-[1px] flex justify-center items-center rounded-2xl bg-gray-300 font-bold hover:bg-gray-400"
                >
                    <AddIcon />
                    Add
                </button>

                <input
                    type="text"
                    value={filter.search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-48 h-10 pl-4 pr-4 border-black border-[1px] rounded-2xl font-normal"
                />

                <select
                    onChange={(e) => {
                        handleChangeSort(e);
                    }}
                    name="filter"
                    id="filter_id"
                    className="w-28 border-[1px] border-black rounded-2xl h-10 p-2"
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
                    className="w-28 border-[1px] border-black rounded-2xl h-10 p-2"
                >
                    {categories && categories.map((category, ind) => {
                        return (
                            <option key={`cat_${ind}`} value={category}>{category}</option>
                        )
                    })}
                </select>

                <button
                    className="w-24 h-10 p-1 border-black border-[1px] flex justify-center items-center rounded-2xl bg-gray-300 font-bold hover:bg-gray-400"
                    onClick={() => setFieldsSelectVisiility(!fieldsSelectVisiility)}
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
                title="Select categories to view in the table"
            >
                <FieldsSelectForm closeForm={popupCloseHandler} />
            </CustomPopup>
        </>
    );
}

export default AdminPanel;
