import Moment from "react-moment";
import 'moment-timezone';

function SingleOrder({ order }) {

    function getBgStyle(ind, img) {
        return ind < 4
            ? { backgroundImage: `url("${img}")` }
            : order.order.items.length > 5
                ? { backgroundColor: "white" }
                : { backgroundImage: `url("${img}")` }
    }

    return (
        <div className="w-[500px] rounded-2xl border-[1px] p-4 relative">

            <div className="absolute flex flex-col items-center right-3 top-32">
                <p className="font-semibold text-green-600 text-3xl">{`${order.order.discountedPrice}$`}</p>
                <p className="font-semibold text-red-600 text-2xl line-through">{`${order.order.fullPrice}$`}</p>
            </div>

            <div className="flex justify-between mb-2 font-semibold">
                <Moment format="MMMM Do YYYY, HH:mm">{+order.delivery[1]}</Moment>
                <p className="max-w-[260px]">{`${order.user.name} | ${order.user.email}`}</p>
            </div>

            <div className="text-sm mb-2">
                <p className="font-semibold mb-1">{`deliver by ${order.delivery[0]}`}</p>
                <p className="w-60">{`city: ${order.address.city}`}</p>
                <p className="w-60">{`street: ${order.address.street}`}</p>
                <p className="w-60">{`house: ${order.address.house}`}</p>
                <p className="w-60">{`appartment: ${order.address.app}`}</p>
            </div>

            <ul className="flex item-center">
                {order.order.items.map((el, ind) => (
                    <div key={`ind_${ind}`}>
                        {ind < 5 && (
                            <li
                                className={`${ind !== 0 ? "-ml-3" : ""
                                    }  border-[1px] border-gray-600 rounded-full w-[40px] h-[40px] bg-cover font-bold text-center pt-[6px]`}
                                style={getBgStyle(ind, el.image)}
                            >
                                {ind === 4 && order.order.items.length > 5
                                    ? `+${order.order.items.length - 4}`
                                    : ""}
                            </li>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default SingleOrder;
