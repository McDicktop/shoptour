import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useProduct } from "../../../context/dataContext";
import Validation from "../../../utils/validateProduct";
import InputField from "../../common/InputField";
import LoaderComponent from "../LoaderComponent";

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
        <form className="px-10 py-8 flex flex-col justify-self-center place-items-center  border-[1px] rounded-3xl bg-white" onSubmit={handleSubmit}>
            {product ? (
                Object.entries(product).map(([key, val], index) => {
                    return (
                        <div key={`ind_${index}`}>
                            <InputField
                                label={`${key[0].toLocaleUpperCase() +
                                    key.slice(1)
                                    }`}
                                className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
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
                <LoaderComponent />
            )}

            <button
                type="submit"
                className="block mx-auto mt-4 py-1 w-64 rounded-full bg-sky-700 text-slate-200 font-bold hover:bg-sky-800"
            >Submit</button>
        </form>
    );
}

export default EditForm;