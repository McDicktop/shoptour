import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function NavLayout({ children }) {
    const { handleLogout } = useUser();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-2 justify-start">
            {/* <nav className="flex flex-row justify-between h-20 w-full border-[1px] ">
                <nav
                    onClick={() => window.location.replace(`/`)}
                    className="cursor-pointer text-3xl font-bold"
                >
                    Home
                </nav>

                <div className="flex border-[1px] border-black">
                    <nav className="border-[1px] border-black">
                        <a href="/basket">Basket</a>
                    </nav>

                    <button onClick={handleLogout}>Log out</button>

                    <nav className="border-[1px] border-black">
                        <a href="">Sigh in</a>
                    </nav>
                </div>
            </nav> */}

            <nav className="flex item-center justify-end p-4">
                <button
                    className="border-[1px] border-black"
                    onClick={() => navigate("/basket")}
                >
                    Basket
                </button>

                {localStorage.getItem("token") ? (
                    <>
                        <button
                            className="border-[1px] border-black"
                            onClick={() => navigate("/account")}
                        >
                            Account
                        </button>
                        <button
                            className="border-[1px] border-black"
                            onClick={() => {
                                handleLogout();
                                navigate("/");
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="border-[1px] border-black"
                            onClick={() => navigate("/signin")}
                        >
                            Sign In
                        </button>
                        <button
                            className="border-[1px] border-black"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </nav>

            <main>{children}</main>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                // pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="light"
                // stacked
                transition={Bounce}
            />
        </div>
    );
}

export default NavLayout;
