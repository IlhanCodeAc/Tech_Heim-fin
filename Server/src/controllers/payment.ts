import { stripe } from "../lib/stripe";
import { formatAmountForStripe } from "../utils/stripe";

export function formatAmountForStripe(amount: number, currency: string): number {
    if (isNaN(amount)) {
        throw new Error("Invalid amount: NaN detected!");
    }
    return Math.round(amount * 100); // Ensure it's an integer
}

export async function createCheckoutSession(amount: number): Promise<{ url: string | null }> {
    if (isNaN(amount) || amount <= 0) {
        console.error("Invalid checkout amount:", amount);
        throw new Error("Invalid amount for checkout session");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Product Name' },
                    unit_amount: formatAmountForStripe(amount, 'usd'),
                },
                quantity: 1,
            }
        ],
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cancel`,
    });

    return { url: session.url };
}
