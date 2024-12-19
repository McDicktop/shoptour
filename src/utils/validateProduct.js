export class ValidationError extends Error {
    constructor(field, message) {
        super(`${field} validation error: ${message}`);
        this.name = "ValidationError";
        this.field = field;
    }
}

export default class Validation {
    constructor() {
        this.namePattern = /^[a-zа-я0-9 \-\'\"\+\.\,\!\?\*]+$/i;
        this.codePattern = /^\d{4}$/;
        this.pricePattern = /^\d+\.?\d{0,2}$/;
        this.quantityPattern = /^\d*$/;
        this.maxPrice = 999999;
        this.maxQuantity = 999999;
    }

    static throwValidationError(field, message) {
        throw new ValidationError(field, message);
    }

    static validateString(field, value) {
        if (typeof value !== "string") {
            Validation.throwValidationError(field, "Input must be a string");
        }

        if (value.trim() === "") {
            Validation.throwValidationError(field, "Input cannot be empty");
        }

        return value.trim();
    }

    nameValidation(arg) {
        const trimmedValue = Validation.validateString("Name", arg);

        if (!this.namePattern.test(trimmedValue)) {
            Validation.throwValidationError(
                "Name",
                "Contains invalid characters. Allowed alphanumeric and special symbols ( +, -, *, \", ', ., ,, !, ? )"
            );
        }

        return true;
    }

    codeValidation(arg) {
        const trimmedValue = Validation.validateString("Code", arg);

        if (!this.codePattern.test(trimmedValue)) {
            Validation.throwValidationError(
                "Code",
                "Must be exactly 4 digits"
            );
        }

        return true;
    }

    priceValidation(arg) {
        const trimmedValue = Validation.validateString("Price", arg),
            parsedPrice = parseFloat(trimmedValue);

        if (!this.pricePattern.test(trimmedValue) || parsedPrice >= this.maxPrice) {
            Validation.throwValidationError(
                "Price",
                "Invalid format or exceeds maximum allowed value"
            );
        }

        return true;
    }

    quantityValidation(arg) {
        const trimmedValue = Validation.validateString("Quantity", arg),
            parsedQuantity = parseFloat(trimmedValue);

        if (!this.quantityPattern.test(trimmedValue) || parsedQuantity >= this.maxQuantity) {
            Validation.throwValidationError(
                "Quantity",
                "Must be a valid integer or exceeds maximum allowed value"
            );
        }

        return true;
    }

    totalValidation(code, price, quantity) {
        return (
            // this.nameValidation(name) &&
            this.codeValidation(code) &&
            this.priceValidation(price) &&
            this.quantityValidation(quantity)
        );
    }
}
