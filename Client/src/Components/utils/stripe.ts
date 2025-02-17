import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe("pk_test_51Q4m4bG7y3d14HH5fwqKgSgPssB4a58eg5CGs2NRN7lIZ9cmyPPmW6rlSywL2CkuJmzYtYTXjC7xxqXeTDlPKe7M00eg0qETWq"!);
    }
    return stripePromise;
};

export default getStripe; 