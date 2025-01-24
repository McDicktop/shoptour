import { useState, useEffect } from "react";
import { useFilter } from "../context/filterContext";

import CustomPopup from "./layout/Popup";
import AddForm from "./layout/Forms/addForm";
import EditForm from "./layout/Forms/editForm";
import Table from "./layout/Table";
import FieldsSelectForm from "./layout/Forms/fieldsSelectForm";
import { Filters } from "./layout/Filters";

import AddIcon from "./assets/icons/add.icon";
import ViewIcon from "./assets/icons/view.icon";

function AdminPanel() {
    
    const { resetFilter } = useFilter()

    useEffect(() => {
        resetFilter();
    }, []);

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

    // const handleSubmitForm = (value) => {
    //     setIsSuccess(value);
    // };

    return (
        <>
            <div className="flex flex-row gap-4 items-center justify-center mt-6">
                <button
                    onClick={() => setAddVisibility(!addVisibility)}
                    className="w-24 h-8 p-1 flex justify-center rounded-2xl bg-gray-300 font-semibold hover:bg-gray-400"
                >
                    <AddIcon />Add
                </button>
                <button
                    className="w-24 h-8 p-1 flex justify-center rounded-2xl bg-gray-300 font-semibold hover:bg-gray-400"
                    onClick={() => setFieldsSelectVisiility(!fieldsSelectVisiility)}
                >
                    <ViewIcon />View
                </button>

                <Filters.Search />
                <Filters.Sort />
                <Filters.CategorySelect />

 
            </div>

            <Table
                handleEditOpen={(element) => {
                    setEditVisibility(true);
                    setProductEdit(element);
                }}
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
                    // handleFormSubmit={handleSubmitForm}
                    handleFormSubmit={(value) =>
                        setIsSuccess(value)
                    }
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