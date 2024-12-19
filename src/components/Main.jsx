import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/product.api";

function Main() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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
            <button
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/account");
                }}
            >
                Account
            </button>

            {products.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((el, index) => {
                            return (
                                <tr key={`ind_${index}`}>
                                    <td>{el.title}</td>
                                    <td>{el.price}</td>
                                    <td>{el.quantity}</td>
                                    <td>{el.rating}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default Main;
