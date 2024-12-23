import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import BasketIcon from "../assets/icons/basket.icon";
import AccountIcon from "../assets/icons/account.icon";
import LoginIcon from "../assets/icons/login.icon";
import LogoutIcon from "../assets/icons/logout.icon";
import RegisterIcon from "../assets/icons/register.icon";
import HomeIcon from "../assets/icons/home.icon";

function NavLayout({ children }) {
    const { handleLogout } = useUser();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-2 justify-start">

            <nav className="flex item-center justify-between p-4">

                <div>
                    <button
                        onClick={() => navigate("/")}
                    >
                        <HomeIcon width={40} height={40} />
                    </button>
                </div>



                <div>

                    <button
                        onClick={() => navigate("/basket")}
                    >
                        <BasketIcon width={40} height={40} />
                    </button>

                    {localStorage.getItem("token") ? (
                        <>
                            <button
                                onClick={() => navigate("/account")}
                            >
                                <AccountIcon width={40} height={40} />
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    navigate("/");
                                }}
                            >
                                <LogoutIcon width={40} height={40} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/signin")}
                            >
                                <LoginIcon width={40} height={40} />
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                            >
                                <RegisterIcon width={40} height={40} />
                            </button>
                        </>
                    )}


                </div>


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
