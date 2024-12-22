import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./common/InputField";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { userLogin } from "../api/user.api";
import hide from './assets/imgs/hide.png'
import show from "./assets/imgs/show.png";
import "./styles.css";

function SigninForm() {

    const navigate = useNavigate();

    const { handleLogin } = useUser();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [isFormFilled, setIsFormFilled] = useState({
        username: false,
        password: false,
    });

    const [isPassShow, setIsPassShow] = useState(false);

    const isFilled = useCallback(() => {
        return Object.values(isFormFilled).every((field) => field);
    }, [isFormFilled]);

    const inputHandler = useCallback(
        (key, value) => {
            setUser((prev) => ({ ...prev, [key]: value }));
            setIsFormFilled((prev) => ({ ...prev, [key]: value !== '' ? true : false }))
        },
        [setUser, setIsFormFilled]
    );

    const submitHandler = useCallback((e) => {
        e.preventDefault();

        async function postAuth() {
            const data = await userLogin({ ...user });
            if (data.token) {
                toast('Авторизация прошла успешно');
                await handleLogin(data.token);
                navigate('/');
            } else {
                toast(data);
            }
        }
        postAuth();
    }, [user, handleLogin, navigate]);


    function handleFormNavigateSignUp() {
        navigate("/signup");
    }

    return (
        <form className="signup_form">
            <div className="username_container">
                <InputField
                    className={"input_signup"}
                    id={"username_signin"}
                    value={user.username}
                    placeholder={"name"}
                    onChange={(e) => inputHandler("username", e)}
                />
            </div>

            <div className="password_container">
                <InputField
                    className={"input_signup"}
                    id={"password_signin"}
                    value={user.password}
                    placeholder={"password"}
                    onChange={(e) => inputHandler("password", e)}
                    type={isPassShow ? "text" : "password"}
                />

                <div
                    className="hide_ico"
                    style={{
                        backgroundImage: `url(${isPassShow ? show : hide})`,
                    }}
                    onClick={() => setIsPassShow((prev) => !prev)}
                ></div>

            </div>

            <button
                onClick={(e) => submitHandler(e)}
                type="submit"
                className="signup_btn"
                disabled={!isFilled()}
            >
                Sign In
            </button>

            <button className="underline" onClick={handleFormNavigateSignUp}>
                No account yet?
            </button>
        </form>
    );
}

export default SigninForm;