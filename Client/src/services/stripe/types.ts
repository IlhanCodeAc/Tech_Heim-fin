// Interface for the cart items when creating a checkout session
export interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  // Payload for creating a checkout session
  export interface CreateCheckoutSessionRequestPayload {
    cartItems: CartItem[];  // List of cart items including name, price, and quantity
  }
  
  // Response type for creating checkout session
  export interface CreateCheckoutSessionResponseType {
    sessionId: string;  // The ID of the created checkout session
  }
  
  // Response type for fetching payment status
  export interface GetPaymentStatusResponseType {
    status: "success" | "failed";  // Payment status
  }
  