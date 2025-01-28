import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./common/InputField";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { userLogin } from "../api/user.api";
import hide from "./assets/imgs/hide.png";
import show from "./assets/imgs/show.png";

import { useBasket } from "../context/basketContext";
import { addOrder } from "../api/order.api";

function SigninForm() {
    const navigate = useNavigate();

    const { handleLogin, user: userContObj } = useUser();

    const { deleteSelectedProducts, removeBasketProduct } = useBasket();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [isFormFilled, setIsFormFilled] = useState({
        username: false,
        password: false,
    });

    const [isPassShow, setIsPassShow] = useState(false);

    const isFilled = useCallback(() => {
        return Object.values(isFormFilled).every((field) => field);
    }, [isFormFilled]);

    const inputHandler = useCallback(
        (key, value) => {
            setUser((prev) => ({ ...prev, [key]: value }));
            setIsFormFilled((prev) => ({
                ...prev,
                [key]: value !== "" ? true : false,
            }));
        },
        [setUser, setIsFormFilled]
    );

    const submitHandler = useCallback(
        (e) => {
            e.preventDefault();

            async function postAuth() {
                const data = await userLogin({ ...user });
                if (data.token) {
                    toast("Авторизация прошла успешно");
                    await handleLogin(data.token);

                    // console.log(data.values)
                    const order = JSON.parse(localStorage.getItem('order_preview'))
                    if(order){
                        order.user = {
                            _id: data.values._id,
                            name: data.values.name,
                            email: data.values.email,
                        }

                        // console.log(order)

                        const newOrder = await addOrder(order);

                    
                        if (!newOrder.message) {

                            toast("Order placed!");

                            for(let item of order.order.items) {
                                removeBasketProduct(item._id)
                            }

                            localStorage.removeItem('order_preview')

                            window.location.href = `/payment/${newOrder.data._id}`;
                            
                            return;
                        }
                        if (!newOrder.response.data.message) {
                            toast("Internal server error");
                            return;
                        }
                        toast(newOrder.response.data.message);
                    }
                    
                    navigate("/");
                } else {
                    toast(data);
                }
            }
            postAuth();
        },
        [user, handleLogin, navigate]
    );

    function handleFormNavigateSignUp() {
        navigate("/signup");
    }

    return (
        <form className="px-10 mt-20 py-8 flex flex-col justify-self-center place-items-center  border-[1px] rounded-3xl bg-white">
            <InputField
                className={
                    "w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
                }
                label="Username"
                id={"username_signin"}
                value={user.username}
                onChange={(e) => inputHandler("username", e)}
            />

            <div className="relative">
                <InputField
                    className={
                        "w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
                    }
                    label="Password"
                    id={"password_signin"}
                    value={user.password}
                    onChange={(e) => inputHandler("password", e)}
                    type={isPassShow ? "text" : "password"}
                />
                <div
                    className="w-6 h-6 bg-cover bg-no-repeat absolute top-[30px] right-[12px] cursor-pointer"
                    style={{
                        backgroundImage: `url(${isPassShow ? show : hide})`,
                    }}
                    onClick={() => setIsPassShow((prev) => !prev)}
                ></div>
            </div>

            <button
                onClick={(e) => submitHandler(e)}
                type="submit"
                className={
                    `border-[1px] w-64 rounded-2xl px-3 py-1 mt-10 bg-sky-700 ${!isFilled() ? 'opacity-50 text-gray-400 cursor-default' : 'font-bold text-slate-200 hover:bg-sky-800'}`
                }
                disabled={!isFilled()}
            >
                Sign In
            </button>

            <button
                className={
                    "w-64 mt-4 border-[1px] rounded-2xl px-3 py-1 text-slate-200 bg-sky-700 hover:bg-sky-800"
                }
                onClick={handleFormNavigateSignUp}
            >
                No account yet?
            </button>
        </form>
    );
}

export default SigninForm;
