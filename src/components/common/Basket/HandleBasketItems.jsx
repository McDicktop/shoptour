import { useBasket } from "../../../context/basketContext";

function HandleBasketItems() {
    const { basket, updateAllStatusesByTarget, deleteSelectedProducts, clearBasket } = useBasket();
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                name="items_active"
                id="item_active_all"
                onChange={(e) =>
                    updateAllStatusesByTarget(e.target.checked)
                }
                checked={basket.every((el) => el.status)}
                className="mx-2 h-5 w-5"
            />
            <p className="font-semibold w-24">
                {`${!basket.every((el) => el.status)
                    ? "Select all"
                    : "Deselect all"
                    }`}
            </p>

            <button
                className="w-28 text-sm font-semibold text-red-500 hover:text-red-600"
                onClick={() => deleteSelectedProducts()}
            >
                Delete selected
            </button>

            <button
                onClick={() => clearBasket()}
                className="mx-4 px-2 py-1 bg-red-400 text-white font-bold rounded-full hover:bg-red-500"
            >
                Clear basket
            </button>
        </div>
    )
}

export default HandleBasketItems;