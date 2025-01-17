import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/order.api";

function Payment() {
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
      if (order._id) {
        setPrice((prev) => order.order.discountedPrice);
      }
    };
    getOrder();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCheckbox = (e, key) => {
    setCard((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInput = (e, key) => {
    switch (key) {
      case "number": {
        // console.log(e.target.value)
        // console.log(/^\d{1,16}$/.test(e.target.value))
        // if (/^\d{1,16}$/.test(e.target.value) || e.target.value === '') {
        //     setCard((prev) => ({ ...prev, [key]: e.target.value }))
        // }
        // if (/^\d{1,4}$/.test(e.target.value) || e.target.value === '' || e.target.value === ' ') {
        //     setCard((prev) => ({ ...prev, [key]: e.target.value }))
        // }
        console.log(e.nativeEvent.data);
        if (
          e.nativeEvent.data === "" ||
          /^[\d]$/.test(e.nativeEvent.data.trim())
        ) {
          console.log(e.nativeEvent.data);
        }
        return;
      }
      case "exp": {
      }
      case "cvc": {
      }
      case "email": {
      }
      default: {
      }
    }
  };

  return (
    <>
      {price ? (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col w-[460px] rounded-2xl shadow p-10 mx-auto mt-12"
        >
          <p className="font-bold mb-8 place-self-center">{`Pay for the order at the cost ${price}$`}</p>

          {/* <label htmlFor="card_name">Name:</label>
             <input
                 type='text'
                 className='rounded-xl px-2 py-1'
                 value={''}
                 onChange={() => { }}
                 placeholder='Name'
                 id='card_name'
             /> */}
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
                placeholder="MM/YY"
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
            className={`block mx-auto mt-4 py-1 w-64 rounded-full bg-sky-700 text-slate-200`}
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