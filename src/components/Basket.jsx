import { useEffect, useState } from "react";
import { useBasket } from "../context/basketContext";
import { useProduct } from "../context/dataContext";

function Basket() {
    const {
        basket,
        increaseProductAmount,
        decreaseProductAmount,
        clearBasket,
    } = useBasket();

    const { getProduct } = useProduct();

    const [activeItems, setActiveItems] = useState([]);

    const getTotalPrice = () => {
        return basket.reduce((acc, item) => {
            acc += +getProduct(item._id).price * item.amount;
            return acc;
        }, 0);
    };

    useEffect(() => {
        const parseProducts = () => {
            console.log(basket.map(() => true));
            setActiveItems(basket.map(() => true));
        };

        parseProducts();
    }, [basket]);

    return (
        <div className="p-4 space-y-4">
            {basket.length ? (
                <>
                    {basket.map((el, index) => {
                        const product = getProduct(el._id);

                        return (
                            <div
                                key={`basket_item_${index}`}
                                className="flex items-center justify-betweeen border p-4 rounded-lg shadow-sm w-fit"
                            >
                                <input
                                    type="checkbox"
                                    name="item_active"
                                    id={`item_active_${index}`}
                                    onClick={() =>
                                        setActiveItems([
                                            ...activeItems.map((el, indexActive) => {
                                                return indexActive === index ? !el : el;
                                            }),
                                        ])
                                    }
                                    checked={activeItems[index]}
                                    className="ml-4"
                                />
                                <p className="text-lg font-semibold w-96 ml-2">
                                    {product.title}
                                </p>
                                <button
                                    onClick={() =>
                                        decreaseProductAmount(product._id)
                                    }
                                    className="text-xl h-6 w-6 flex items-center justify-center pb-1 bg-red-500 text-white rounded-2xl hover:bg-red-600"
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
                                    className="text-xl h-6 w-6 flex items-center justify-center pb-1 bg-green-500 text-white rounded-2xl hover:bg-green-600"
                                >
                                    +
                                </button>


                                <div className="flex flex-col item-center justify-center h-10 w-12 ml-3">
                                    <span
                                        className="font-semibold"
                                    >{`${product.price * el.amount}$`}</span>
                                    {el.amount > 1 && (
                                        <span
                                            className="text-xs"
                                        >{`${product.price}$`}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <button
                        onClick={() => clearBasket()}
                        className="mt-4 w-96 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                        Clear basket
                    </button>

                    <span>{getTotalPrice()?.toFixed(2)}</span>

                    <span>Active: {activeItems.filter(el => el === true).map((el, index) => index).join(', ')}</span>
                </>
            ) : (
                <div className="text-center text-gray-500">Basket is empty</div>
            )}
        </div>
    );
}

export default Basket;
