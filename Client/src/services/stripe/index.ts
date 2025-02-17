// stripeService.ts
import axiosInstance from "../axiosInstance";  // Ensure axiosInstance is correctly set up

const createCheckoutSession = async (cartItems: any[]) => {
  try {
    const response = await axiosInstance.post("/payment/create-payment-intent", cartItems);
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
};



const stripeService = {
    createCheckoutSession
}

export default stripeService;