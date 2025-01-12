import { toast } from "react-toastify";
import { useBasket } from "../context/basketContext";
import { useProduct } from "../context/dataContext";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import UserOrderAdress from "./common/UserOrderAdress";
import OrderDeliveryType from "./common/OrderDeliveryType";
import Promo from "./common/Promo";
import { addOrder } from "../api/order.api";
// import ShareIcon from "./assets/icons/share.icon";

import { useEffect, useState, useRef } from "react";

import LoaderComponent from "./layout/LoaderComponent";

function Basket() {
    const navigate = useNavigate();

    const {
        basket,
        increaseProductAmount,
        decreaseProductAmount,
        // removeBasketProduct,
        clearBasket,
        getStatusById,
        updateStatusById,
        updateAllStatusesByTarget,
        deleteSelectedProducts,
        getAmountById,
    } = useBasket();

    const { user } = useUser();

    const [loading, setLoading] = useState(true);

    const [hasPromo, setHasPromo] = useState(false);

    const { getProduct, data } = useProduct();

    const addressRef = useRef(null);
    const deliveryTypeRef = useRef(null);

    function getOrderItems() {
        const ordersArr = [];
        Array.from(
            document.querySelectorAll("input[name='item_active']:checked")
        )
            .map((el) => el.id)
            .forEach((id) => {
                const { _id, title, price, images } = getProduct(id);
                ordersArr.push({
                    _id,
                    title,
                    price,
                    amount: getAmountById(id),
                    image: images[0],
                });
            });
        return ordersArr;
    }

    const handleOrder = async () => {
        const { id: _id, name, email } = user;
        if (!_id || !name || !email) {
            toast("Log in to make order");
            return;
        }

        if (!deliveryTypeRef.current.getDeliveryType()) {
            toast("Select delivery type to make order");
            return;
        }

        const { city, street, house, app } = addressRef.current.getAddress();
        if (!city || !street || !house || !app) {
            toast("Select delivery adress to make order");
            return;
        }

        if (getOrderItems().length < 1) {
            toast("Select products to make order");
            return;
        }

        const orderObj = {
            user: { _id, name, email },
            address: { city, street, house, app },
            order: {
                items: getOrderItems(),
                total: +getTotalPriceWithDiscount()?.toFixed(2),
            },
            map: ["fghfgh", "dfgdfgd"],
            orderDate: Date.now(),
            // delivery: deliveryTypeRef.current.getDeliveryType(),
        };

        const newOrder = await addOrder(orderObj);

        if (!newOrder.message) {
            toast("Order placed!");
            console.log(newOrder.data);
            return;
        }
        if (!newOrder.response.data.message) {
            toast("Internal server error");
            return;
        }
        toast(newOrder.response.data.message);
    };

    const getDiscountedPrice = (sale, price) => {
        return sale.status ? price - price * sale.value : price;
    };

    const getTotalPriceWithDiscount = () => {
        const price = basket.reduce((acc, item) => {
            if (getStatusById(item._id)) {
                const { price, sale } = getProduct(item._id);
                acc += +getDiscountedPrice(sale, price) * item.amount;
            }
            return acc;
        }, 0);

        return !hasPromo ? price : price - price * 0.1;
    };

    const getTotalPriceWithoutDiscount = () => {
        return basket.reduce((acc, item) => {
            if (getStatusById(item._id)) {
                const { price } = getProduct(item._id);
                acc += price * item.amount;
            }
            return acc;
        }, 0);
    };

    const Prices = (product, basket) => {
        const { price, sale } = product;
        const { amount } = basket;
        const actualPrice = getDiscountedPrice(sale, price);

        return (
            <>
                {amount > 1 ? (
                    <div className="flex flex-col item-center justify-center h-10 w-28 ml-3">
                        <span className="font-semibold text-lg">{`${(
                            actualPrice * amount
                        ).toFixed(2)}$`}</span>
                        <span>
                            <span className="text-lg mr-1">{`${actualPrice}$`}</span>
                            {sale.status && (
                                <span className="relative">
                                    <span className="font-semibold absolute">
                                        |
                                    </span>
                                    <span className="line-through decoration-red-400 text-sm text-gray-400 ml-2">{`${price}$`}</span>
                                </span>
                            )}
                        </span>
                    </div>
                ) : (
                    <div className="flex item-center justify-start h-10 w-24 ml-3 pt-1 font-semibold">
                        <span className="text-lg mr-1">{`${actualPrice}$`}</span>
                        {sale.status && (
                            <span className="relative">
                                <span className="font-bold absolute">|</span>
                                <span className="line-through decoration-red-400 text-lg text-gray-400 ml-2">{`${price}$`}</span>
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
        }, 1000);
    }, [data]);

    if (loading) {
        return <LoaderComponent />;
    }

    return (
        <>
            {basket.length ? (
                <div className="flex place-self-center gap-4">
                    <div className="border rounded-xl shadow-md w-fit p-4">
                        <ul className="flex item-center">
                            <li
                                className="border border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                            <li
                                className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                        </ul>

                        <ul className="flex item-center">
                            <li
                                className="border border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                            <li
                                className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                            <li
                                className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                            <li
                                className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                        </ul>

                        <ul className="flex item-center">
                            <li
                                className="border border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                            <li
                                className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>
                            <li
                                className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("http://localhost:8080/cache/images/1734976138494milk_c.jpg")',
                                }}
                            ></li>

                            <li className="border -ml-3 border-black rounded-full w-[40px] h-[40px] bg-cover bg-white text-center">
                                +2
                            </li>
                        </ul>

                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                name="items_active"
                                id="item_active_all"
                                onChange={(e) =>
                                    updateAllStatusesByTarget(e.target.checked)
                                }
                                checked={basket.every((el) => el.status)}
                                className="mx-2 h-5 w-5"
                            />
                            <p className="font-semibold w-24">
                                {`${
                                    !basket.every((el) => el.status)
                                        ? "Select all"
                                        : "Deselect all"
                                }`}
                            </p>

                            <button
                                className="w-28 text-sm font-semibold text-red-500 hover:text-red-600"
                                onClick={() => deleteSelectedProducts()}
                            >
                                Delete selected
                            </button>

                            <button
                                onClick={() => clearBasket()}
                                className="mx-4 px-2 py-1 bg-red-400 text-white font-bold rounded-full hover:bg-red-500"
                            >
                                Clear basket
                            </button>
                        </div>

                        {basket.map((el, index) => {
                            const product = getProduct(el._id);

                            return (
                                <div
                                    key={`basket_item_${index}`}
                                    className={`${
                                        !getStatusById(product._id)
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
                                        {el.amount}
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
                                    {/* <button
                                        onClick={() =>
                                            removeBasketProduct(product._id)
                                        }
                                        className="text-xl h-6 w-6 flex items-center justify-center pb-1 ml-3 bg-red-500 text-white rounded-2xl hover:bg-red-600"
                                    >
                                        x
                                    </button> */}

                                    {Prices(product, el)}
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-80 h-fit">
                        <OrderDeliveryType ref={deliveryTypeRef} />

                        <UserOrderAdress ref={addressRef} />

                        <Promo setPromo={setHasPromo} promo={hasPromo} />

                        <div className="border rounded-xl shadow-md p-4 mt-4">
                            <p className="font-semibold text-gray-400">{`Price without discount: ${getTotalPriceWithoutDiscount()}$`}</p>
                            <div className="font-semibold mt-4 text-lg">{`Order price: ${getTotalPriceWithDiscount()?.toFixed(
                                2
                            )}$`}</div>

                            <button
                                onClick={() => handleOrder()}
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
        </>
    );
}

export default Basket;

// {
//     user: {
//         _id: ,
//         email: ,
//         name: ,
//     },
//     address: {
//         city: ,
//         street: ,
//         house: ,
//         app: ,
//     },
//     map: [coordx, coordy],
//     delivery: type('string'),
//     order: {
//         total: price,
//         items: [
//             {
//                 _id: ,
//                 name: ,
//                 amount: ,
//                 total: per item...
//             }
//         ]
//     }

// }
