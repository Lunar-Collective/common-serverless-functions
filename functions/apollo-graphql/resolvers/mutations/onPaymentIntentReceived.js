const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (amountInCents) => {

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "usd"
        });

        return paymentIntent.client_secret;
    } catch (err) {
        console.error(err);

        return '';
    }

}