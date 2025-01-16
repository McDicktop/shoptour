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
                className="w-20 h-10 mt-5 ml-5 p-1 rounded-full text-slate-200 font-bold bg-green-500 hover:bg-green-600"
                onClick={() => navigate(-1)}
            >
                <div className="flex">
                    <BackIcon color={'white'} />
                    Back
                </div>
            </button>

            {product && (
                <div className="w-[840px] h-fit mx-auto flex gap-5 justify-center items-start p-5 shadow rounded-2xl">
                    {/* Image */}
                    <div
                        className="w-96 h-96 shadow rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.images[0]})` }}
                    />

                    {/* Content */}
                    <div className="flex w-96 flex-col gap-2 shadow rounded-2xl p-5">
                        <h1 className="text-2xl font-semibold">{product.title}</h1>
                        <h2 className="text-2xl font-bold">
                            {"$" + product.price}
                        </h2>
                        <article className="text-l font-semibold text-justify">
                            {product.description}
                        </article>

                        <button
                            className="w-24 h-10 p-1 rounded-full bg-green-500 font-bold text-slate-200 hover:bg-green-600"
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
