import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("basket")) ?? [];
        } catch (err) {
            return [];
        }
    });

    useEffect(() => {
        const isValidBasket = basket.every(
            (el) => el._id && typeof el.amount === "number"
        );
        if (isValidBasket) {
            localStorage.setItem("basket", JSON.stringify(basket));
        } else {
            console.error("Invalid basket data: ", basket);
        }
    }, [basket]);

    const updateBasket = (id, delta) => {
        setBasket((prev) => {
            const updatedBasket = prev.map((el) => {
                if (el._id === id) {
                    return {
                        ...el,
                        amount: Math.min(10, Math.max(1, el.amount + delta)),
                    };
                }

                return el;
            });

            if (!prev.some((el) => el._id === id) && delta > 0) {
                return [...updatedBasket, { _id: id, amount: 1, status: true }];
            }

            return updatedBasket;
        });
    };

    const updateStatusById = (e, id) => {
        setBasket((prev) =>
            prev.map((el) =>
                el._id === id ? { ...el, status: e.target.checked } : el
            )
        );
    };

    const deleteSelectedProducts = () => {
        Array.from(
            document.querySelectorAll("input[name='item_active']:checked")
        )
            .map((el) => el.id)
            .forEach((id) => {
                setBasket((prev) => prev.filter((el) => el._id !== id));
            });
    };

    const getAmountById = (id) => {
        return basket.find((el) => el._id === id)?.amount;
    }


    const basketValue = {
        basket,
        addBasketProduct: (id) => updateBasket(id, 1),
        removeBasketProduct: (id) =>
            setBasket((prev) => prev.filter((el) => el._id !== id)),
        increaseProductAmount: (id) => updateBasket(id, 1),
        decreaseProductAmount: (id) => updateBasket(id, -1),
        clearBasket: () => setBasket([]),
        basketIncludes: (id) => basket.some((el) => el._id === id),
        getStatusById: (id) => {
            const item = basket.find((el) => el._id === id);
            return item?.status ?? false;
        },
        updateStatusById,
        updateAllStatusesByTarget: (target) =>
            setBasket((prev) => prev.map((el) => ({ ...el, status: target }))),
        deleteSelectedProducts,
        getAmountById
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
