import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../api/order.api";
import { useState, useEffect } from "react";
import { Orders } from "./common/Orders";

function Account() {
    const navigate = useNavigate();
    const { user, isAdmin } = useUser();
    const { id } = user;

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrdersAsync() {
            const ordersList = await getUserOrders(id);
            setOrders(ordersList);
        }

        getOrdersAsync();
    }, []);

    return (
        <div className="flex">
            <div className="p-8">
                <h1 className="font-bold text-2xl">Account details</h1>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Id: {user.id}</p>
                <p>Roles: {user.roles.join(", ")}</p>
                {isAdmin && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/admin");
                        }}
                        className="w-32 mt-4 border-[1px] rounded-full px-3 py-1 text-slate-200 hover:bg-sky-950 bg-gray-500"
                    >
                        Admin panel
                    </button>
                )}
            </div>

            <div className="border-[1px]">
                {orders.length ? (
                    <Orders.List>
                        {orders.map((el, ind) => (

                            <Orders.Item
                                key={`ind_${ind}`}
                                // date={el.orderDate}
                                // name={el.user.name}
                                // email={el.user.email}
                                // address={el.address}
                                // price={el.order.}
                                order={el}
                                
                                />
                        ))}
                        
                   
                    </Orders.List>
                ) : (
                    <>No orders</>
                )}
            </div>
        </div>
    );
}

export default Account;
