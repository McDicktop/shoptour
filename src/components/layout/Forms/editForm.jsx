import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useProduct } from "../../../context/dataContext";
import Validation from "../../../utils/validateProduct";
import InputField from "../../common/InputField";
import "./styles.css";

function EditForm({ closeForm, productProp }) {
    const validation = new Validation();

    const { editProduct } = useProduct();

    const [product, setProduct] = useState(null);

    const handleInputChange = async (key, value) => {
        let parsedValue =
            key === 'code'
                ? String(value)
                : isNaN(+value) || value === ""
                    ? value
                    : +value;

        if (key !== "sale") {
            await setProduct((prev) => ({ ...prev, [key]: parsedValue }));
            return;
        }

        await setProduct((prev) => ({
            ...prev,
            sale: value === '0' || value === '' ? {
                status: false
            } : {
                status: !isNaN(+value) && +value > 0,
                value,
            },
        }));
    };

    useEffect(() => {
        const editLoadProduct = async (value) => {
            const availableKeys = new Set([
                "code",
                "title",
                "type",
                "description",
                "price",
                "rating",
                "quantity",
                "sale",
            ]);

            if (value) {
                const filteredProduct = Object.keys(value).reduce((acc, key) => {
                    if (availableKeys.has(key)) {

                        if (
                            key === "sale" &&
                            value[key] &&
                            typeof value[key] === "object"
                        ) {
                            const { _id, ...rest } = value[key];
                            acc[key] = rest;
                        } else {
                            acc[key] = value[key];
                        }
                    }

                    return acc;
                }, {});

                await setProduct(filteredProduct);
            }

        };

        editLoadProduct(productProp);
    }, [productProp]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            validation.totalValidation(
                String(product.code),
                String(product.price),
                String(product.quantity)
                // доделать валидацию на клиенте!!!!
            );
        } catch (e) {
            toast(e.message);
            return;
        }

        const res = await editProduct(product, productProp._id);

        toast(res.message);
        if (res.status === 200) {
            closeForm();
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                {product ? (
                    Object.entries(product).map(([key, val], index) => {
                        return (
                            <div key={`ind_${index}`}>
                                <InputField
                                    label={`${key[0].toLocaleUpperCase() +
                                        key.slice(1)
                                        }`}
                                    placeholder={`Edit product ${key}`}
                                    id={`${key}_sighup`}
                                    value={
                                        key !== "sale" ? val : val.value
                                    }
                                    onChange={(value) =>
                                        handleInputChange(key, value)
                                    }
                                />
                            </div>
                        );
                    })
                ) : (
                    <h1>Loading ...</h1>
                )}

                <button type="submit" className={`submit_btn`}>
                    Submit
                </button>
            </form>
        </>
    );
}

export default EditForm;