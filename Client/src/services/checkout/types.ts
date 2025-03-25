export type Checkout = {
    _id: string;
    userId: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    paymentMethodId: string;
    createdAt: string;
  };
  
  export type GetCheckoutsType = {
    items: Checkout[];
    message: string;
  };
  
  export type GetCheckoutType = {
    item: Checkout;
    message: string;
  };
  