import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { MAX_ITEMS_DISPLAY } from "../../../constants";

const getBgStyle = (index, image, totalItems, maxItems) => {
    if (index < maxItems - 1) return { backgroundImage: `url("${image}")` };
    if (index === maxItems - 1 && totalItems > maxItems)
        return { backgroundColor: "white" };
    return { backgroundImage: `url("${image}")` };
};

const OrderPics = ({ items }) => {
    const visibleItems = items.slice(0, MAX_ITEMS_DISPLAY);

    return (
        <ul className="flex items-center">
            {visibleItems.map((item, index) => (
                <li
                    key={`items_order_${index}`}
                    className={`border border-gray-600 rounded-full w-10 h-10 bg-cover font-bold text-center leading-9 ${index !== 0 ? "-ml-3" : ""
                        }`}
                    style={getBgStyle(
                        index,
                        item.image,
                        items.length,
                        MAX_ITEMS_DISPLAY
                    )}
                >
                    {index === MAX_ITEMS_DISPLAY - 1 &&
                        items.length > MAX_ITEMS_DISPLAY
                        ? `+${items.length - MAX_ITEMS_DISPLAY + 1}`
                        : ""}
                </li>
            ))}
        </ul>
    );
};

function SingleOrder({ order }) {
    const { isPayed } = order;
    const { discountedPrice, fullPrice, items } = order.order;
    const { name, email } = order.user;
    const { city, street, house, app } = order.address;
    const [deliveryType, deliveryDate] = order.delivery;
    const navigate = useNavigate();

    return (
        <div className="w-[500px] rounded-2xl border-[1px] p-4 relative">
            <div className="absolute flex flex-col items-center right-3 top-20">
                <p className="font-semibold text-green-600 text-3xl">{`${discountedPrice}$`}</p>
                <p className="font-semibold text-red-600 text-2xl line-through mb-4">{`${fullPrice}$`}</p>
                {isPayed ? <div className="font-bold text-green-600">✔️payed</div> : <button
                    onClick={() => {
                        navigate(`/payment/${order._id}`);
                    }}
                    className="rounded-full border-[1px] px-2 py-1 w-20 bg-green-500 hover:bg-green-600 font-bold text-slate-200"
                >
                    Pay
                </button>}
            </div>

            <div className="flex justify-between mb-2 font-semibold">
                <Moment format="MMMM Do YYYY, HH:mm">{+deliveryDate}</Moment>
                <p className="max-w-[260px]">{`${name} | ${email}`}</p>
            </div>

            <div className="text-sm mb-2">
                <p className="font-semibold mb-1">{`deliver by ${deliveryType}`}</p>
                <p className="w-60">{`city: ${city}`}</p>
                <p className="w-60">{`street: ${street}`}</p>
                <p className="w-60">{`house: ${house}`}</p>
                <p className="w-60">{`appartment: ${app}`}</p>
            </div>

            <OrderPics items={items} />
        </div>
    );
}

export default SingleOrder;
