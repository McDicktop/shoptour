import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import NavLayout from "./components/layout/NavLayout";
import SignupForm from "./components/Signup";
import SigninForm from "./components/Signin";
import AdminPanel from "./components/adminPanel";
import Account from "./components/Account";
import Main from "./components/Main";
import ProductView from "./components/ProductView";
import BasketPage from "./components/Basket";
import Payment from "./components/Payment";
import LoaderComponent from "./components/layout/LoaderComponent";

import { useEffect } from "react";

import { useUser } from "./context/userContext";

import "react-toastify/dist/ReactToastify.css";



function PrivateRoute({ isAuthenticated, isAdmin, children }) {

  // ИЗМЕНИЛ PRIVATE ROUTE
  if (!isAuthenticated) return <Navigate to={"/signin"} />;

  if (children.type.name === 'AdminPanel') {
    if (!isAdmin) {
      return <Navigate to={"/"} />
    }
    return children;
  }

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
              element={<Main />}
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
              path="/payment/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                >
                  <Payment />
                </PrivateRoute>
              }
            />

            <Route path="/basket" element={<BasketPage />} />

            <Route path="/product/:id" element={<ProductView />} />
          </Routes>
        </NavLayout>
      </div>
    </Router>
  );
}

export default App;