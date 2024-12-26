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
        <div className="min-h-screen">
            {products.length > 0 && (
                <div className="grid grid-cols-3 gap-10 min-w-[960px] justify-self-center mt-10">
                    {products.map((el, ind) => (
                        <div key={`ind_${ind}`} className="rounded-xl w-72 h-[420px] flex flex-col bg-white shadow-md">

                            <div
                                className="w-64 h-64 mt-4 border-[1px] border-gray-400 rounded-xl bg-cover bg-center mx-auto cursor-pointer hover:opacity-80"
                                style={{
                                    backgroundImage: `url(${el.images[0]})`,
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/product/${el._id}`);
                                }}
                            />

                            <h1 className="mx-4 mt-2 font-semibold text-md overflow-hidden h-12">{el.title}</h1>
                            <div className="mx-4 flex items-center">
                                {el.sale.status && <span className="font-bold text-2xl">{`${el.price - (el.price * el.sale.value)}$`}</span>}
                                <span className={`relative  ${el.sale.status ? 'mx-2 text-lg before:border-b-2 before:border-red-400 before:absolute before:w-full before:h-1/2 before:-rotate-12' : 'text-2xl font-bold'}`}>{`${el.price}$`}</span>
                            </div>


                            <button
                                className="border-[1px] rounded-full w-64 mx-auto block mt-1 py-1 cursor-pointer bg-green-500 font-bold text-slate-200 hover:bg-green-600"
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
        </div>
    );
}

export default Main;