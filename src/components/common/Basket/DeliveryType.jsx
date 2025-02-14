import { useState, forwardRef, useImperativeHandle } from "react";

const DeliveryType = forwardRef((_, ref) => {

    const [deliveryDate, setDeliveryDate] = useState('');
    const handleDeliveryDate = (event) => {
        const deliveryType = event.target.id;
        const currentDate = new Date();
        switch (deliveryType) {
            case 'courier':
                currentDate.setDate(currentDate.getDate() + 1)
                break;
            case 'post':
                currentDate.setDate(currentDate.getDate() + 3)
                break;
            default:
                currentDate.setMonth(currentDate.getMonth() + 1)
                break;
        }
        const formattedDate = currentDate.toISOString().split('T')[0];
        setDeliveryDate(formattedDate);
    }

    useImperativeHandle(ref, () => ({
        getDeliveryType: () => {
            return document.querySelector("input[name='delivery_radio']:checked")?.id ?? '';
        },
    }))

    return (
        <div className="border shadow-md rounded-xl px-4 py-2">
            <p className="font-semibold">Select delivery</p>
            <div className="flex w-full gap-2 mt-2 mb-2">

                <div className="w-full h-[60px] border rounded-xl p-1 bg-gray-300">

                    <input
                        type="radio"
                        id="courier"
                        name="delivery_radio"
                        onChange={handleDeliveryDate}
                    />
                    <label htmlFor="courier" className="ml-2">Courier</label>

                </div>

                <div className="w-full h-[60px] border rounded-xl p-1 bg-gray-300">

                    <input
                        type="radio"
                        id="post"
                        name="delivery_radio"
                        onChange={handleDeliveryDate}
                    />
                    <label htmlFor="post" className="ml-2">Post office</label>

                </div>

            </div>

            {deliveryDate ? (<p>Delivery date: {deliveryDate}</p>) : <p>Unselected delivery type</p>}
        </div>
    );
})

DeliveryType.displayName = 'DeliveryType';
export default DeliveryType;