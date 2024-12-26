import { useEffect, useState } from "react";
import { useBasket } from "../context/basketContext";
import { useProduct } from "../context/dataContext";
import { useNavigate } from "react-router-dom";

function Basket() {
    const navigate = useNavigate();

    const {
        basket,
        increaseProductAmount,
        decreaseProductAmount,
        removeBasketProduct,
        clearBasket,
    } = useBasket();

    const { getProduct } = useProduct();

    const [activeItems, setActiveItems] = useState(
        basket.map((el) => ({ _id: el._id, status: true })) ?? []
    );

    useEffect(() => {
        const updateBasket = () => {
            const basketIds = basket.map((item) => item._id);
            setActiveItems((prev) => [
                ...prev.filter((el) => basketIds.includes(el._id)),
            ]);
        };
        updateBasket();
    }, [basket]);

    const getTotalPrice = () => {
        return basket.reduce((acc, item) => {
            if (getStatusById(item._id)) {
                acc += +getProduct(item._id).price * item.amount;
            }
            return acc;
        }, 0);
    };

    const getStatusById = (id) => {
        return activeItems.find((el) => el._id === id)?.status ?? false;
    };

    const updateStatusById = (id) => {
        setActiveItems((prev) =>
            prev.map((el) => {
                if (el._id !== id) return el;

                return {
                    ...el,
                    status: !el.status,
                };
            })
        );
    };

    const updateAllStatusesByTarget = (target) => {
        setActiveItems((prev) => prev.map((el) => ({ ...el, status: target })));
    };

    return (
        <div className="p-4 space-y-4">
            {basket.length ? (
                <div className="border rounded-2xl shadow-md w-fit p-4">
                    {basket.map((el, index) => {
                        const product = getProduct(el._id);

                        return (
                            <div
                                key={`basket_item_${index}`}
                                className="flex items-center justify-betweeen border rounded-lg shadow-md w-[560px] py-1 mb-4"
                            >
                                <input
                                    type="checkbox"
                                    name="item_active"
                                    id={`item_active_${index}`}
                                    onChange={() =>
                                        updateStatusById(product._id)
                                    }
                                    checked={getStatusById(product._id)}
                                    className="mx-2 h-5 w-5"
                                />

                                <div
                                    className="flex flex-row gap-2 items-center cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/product/${product._id}`);
                                    }}
                                >
                                    <div
                                        className="w-16 h-16 border-[1px] border-gray-400 rounded-xl bg-cover bg-center cursor-pointer"
                                        style={{
                                            backgroundImage: `url(${product.images[0]})`,
                                        }}
                                    />

                                    <p className="text-sm font-semibold truncate text-justify w-64 h-6 p-1 ">
                                        {product.title}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        decreaseProductAmount(product._id)
                                    }
                                    disabled={!getStatusById(product._id)}
                                    className={`text-xl h-6 w-6 flex items-center justify-center pb-1 text-white rounded-2xl ${
                                        !getStatusById(product._id)
                                            ? "bg-gray-300"
                                            : "bg-green-500 hover:bg-green-600"
                                    }`}
                                >
                                    -
                                </button>
                                <span className="txt-lg font-medium w-10 mx-2 rounded-xl border-[2px] text-center">
                                    {el.amount}
                                </span>
                                <button
                                    onClick={() =>
                                        increaseProductAmount(product._id)
                                    }
                                    disabled={!getStatusById(product._id)}
                                    className={`text-xl h-6 w-6 flex items-center justify-center pb-1 text-white rounded-2xl ${
                                        !getStatusById(product._id)
                                            ? "bg-gray-300"
                                            : "bg-green-500 hover:bg-green-600"
                                    }`}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() =>
                                        removeBasketProduct(product._id)
                                    }
                                    className="text-xl h-6 w-6 flex items-center justify-center pb-1 ml-3 bg-red-500 text-white rounded-2xl hover:bg-red-600"
                                >
                                    x
                                </button>

                                <div className="flex flex-col item-center justify-center h-10 w-12 ml-3">
                                    <span className="font-semibold">{`${
                                        product.price * el.amount
                                    }$`}</span>
                                    {el.amount > 1 && (
                                        <span className="text-xs">{`${product.price}$`}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center justify-betweeen w-[560px] py-1">
                        <input
                            type="checkbox"
                            name="item_active"
                            id="item_active_all"
                            onChange={(e) => {
                                updateAllStatusesByTarget(e.target.checked);
                            }}
                            // true -> false -> change(false) -> false
                            // true -> click(true) -> !true -> false
                            checked={activeItems.every((el) => el.status)}
                            className="mx-2 h-5 w-5"
                        />
                        <p className="text-lg font-semibold w-96 ml-2">
                            {"Select/deselect all"}
                        </p>

                        <span className="font-semibold">{`Total: ${getTotalPrice()?.toFixed(
                            2
                        )}$`}</span>
                    </div>

                    <button
                        onClick={() => clearBasket()}
                        className="mt-4 w-[560px] px-4 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600"
                    >
                        Clear basket
                    </button>

                    {/* <span>Active: {activeItems.filter(el => el === true).map((el, index) => index).join(', ')}</span> */}
                </div>
            ) : (
                <div className="text-center text-gray-500">Basket is empty</div>
            )}
        </div>
    );
}

export default Basket;
