import React from "react";

function SingleOrder({ order }) {
    
    function getBgStyle(ind, img) {
        return ind < 4
            ? { backgroundImage: `url("${img}")` }
            : order.order.items.length < 5
            ? { backgroundImage: `url("${img}")` }
            : { backgroundColor: "white" };
    }

    return (
        <div>
            <p className="border-[1px]">{order.user.name}</p>
            <p>{order.user.email}</p>

            <p>{order.address.city}</p>
            <p>{order.address.street}</p>
            <p>{order.address.house}</p>
            <p>{order.address.app}</p>

            <p>{order.orderDate}</p>

            <p>{order.order.total}</p>

            <ul className="flex item-center">
                {order.order.items.map((el, ind) => (
                    <div key={`ind_${ind}`}>
                        {ind < 5 && (
                            <li
                                className={`${
                                    ind !== 0 ? "-ml-3" : ""
                                }  border border-black rounded-full w-[40px] h-[40px] bg-cover font-bold text-center pt-[6px]`}
                                style={getBgStyle(ind, el.image)}
                            >
                                {ind === 4
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
