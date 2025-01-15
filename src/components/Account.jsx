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
        <div className="flex max-h-[calc(100vh-120px)] overflow-hidden border rounded-xl shadow-md p-1 w-[800px] mx-auto mt-6">
            <div className="p-8">
                <h1 className="font-bold text-2xl">Account details</h1>
                <p className="font-semibold">name: {user.name}</p>
                <p className="font-semibold">e-mail: {user.email}</p>
                {/* <p>id: {user.id}</p> */}
                {/* <p>Roles: {user.roles.join(", ")}</p> */}
                {isAdmin && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/admin");
                        }}
                        className="w-32 mt-4 border-[1px] rounded-full px-3 py-1 font-semibold text-slate-200 hover:bg-green-600 bg-green-500"
                    >
                        Admin panel
                    </button>
                )}
            </div>

            <div className="overflow-scroll max-h-[calc(100vh-110px)] p-8 overflow-x-hidden overflow-y-auto">
                <div className="flex justify-between mb-4 font-semibold w-[500px] rounded-2xl border-[1px] px-4 py-2">
                    <p>{`Number of orders: ${orders.length}`}</p>
                    <p>{`Total price: ${orders.reduce((acc, current) => acc + current.order.discountedPrice, 0).toFixed(2)}`}</p>
                </div>
                {orders.length ? (
                    <Orders.List>
                        {orders.map((el, ind) => (

                            <Orders.Item
                                key={`ind_${ind}`}
                                order={el}
                            />
                        ))}
                    </Orders.List>
                ) : (
                    <>There is no any order yet</>
                )}
            </div>
        </div>
    );
}

export default Account;
