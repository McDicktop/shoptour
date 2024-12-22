import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./context/dataContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { FilterProvider } from "./context/filterContext.jsx";
import { BasketProvider } from "./context/basketContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserProvider>
            <DataProvider>
                <BasketProvider>
                    <FilterProvider>
                        <App />
                    </FilterProvider>
                </BasketProvider>
            </DataProvider>
        </UserProvider>
    </StrictMode>
);

// */ - list of products (filter -> price, cat, a-z, z-a, none(null))
// */:id - product item (view)

// */signin
// */signup

// */account ?? */signin
// */basket ?? */signin
// */order ?? */signin

//????? */paymnet ?? */signin

// */admin ?? */signin (role === admin)
// */admin/settings - (сделаем список с товарами, которые через чек изменяют статус отображения для конечно пользователя)
// */admin/analytic
