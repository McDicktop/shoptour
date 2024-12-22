// username, email, pass

// pass У пароля 4 статуса валидности

// 1 - не валидно
// 2 - валидно, уровень 1 (1 буква, 1 цифра и 1 заглавная и количество до 8)
// 3 - валидно, уровень 2 (1 буква, 1 цифра и 1 заглавная и количество более 8)
// 4 - валидно, уровень 3 (1 буква, 1 цифра, 1 заглавная и 1 спец и количество более 8)
// При каждом изменении значения поля pass

// email - валидация с пояснением и статусом
// username - валидация с пояснением и статусом
// При смене фокуса (убираем фокус)

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./common/InputField";
import UserValidation from '../utils/validateUser';
import { createUser } from "../api/user.api";
import hide from "./assets/imgs/hide.png";
import show from "./assets/imgs/show.png";
import "./styles.css";

function SignupForm() {

    const navigate = useNavigate();

    const levelColor = ['red', 'blue', 'green'];

    const validation = new UserValidation();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [fieldsStatus, setFieldsStatus] = useState({
        username: "",
        email: ""
    });

    const [isFormFilled, setIsFormFilled] = useState({
        username: false,
        email: false,
        password: false,
    });

    const [isPassShow, setIsPassShow] = useState(false);

    const isFilled = useCallback(() => {
        return Object.values(isFormFilled).every((field) => field);
    }, [isFormFilled]);

    const inputHandler = useCallback(
        (key, value) => {
            setUser((prev) => ({ ...prev, [key]: value }));
            try {
                switch (key) {
                    case 'username': {
                        validation.usernameValidation(value);
                        setIsFormFilled((prev) => ({
                            ...prev,
                            [key]: true,
                        }));
                        break;
                    }
                    case 'email': {
                        validation.emailValidation(value);
                        setIsFormFilled((prev) => ({
                            ...prev,
                            [key]: true,
                        }));
                        break;
                    }
                    default: {
                        validation.passwordValidation(value);
                        setIsFormFilled((prev) => ({
                            ...prev,
                            [key]: validation.passwordValidation(value),
                        }));
                    }
                }
            } catch (e) {
                setIsFormFilled((prev) => ({ ...prev, [key]: false }));
            }
        },
        [setUser, setIsFormFilled, validation]
    );

    const submitHandler = useCallback((e) => {
        e.preventDefault();
        async function postAuth() {
            const data = await createUser({ ...user });
            if (data) {
                navigate('/signin')
            }
        }
        postAuth();
    }, [user, navigate]);


    function handleFormNavigateSignIn() {
        navigate("/signin");
    }

    return (
        <form className="signup_form">
            <div className="username_container">
                <InputField
                    className={"input_signup"}
                    id={"username_signup"}
                    value={user.username}
                    placeholder={"username"}
                    onChange={(e) => inputHandler("username", e)}
                    onBlur={(e) => {
                        try {
                            validation.usernameValidation(e);
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["username"]: "Correct",
                            }));
                        } catch (e) {
                            console.log(e.message);
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["username"]: "Invalid username",
                            }));
                        }
                    }}
                />
                <div className="field_comment">{fieldsStatus.username}</div>
            </div>

            <div className="email_container">
                <InputField
                    className={"input_signup"}
                    id={"email_signup"}
                    value={user.email}
                    placeholder={"e-mail"}
                    onChange={(e) => inputHandler("email", e)}
                    onBlur={(e) => {
                        try {
                            validation.emailValidation(e);
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["email"]: "Correct",
                            }));
                        } catch (e) {
                            console.log(e.message);
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["email"]: "Invalid e-mail",
                            }));
                        }
                    }}
                />
                <div className="field_comment">{fieldsStatus.email}</div>
            </div>

            <div className="password_container">
                <InputField
                    className={"input_signup"}
                    id={"password_signup"}
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
                <div
                    className="pass_level"
                    style={{
                        width: `${isFormFilled.password * 64}px`,
                        backgroundColor: `${levelColor[isFormFilled.password - 1]}`
                    }}
                ></div>
            </div>

            <button
                onClick={(e) => submitHandler(e)}
                type="submit"
                className="signup_btn"
                disabled={!isFilled()}
            >
                Sign up
            </button>

            <button className="underline" onClick={handleFormNavigateSignIn}>
                Already have an account?
            </button>
        </form>
    );
}

export default SignupForm;