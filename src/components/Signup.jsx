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
import UserValidation from "../utils/validateUser";
import { createUser } from "../api/user.api";
import hide from "./assets/imgs/hide.png";
import show from "./assets/imgs/show.png";

function SignupForm() {
    const navigate = useNavigate();

    const levelColor = ["red", "blue", "green"];

    const validation = new UserValidation();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [fieldsStatus, setFieldsStatus] = useState({
        username: "",
        email: "",
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
                    case "username": {
                        validation.usernameValidation(value);
                        setIsFormFilled((prev) => ({
                            ...prev,
                            [key]: true,
                        }));
                        break;
                    }
                    case "email": {
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

    const submitHandler = useCallback(
        (e) => {
            e.preventDefault();
            async function postAuth() {
                const data = await createUser({ ...user });
                if (data) {
                    navigate("/signin");
                }
            }
            postAuth();
        },
        [user, navigate]
    );

    function handleFormNavigateSignIn() {
        navigate("/signin");
    }

    return (
        <form className="px-10 mt-20 py-8 flex flex-col justify-self-center place-items-center  border-[1px] rounded-3xl bg-gray-700">
            <div className="relative mb-4">
                <InputField
                    className={
                        "w-64 mb-1 px-4 py-1 border-[1px] rounded-xl bg-gray-500 text-slate-200 focus:outline-none focus:border-sky-500 focus:border-[1px]"
                    }
                    id={"username_signup"}
                    value={user.username}
                    label="Username"
                    onChange={(e) => inputHandler("username", e)}
                    onBlur={(e) => {
                        try {
                            validation.usernameValidation(e);
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["username"]: "Correct",
                            }));
                        } catch (e) {
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["username"]: "Invalid username",
                            }));
                        }
                    }}
                />
                <div
                    className={`h-4 text-xs ${fieldsStatus.username === "Correct"
                        ? "text-slate-200"
                        : "text-red-400"
                        }`}
                >
                    {fieldsStatus.username}
                </div>
            </div>

            <div className="relative mb-4">
                <InputField
                    className={
                        "w-64 mb-1 px-4 py-1 border-[1px] rounded-2xl  bg-gray-500 text-slate-200 focus:outline-none focus:border-sky-500 focus:border-[1px]"
                    }
                    id={"email_signup"}
                    value={user.email}
                    label={"E-mail"}
                    onChange={(e) => inputHandler("email", e)}
                    onBlur={(e) => {
                        try {
                            validation.emailValidation(e);
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["email"]: "Correct",
                            }));
                        } catch (e) {
                            setFieldsStatus((prev) => ({
                                ...prev,
                                ["email"]: "Invalid e-mail",
                            }));
                        }
                    }}
                />
                <div
                    className={`h-4 text-xs ${fieldsStatus.email === "Correct"
                        ? "text-slate-200"
                        : "text-red-400"
                        }`}
                >
                    {fieldsStatus.email}
                </div>
            </div>

            <div className="relative">
                <InputField
                    className={
                        "w-64 px-4 py-1 border-[1px] rounded-2xl  bg-gray-500 text-slate-200 focus:outline-none focus:border-sky-500 focus:border-[1px]"
                    }
                    id={"password_signup"}
                    value={user.password}
                    label="Password"
                    onChange={(e) => inputHandler("password", e)}
                    type={isPassShow ? "text" : "password"}
                />

                <div
                    className="w-6 h-6 bg-cover bg-no-repeat  absolute top-[30px] right-[12px] invert-[.90]"
                    style={{
                        backgroundImage: `url(${isPassShow ? show : hide})`,
                    }}
                    onClick={() => setIsPassShow((prev) => !prev)}
                ></div>

                <div
                    className="h-2 rounded mt-1 ml-2"
                    style={{
                        width: `${isFormFilled.password * 80}px`,
                        backgroundColor: `${levelColor[isFormFilled.password - 1]
                            }`,
                    }}
                ></div>
            </div>

            <button
                onClick={(e) => submitHandler(e)}
                type="submit"
                className={`border-[1px] w-64 rounded-2xl px-3 py-1 mt-10 ${!isFilled() ? 'opacity-50 text-gray-400 cursor-default' : 'font-bold text-slate-200 hover:bg-sky-800'}`}
                disabled={!isFilled()}
            >
                Sign up
            </button>

            <button
                className="w-64 mt-4 border-[1px] rounded-2xl px-3 py-1 text-slate-200 hover:bg-sky-800"
                onClick={handleFormNavigateSignIn}
            >
                Already have an account?
            </button>
        </form>
    );
}

export default SignupForm;
