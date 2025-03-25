export type PaymentMethod = {
    _id: string;
    userId: string;
    cardNumber: string;
    cvv: string;
    expiryDate: string;
    isDefault: boolean;
    createdAt: string;
  };
  
  export type GetPaymentMethodsType = {
    items: PaymentMethod[];
    message: string;
  };
  
  export type GetPaymentMethodType = {
    item: PaymentMethod;
    message: string;
  };
  