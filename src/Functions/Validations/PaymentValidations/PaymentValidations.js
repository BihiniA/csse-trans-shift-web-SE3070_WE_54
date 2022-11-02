import joi from "@hapi/joi"

const PaymentValidations = (payment) => {
    const schema = joi.object({
        amount: joi.string().min(3).max(255).required().messages({
            "string.empty": `Amount is required.`,
            "any.required": `Amount is required.`,
            "string.base": `Amount should be a type of 'text'.`,
            "string.min": `Amount should have a minimum length of {#limit}.`,
            "string.max": `Amount should have a maximum length of {#limit}.`,
        }),
        card: joi.string().min(16).max(16).required().messages({
            "string.empty": `Card No is required.`,
            "any.required": `Card No is required.`,
            "string.base": `Card No should be a type of 'text'.`,
            "string.min": `Card No should have a minimum length of {#limit}.`,
            "string.max": `Card No should have a maximum length of {#limit}.`,
        }),
        name: joi.string().min(3).max(255).required().messages({
            "string.empty": `Name is required.`,
            "any.required": `Name is required.`,
            "string.base": `Name should be a type of 'text'.`,
            "string.min": `Name should have a minimum length of {#limit}.`,
            "string.max": `Name should have a maximum length of {#limit}.`,
        }),
        cvc: joi.string().min(3).max(3).required().messages({
            "string.empty": `CVC  is required.`,
            "any.required": `CVC is required.`,
            "string.base": `CVC should be a type of 'text'.`,
            "string.min": `CVC should have a minimum length of {#limit}.`,
            "string.max": `CVC should have a maximum length of {#limit}.`,
        }),
        exp: joi.string().min(3).max(255).required().messages({
            "string.empty": `Expiery Date is required.`,
            "any.required": `Expiery Date is required.`,
            "string.base": `Expiery Date should be a type of 'text'.`,
            "string.min": `Expiery Date should have a minimum length of {#limit}.`,
            "string.max": `Expiery Date should have a maximum length of {#limit}.`,
        }),

        pay_date: joi.string().min(3).max(255).required().messages({
            "string.empty": `Payment Date is required.`,
            "any.required": `Payment Date is required.`,
            "string.base": `Payment Date should be a type of 'text'.`,
            "string.min": `Payment Date should have a minimum length of {#limit}.`,
            "string.max": `Payment Date should have a maximum length of {#limit}.`,
        }),
    });

    const result = schema.validate(payment);

    if (result.error) {
        return {
            status: false,
            error: result.error.details[0].message,
            path: result.error.details[0].context.label,
        }
    } else {
        return {
            status: true
        }
    }
};

export default PaymentValidations;
