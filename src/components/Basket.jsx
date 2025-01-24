import { useEffect, useState, useRef } from "react";
import { useBasket } from "../context/basketContext";
import { useProduct } from "../context/dataContext";
import { Basket } from "./common/Basket";
import LoaderComponent from "./layout/LoaderComponent";
import { ALL_PROMOS } from "../constants";

function BasketPage() {
    const { basket } = useBasket();
    const { data } = useProduct();

    const addressRef = useRef(null);
    const deliveryTypeRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [promo, setPromo] = useState(0);

    const handlePromo = (value) => {
        const promoIndex = ALL_PROMOS.map((el) => el.value).findIndex(
            (item) => item === value
        );
        if (promoIndex > -1) {
            setPromo((prev) => ALL_PROMOS[promoIndex].scale);
            return;
        }
        setPromo((prev) => 0);
    };

    function getDeliveryType() {
        return deliveryTypeRef.current.getDeliveryType();
    }

    function getAddress() {
        return addressRef.current.getAddress();
    }

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
                <div className="flex place-self-center gap-4 mt-6 max-h-[calc(100vh-100px)] overflow-hidden border rounded-xl shadow-md p-1">
                    <div className="p-4 overflow-y-auto ">
                        <Basket.HandleBasketItems />
                        {basket.map((el, index) => (
                            <Basket.BasketItem
                                key={`basket_element_${index}`}
                                value={el}
                            />
                        ))}
                    </div>

                    <div className="w-80">
                        <Basket.DeliveryType ref={deliveryTypeRef} />
                        <Basket.DeliveryAddress ref={addressRef} />
                        <Basket.Promo
                            promoValue={promo}
                            handlePromo={handlePromo}
                        />
                        <Basket.OrderComponent
                            promoValue={promo}
                            delivery={getDeliveryType}
                            address={getAddress}
                        />
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">Basket is empty</div>
            )}
        </>
    );
}

export default BasketPage;

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
