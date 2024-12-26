import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { useBasket } from "../context/basketContext";
import BackIcon from "../components/assets/icons/back.icon";

function ProductView() {
    const [product, setProduct] = useState(null);
    const { basketIncludes, addBasketProduct, removeBasketProduct } = useBasket();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            const product = await getProductById(id);
            setProduct(product);
        };
        getProduct();
    }, [id]);

    return (
        <>
            <button
                className="w-20 h-8 mt-5 ml-5 rounded-lg bg-stone-200 text-stone-600 font-bold hover:bg-stone-300"
                onClick={() => navigate(-1)}
            >
                <div className="flex">
                    <BackIcon />
                    Back
                </div>
            </button>

            {product && (
                <div className="w-full h-fit flex gap-5 justify-center items-start p-5">
                    {/* Image */}
                    <div
                        className="w-96 h-96 border-[1px] border-gray-800 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.images[0]})` }}
                    />

                    {/* Content */}
                    <div className="flex w-96 flex-col gap-2 border-[1px] border-gray-800 rounded-xl p-5">
                        <h1 className="text-3xl font-bold">{product.title}</h1>
                        <h2 className="text-2xl font-bold">
                            {"$" + product.price}
                        </h2>
                        <article className="text-l font-semibold text-justify">
                            {product.description}
                        </article>

                        <button
                            className="w-24 h-10 p-1 border-black border-[1px] rounded-2xl bg-gray-300 font-bold hover:bg-gray-400"
                            onClick={() => {
                                if (!basketIncludes(product._id)) {
                                    addBasketProduct(product._id);
                                    return;
                                }

                                removeBasketProduct(product._id)
                            }}
                        >
                            {basketIncludes(product._id) ? 'Remove' : 'Add'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductView;
