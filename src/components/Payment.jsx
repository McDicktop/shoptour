import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/order.api";
import { makePaymentByOrderId } from "../api/order.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Payment() {
    const navigate = useNavigate();

    const { id } = useParams();

    const detailsInit = {
        number: "",
        exp: "",
        cvc: "",
        email: "",
        conf: false,
        save: false,
        send: false,
    };

    const [card, setCard] = useState({ ...detailsInit });
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            const order = await getOrderById(id);

            const { _id } = order;
            const { discountedPrice } = order.order;

            if (_id && discountedPrice) {
                setPrice((prev) => discountedPrice);
            }
        };
        getOrder();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { number, exp, cvc } = card;

        const res = await makePaymentByOrderId(id, { number, exp, cvc });

        if (res.status === 422) {
            // Не валидные платежные данные
            toast(res.response.data.message);
            return;
        }

        if (res.status === 400) {
            // Время заказа вышло (заказ был удален из бд)
            toast(res.response.data.message);
            navigate("/account");
            return;
        }

        if (res.message) {
            toast(res.message);
            navigate("/account");
            return;
        }
        toast("Internal server error");
    };

    const handleCheckbox = (e, key) => {
        setCard((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleInput = (e, key) => {
        setCard((prev) => {
          if ("1234567890 ".includes(e.nativeEvent.data) || e.nativeEvent.data === null)
            return {...prev, [key]: e.target.value}
          return {...prev}
        })
    };

    const isSubmitActive = () => {
        const { number, exp, cvc, conf } = card;
        return number && exp && cvc && conf;
    };

    return (
        <>
            {price ? (
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col w-[460px] rounded-2xl shadow p-10 mx-auto mt-12"
                >
                    <p className="font-bold mb-8 place-self-center">{`Pay for the order at the cost ${price}$`}</p>

                    <label htmlFor="card_number" className="font-semibold">
                        Card number:
                    </label>
                    <input
                        type="text"
                        className="rounded-xl px-2 py-1 mb-4"
                        value={`${card.number}`}
                        onChange={(e) => handleInput(e, "number")}
                        placeholder="XXXX XXXX XXXX XXXX"
                        id="card_number"
                    />

                    <div className="flex justify-between mb-10">
                        <div className="w-32">
                            <label htmlFor="card_exp" className="font-semibold">
                                Expiration Date:
                            </label>
                            <input
                                type="text"
                                className="rounded-xl px-2 py-1 w-32"
                                value={`${card.exp}`}
                                onChange={(e) => handleInput(e, "exp")}
                                placeholder="MM YY"
                                id="card_exp"
                            />
                        </div>

                        <div className="w-32">
                            <label htmlFor="card_cvc" className="font-semibold">
                                CVC:
                            </label>
                            <input
                                type="text"
                                className="rounded-xl px-2 py-1 w-32 placeholder:text-xs"
                                value={`${card.cvc}`}
                                onChange={(e) => handleInput(e, "cvc")}
                                placeholder="***"
                                id="card_cvc"
                            />
                        </div>
                    </div>

                    <div className="h-10 flex items-center">
                        <input
                            type="checkbox"
                            id="card_conf"
                            className="w-5 h-5 mr-3"
                            onChange={(e) => handleCheckbox(e, "conf")}
                        />
                        <label htmlFor="card_conf">
                            Do you confirm with the payment agreement?
                        </label>
                    </div>

                    <div className="h-10 flex items-center">
                        <input
                            type="checkbox"
                            id="card_save"
                            className="w-5 h-5 mr-3"
                            onChange={(e) => handleCheckbox(e, "save")}
                        />
                        <label htmlFor="card_save">Save payment details?</label>
                    </div>

                    <div className="h-10 flex items-center">
                        <input
                            type="checkbox"
                            id="card_send"
                            className="w-5 h-5 mr-3"
                            onChange={(e) => handleCheckbox(e, "send")}
                        />
                        <label htmlFor="card_send">Send a check by mail?</label>
                    </div>

                    <div className="h-9 w-64 place-self-center mt-2">
                        <input
                            type="text"
                            className={`px-2 py-1 rounded-xl w-64 ${
                                !card.send ? "hidden" : ""
                            }`}
                            value={`${card.email}`}
                            placeholder="e-mail"
                            onChange={() => {}}
                        />
                    </div>

                    <button
                        className={`block mx-auto mt-4 py-1 w-64 rounded-full bg-sky-700 text-slate-200 ${
                            !isSubmitActive() ? "opacity-50 cursor-default" : ""
                        }`}
                        disabled={!isSubmitActive()}
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <>Order not found</>
            )}
        </>
    );
}

export default Payment;
