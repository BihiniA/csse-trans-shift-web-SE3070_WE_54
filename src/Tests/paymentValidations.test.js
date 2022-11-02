import paymentValidations from "../Functions/Validations/PaymentValidations/PaymentValidations";

//Positive Test Case
test('paymentValidationsPositive', () => {
    expect(paymentValidations({
        amount: "2000",
        name: "sam",
        card: "1234567834567456",
        cvc: 345,
        exp: 2021 - 10 - 30,
        pay_date: 2021 - 10 - 05,

    })).toStrictEqual({
        status: true
    });
});

//Negative Test Case
test('paymentValidationsNegative', () => {
    expect(paymentValidations({
        amount: "2000",
        name: "sam",
        card: "1234567834567456",
        cvc: 345,
        exp: 2021 - 10 - 30,
        pay_date: 2021 - 10 - 05,

    })).toStrictEqual({
        status: true
    });
});

