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
      <nav className="fixed w-full z-10 bg-white flex item-center justify-between p-4 border-b">
        <div>
          <button onClick={() => navigate("/")}>
            <HomeIcon width={40} height={40} />
          </button>
        </div>

        <div>
          <button onClick={() => navigate("/basket")} className="mr-4">
            <BasketIcon width={40} height={40} />
          </button>

          {localStorage.getItem("token") ? (
            <>
              <button onClick={() => navigate("/account")} className="mr-4">
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
              <button onClick={() => navigate("/signin")} className="mr-4">
                <LoginIcon width={40} height={40} />
              </button>
              <button onClick={() => navigate("/signup")}>
                <RegisterIcon width={40} height={40} />
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="mt-[78px] pt-4 pb-[78px] bg-gray-100">{children}</main>

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
