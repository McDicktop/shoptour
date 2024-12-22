import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("basket")) ?? [];
        } catch (err) {
            return []
        }
    });


    useEffect(() => {
        console.log(basket)
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);


    const updateBasket = (id, delta) => {
        setBasket((basket) => {
            const item = basket.find((el) => el._id === id);
            if(item) {
                item.amount = Math.min(10, Math.max(1, item.amount + delta));
                return [...basket];
            }
            return delta > 0 ? [...basket, {_id: id, amount: 1}] : basket;
        })
    }

    const basketValue = {
        basket,
        addBasketProduct: (id) => updateBasket(id, 1),
        removeBasketProduct: (id) => setBasket((basket) => basket.filter(el => el._id !== id)),
        increaseProductAmount: (id) => updateBasket(id, 1),
        decreaseProductAmount: (id) => updateBasket(id, -1),
        clearBasket: () => setBasket([]),
        basketIncludes: (id) => basket.some(el => el._id === id)
    };

    return (
        <BasketContext.Provider value={basketValue}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => {
    return useContext(BasketContext);
};

BasketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
