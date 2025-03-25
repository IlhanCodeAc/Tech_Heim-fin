// Types for order service

// Order type definition for individual order
export type OrderType = {
    _id: string;
    user: string; // User ID
    items: any[]; // Array of items in the order
    total: number;
    currency: string;
    status: string;
    createdAt: string;
  };
  
  // Type for the response when getting all orders
  export type GetOrdersType = {
    items: OrderType[]; // List of orders
    message: string;
  };
  
  // Type for the request body when creating an order
  export type CreateOrderData = {
    userId: string;
    items: any[]; // Adjust based on your order item structure
    total: number;
    currency: string;
    paymentMethodId: string;
    paymentDetails: any; // Modify if necessary
  };
  
  // Type for updating order status
  export type UpdateOrderStatusData = {
    status: string; // The new status (e.g., "completed", "pending")
  };
  
  // Type for the response when deleting an order
  export type DeleteOrderResponse = {
    message: string;
  };
  