import { toast } from "react-toastify";
import { useProduct } from "../../../context/dataContext";
import { useBasket } from "../../../context/basketContext";
import { useUser } from "../../../context/userContext";
import { addOrder } from "../../../api/order.api";
import { useNavigate } from "react-router-dom";

function OrderComponent({ promoValue, delivery, address }) {

    const navigate = useNavigate();
    const { getProduct } = useProduct();
    const { basket, getStatusById, getAmountById, deleteSelectedProducts } = useBasket();
    const { user } = useUser();

    const getDiscountedPrice = (sale, price) => {
        return sale.status ? price - price * sale.value : price;
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

    const getTotalPriceWithDiscount = () => {
        const price = basket.reduce((acc, item) => {
            if (getStatusById(item._id)) {
                const { price, sale } = getProduct(item._id);
                acc += +getDiscountedPrice(sale, price) * item.amount;
            }
            return acc;
        }, 0);

        return !promoValue ? price : price * promoValue;
    };

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
        if (!delivery()) {
            toast("Select delivery type to make order");
            return;
        }
        const { city, street, house, app } = address();
        if (!city || !street || !house || !app) {
            toast("Select delivery adress to make order");
            return;
        }
        if (getOrderItems().length < 1) {
            toast("Select products to make order");
            return;
        }

        const currentDate = new Date();

        const orderObj = {
            user: { _id, name, email },
            address: { city, street, house, app },
            order: {
                items: getOrderItems(),
                discountedPrice: +getTotalPriceWithDiscount()?.toFixed(2),
                fullPrice: +getTotalPriceWithoutDiscount()?.toFixed(2),
            },
            map: ["fghfgh", "dfgdfgd"],
            delivery: [
                delivery(),
                delivery() === "courier"
                    ? currentDate.setDate(currentDate.getDate() + 1)
                    : currentDate.setDate(currentDate.getDate() + 3),
            ],
        };

        const newOrder = await addOrder(orderObj);

        if (!newOrder.message) {
            // console.log(newOrder.data._id)
            toast("Order placed!");
            deleteSelectedProducts();
            navigate(`/payment/${newOrder.data._id}`);
            // navigate(`/payment`);
            return;
        }
        if (!newOrder.response.data.message) {
            toast("Internal server error");
            return;
        }
        toast(newOrder.response.data.message);
    };

    return (
        <div className="border rounded-xl shadow-md px-4 py-2 mt-2">
            <p className="font-semibold text-gray-400">{`Price without discount: ${getTotalPriceWithoutDiscount()}$`}</p>
            <div className="font-semibold text-lg">{`Order price: ${+getTotalPriceWithDiscount().toFixed(
                2
            )}$`}</div>

            <button
                onClick={() => handleOrder()}
                className="mt-2 mb-2 w-full px-4 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600"
            >
                Order
            </button>
        </div>
    );
}

export default OrderComponent;
