import React from 'react'
import { useBasket } from '../../../context/basketContext';
import { useProduct } from '../../../context/dataContext';
import { useNavigate } from 'react-router-dom';


function BasketItem({ basketItem, children }) {
    const navigate = useNavigate();
    const { getStatusById, updateStatusById, increaseProductAmount, decreaseProductAmount } = useBasket();
    const { getProduct } = useProduct();
    const product = getProduct(basketItem._id);

    return (
        <div
            className={`${!getStatusById(product._id)
                ? "opacity-50"
                : ""
                } flex items-center justify-betweeen border rounded-xl shadow-md w-[610px] py-1 mb-4`}
        >
            <input
                type="checkbox"
                name="item_active"
                id={`${product._id}`}
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
                className="text-xl h-6 w-6 flex items-center justify-center pb-1 text-white rounded-2xl bg-green-500 hover:bg-green-600"
            >
                -
            </button>
            <span className="text-lg font-medium w-10 mx-2 rounded-xl border-[2px] text-center">
                {basketItem.amount}
            </span>
            <button
                onClick={() =>
                    increaseProductAmount(product._id)
                }
                disabled={!getStatusById(product._id)}
                className="text-xl h-6 w-6 flex items-center justify-center pb-1 text-white rounded-xl bg-green-500 hover:bg-green-600"
            >
                +
            </button>

            {children}

        </div>
    )
}

export default BasketItem;