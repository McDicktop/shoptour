import SignupForm from "./components/Signup";
import SigninForm from "./components/Signin";
import AdminPanel from "./components/AdminPanel";
import Account from "./components/Account";
import Main from "./components/Main";
import Basket from "./components/Basket";
import LoaderComponent from "./components/layout/LoaderComponent";

import { ToastContainer, Bounce } from "react-toastify";

import { useUser } from "./context/userContext";

import ProductView from "./components/ProductView";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import NavLayout from "./components/layout/NavLayout";

// function PrivateRoute({ isAuthenticated, children }) {
//     return isAuthenticated ? children : <Navigate to={"/signin"} />;
// }

// function AdminRoute({ isAuthenticated, isAdmin, children }) {
//     return isAuthenticated ? (
//         isAdmin ? (
//             children
//         ) : (
//             <Navigate to={"/account"} />
//         )
//     ) : (
//         <Navigate to={"/signin"} />
//     );
// }

function PrivateRoute({ isAuthenticated, isAdmin, children }) {
    // ИЗМЕНИЛ PRIVATE ROUTE
    if (!isAuthenticated) return <Navigate to={"/signin"} />;
    if (children === <Account />) return children;
    if (!isAdmin) return <Account />;
    return children;
}

function App() {
    const { isAuthenticated, isAdmin, loading } = useUser();

    if (loading) {
        return <LoaderComponent />;
    }

    return (
        <Router>
            <div className="App">
                <NavLayout>
                    <Routes>
                        <Route
                            path="/"
                            element={<Main isAuthenticated={isAuthenticated} />}
                        />
                        <Route
                            path="/signup"
                            element={
                                !isAuthenticated ? (
                                    <SignupForm />
                                ) : (
                                    <Navigate to={"/account"} />
                                )
                            }
                        />
                        <Route
                            path="/signin"
                            element={
                                !isAuthenticated ? (
                                    <SigninForm />
                                ) : (
                                    <Navigate to={"/account"} />
                                )
                            }
                        />

                        {/* Защещенный маршрут для авторизованных пользователей */}

                        <Route
                            path="/account"
                            element={
                                <PrivateRoute
                                    isAuthenticated={isAuthenticated}
                                    isAdmin={isAdmin}
                                >
                                    <Account />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <PrivateRoute
                                    isAuthenticated={isAuthenticated}
                                    isAdmin={isAdmin}
                                >
                                    <AdminPanel />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/basket"
                            element={<Basket />}                            
                        />

                        <Route path="/product/:id" element={<ProductView />} />
                    </Routes>
                </NavLayout>
            </div>
        </Router>
    );
}

export default App;

// {
//     title: json,
//     type: json,
//     description: json,
//     images: [1, 2, 3 url],
//     price: json,
//     rating: random(3, 5),
//     code: 0001,
//     quantity: random(0, 999),
//     sale: {
//         status: true/false,
//         if status === true -> value: 0.01 - 0.25
//     },
//     releaseDate: random Date(),

//     createdAt: date of creating document in mongo,
//     updatedAt: date of updating document in mongo,
// }
