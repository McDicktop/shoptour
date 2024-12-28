import { useBasket } from "../context/basketContext";
import { useProduct } from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import ShareIcon from "./assets/icons/share.icon";

import { useEffect, useState } from "react";

import LoaderComponent from "./layout/LoaderComponent";

function Basket() {
    const navigate = useNavigate();

    const {
        basket,
        increaseProductAmount,
        decreaseProductAmount,
        removeBasketProduct,
        clearBasket,
        getStatusById,
        updateStatusById,
        updateAllStatusesByTarget,
    } = useBasket();

    const [loading, setLoading] = useState(true);

    const { getProduct, data } = useProduct();

    const getProductPrice = (sale, price) => {
        return sale.status ? price - price * sale.value : price;
    };

    const getTotalPrice = () => {
        return basket.reduce((acc, item) => {
            if (getStatusById(item._id)) {
                const { price, sale } = getProduct(item._id);
                acc += +getProductPrice(sale, price) * item.amount;
            }
            return acc;
        }, 0);
    };

    const prices = (product, basket) => {
        const { price, sale } = product;
        const { amount } = basket;
        const actualPrice = getProductPrice(sale, price);

        return (
            <>
                {amount > 1 ? (
                    <div className="flex flex-col item-center justify-center h-10 w-12 ml-3">
                        <span className="font-semibold text-lg">{`${(
                            actualPrice * amount
                        ).toFixed(2)}$`}</span>
                        <span>
                            <span className="text-lg">{`${actualPrice}$`}</span>
                            {sale.status && (
                                <span>
                                    <span className="font-semibold">|</span>
                                    <span className="line-through decoration-red-400 text-sm text-gray-400">{`${price}$`}</span>
                                </span>
                            )}
                        </span>
                    </div>
                ) : (
                    <div className="flex  item-center justify-center h-10 w-12 ml-3">
                        <span className="text-lg">{`${actualPrice}$`}</span>
                        {sale.status && (
                            <span>
                                <span className="font-semibold">|</span>
                                <span className="line-through decoration-red-400 text-lg text-gray-400">{`${price}$`}</span>
                            </span>
                        )}
                    </div>
                )}
            </>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [data]);

    if (loading) {
        return <LoaderComponent />;
    }

    return (
        <div className="p-4 space-y-4">
            {basket.length ? (
                <div className="flex place-self-center">
                    <div className="border rounded-2xl shadow-md w-fit p-4">
                        <div className="flex justify-between mb-4">
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    name="item_active"
                                    id="item_active_all"
                                    onChange={(e) =>
                                        updateAllStatusesByTarget(
                                            e.target.checked
                                        )
                                    }
                                    checked={basket.every((el) => el.status)}
                                    className="mx-2 h-5 w-5"
                                />
                                <p className="text-md font-semibold ml-2">
                                    {`${
                                        !basket.every((el) => el.status)
                                            ? "Select all"
                                            : "Deselect all"
                                    }`}
                                </p>
                            </div>

                            <div className="cursor-pointer">
                                <ShareIcon />
                            </div>
                        </div>

                        {basket.map((el, index) => {
                            const product = getProduct(el._id);

                            console.log(product);

                            return (
                                <div
                                    key={`basket_item_${index}`}
                                    className="flex items-center justify-betweeen border rounded-lg shadow-md w-[610px] py-1 mb-4"
                                >
                                    <input
                                        type="checkbox"
                                        name="item_active"
                                        id={`item_active_${index}`}
                                        onChange={(e) =>
                                            updateStatusById(e, product._id)
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

                                    {prices(product, el)}
                                </div>
                            );
                        })}

                        <button
                            onClick={() => clearBasket()}
                            className="mt-4 w-[610px] px-4 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600"
                        >
                            Clear basket
                        </button>
                    </div>

                    <div className="w-80 h-fit">
                        <div className="bg-white rounded-xl p-4">
                            <p className="mt-4">Select delivery</p>
                            <div className="flex w-full gap-2 mt-2">
                                <div className="w-full h-[80px] bg-gray-800 rounded-xl"></div>
                                <div className="w-full h-[80px] bg-gray-800 rounded-xl"></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 mt-4">
                            <div className="bg-gray-500 rounded-xl w-full h-44 flex justify-center items-center">Map</div>

                            <input
                                type="text"
                                placeholder="city"
                                className="w-full border border-black mt-4 placeholder-black"
                            />
                            <input
                                type="text"
                                placeholder="street"
                                className="w-full border border-black mt-2"
                            />
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="text"
                                    placeholder="house"
                                    className="w-full border border-black"
                                />
                                <input
                                    type="text"
                                    placeholder="apparment"
                                    className="w-full border border-black"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 mt-4">
                            <div className="font-semibold mt-4">{`Order price: ${getTotalPrice()?.toFixed(
                                2
                            )}$`}</div>

                            <p></p>

                            <button
                                onClick={() => clearBasket()}
                                className="mt-4 w-full px-4 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600"
                            >
                                Order
                            </button>
                        </div>

                        {/* Если ввести число 123 - то скидка 10%, иначе ошибка */}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">Basket is empty</div>
            )}
        </div>
    );
}

export default Basket;
