import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/product.api";
import { useBasket } from "../context/basketContext";
import Pagination from "./common/Pagination";

function Main() {
    const totalPages = 6;
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { basketIncludes, addBasketProduct, removeBasketProduct } = useBasket();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            if (data) {
                setProducts(data);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {products.length > 0 && (
                <div className="grid grid-cols-3 gap-10 min-w-[960px] justify-self-center">
                    {products.map((el, ind) => (
                        <div key={`ind_${ind}`} className="border-[1px] border-black rounded-xl w-72 h-96 flex flex-col">

                            <div
                                className="w-64 h-64 mt-4 border-[1px] border-gray-400 rounded-xl bg-cover bg-center mx-auto cursor-pointer"
                                style={{
                                    backgroundImage: `url(${el.images[0]})`,
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/product/${el._id}`);
                                }}
                            />

                            <h1 className="mx-4 font-semibold text-md">{el.title}</h1>
                            <h1 className="mx-4 font-bold text-2xl">{`${el.price}$`}</h1>
                            <button
                                className="border-[1px] rounded-2xl w-64 mx-auto block mt-1 py-1 cursor-pointer bg-green-500 font-bold text-slate-200 hover:bg-green-600"
                                onClick={() => {
                                    if (!basketIncludes(el._id)) {
                                        addBasketProduct(el._id);
                                        return;
                                    }
                                    removeBasketProduct(el._id)
                                }}
                            >{basketIncludes(el._id) ? 'Remove from basket' : 'Add to basket'}</button>
                        </div>
                    ))}
                </div>
            )}
            <Pagination amountPerPage={totalPages} />
        </>
    );
}

export default Main;