import { validate } from 'email-validator';

export class UserValidationError extends Error {
    constructor(field, message) {
        super(`${field} validation error: ${message}`);
        this.name = "UserValidationError";
        this.field = field;
    }
}

export default class UserValidation {
    constructor() {
        this.usernamePattern = /^[a-zа-я \-\']+$/i;
    }

    static throwValidationError(field, message) {
        throw new UserValidationError(field, message);
    }

    static validateString(field, value) {
        if (typeof value !== "string") {
            UserValidation.throwValidationError(field, "Input must be a string");
        }

        if (value.trim() === "") {
            UserValidation.throwValidationError(field, "Input cannot be empty");
        }

        return value.trim();
    }

    usernameValidation(arg) {
        const trimmedValue = UserValidation.validateString("Username", arg);

        if (!this.usernamePattern.test(trimmedValue)) {
            UserValidation.throwValidationError(
                "Name",
                "Contains invalid characters. Allowed Latin, Cyrillic, \" space \" and symbols  \" - \" and \" ' \")"
            );
        }

        return true;
    }

    emailValidation(arg) {
        const trimmedValue = UserValidation.validateString("Email", arg);

        if (!validate(trimmedValue)) {
            UserValidation.throwValidationError(
                "Email",
                "Invalid email"
            );
        }

        return true;
    }

    passwordValidation(arg) {
        const trimmedValue = UserValidation.validateString("Password", arg);

        const isValidFormat = /^[0-9a-zA-Z-+*_]+$/.test(trimmedValue),
            hasLowerCase = /[a-z]/.test(trimmedValue),
            hasUpperCase = /[A-Z]/.test(trimmedValue),
            hasDigits = /\d+/.test(trimmedValue),
            isLongEnough = trimmedValue.length > 5;

        if (isValidFormat && hasLowerCase && hasUpperCase && hasDigits && isLongEnough) {
            switch (true) {
                case /[-+*_]/.test(trimmedValue) && trimmedValue.length > 8: {
                    return 3;
                }
                case trimmedValue.length > 8: {
                    return 2;
                }
                default: {
                    return 1;
                }
            }
        }

        UserValidation.throwValidationError(
            "Password",
            "Invalid password......."
        );
    }

    totalValidation(username, email, password) {
        return (
            this.usernameValidation(username) &&
            this.emailValidation(email) &&
            this.passwordValidation(password)
        );
    }
}
