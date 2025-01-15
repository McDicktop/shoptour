import { useProduct } from "../../../context/dataContext";

function Prices({ order }) {

    const getDiscountedPrice = (sale, price) => {
        return sale.status ? price - price * sale.value : price;
    };

    const { getProduct } = useProduct();
    const product = getProduct(order._id);
    const { price, sale } = product;
    const actualPrice = getDiscountedPrice(sale, price);

    return (
        <>
            {order.amount > 1 ? (
                <div className="flex flex-col item-center justify-center h-10 w-28 ml-3">
                    <span className="font-semibold text-lg">{`${(
                        actualPrice * order.amount
                    ).toFixed(2)}$`}</span>
                    <span>
                        <span className="text-lg mr-1">{`${actualPrice}$`}</span>
                        {sale.status && (
                            <span className="relative">
                                <span className="font-semibold absolute">
                                    |
                                </span>
                                <span className="line-through decoration-red-400 text-sm text-gray-400 ml-2">{`${price}$`}</span>
                            </span>
                        )}
                    </span>
                </div>
            ) : (
                <div className="flex item-center justify-start h-10 w-24 ml-3 pt-1 font-semibold">
                    <span className="text-lg mr-1">{`${actualPrice}$`}</span>
                    {sale.status && (
                        <span className="relative">
                            <span className="font-bold absolute">|</span>
                            <span className="line-through decoration-red-400 text-lg text-gray-400 ml-2">{`${price}$`}</span>
                        </span>
                    )}
                </div>
            )}
        </>
    )
}

export default Prices;