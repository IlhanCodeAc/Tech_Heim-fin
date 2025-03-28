import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import { toast } from "sonner";
import cartService from "../../services/reservation";
import orderService from "../../services/orders";
import { z } from "zod";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}


const cardDetailsSchema = z.object({
  cardNumber: z
    .string()
    .length(16, "Card number must be 16 digits")
    .regex(/^\d+$/, "Card number must contain only numbers"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "CVV must contain only numbers"),
  expiryDate: z
    .string()
    .length(5, "Expiry date must be in MM/YY format")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  address: z.string().nonempty("Billing address is required"),
});

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await cartService.getAll();
        const populatedCart: CartItem[] = cartResponse.data.items.map((item: any) => ({
          ...item,
          productId: item.productId || item._id,
          name: item.product.name || "Unknown Product",
          price: item.price || 0,
          image: item.product.images?.length
            ? `http://localhost:3000/public/product/${item.product.images[0]}`
            : "https://via.placeholder.com/150",
          quantity: item.quantity || 1,
        }));
        setCartItems(populatedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    fetchCart();
    fetchUser();
  }, []);

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;

    if (value.length > 2) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    } else if (value.length > 0) {
      formattedValue = `${value.slice(0, 2)}`;
    }

    setCardDetails((prev) => ({ ...prev, expiryDate: formattedValue }));
  };

  const handleCheckout = async () => {
    setFormErrors({});
  
    try {
      cardDetailsSchema.parse(cardDetails);
      setError(null);
  
      const itemsForOrder = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
  
      const orderData = {
        userId: user?._id,
        items: itemsForOrder,
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        currency: "USD",
        paymentDetails: {
          cardNumber: cardDetails.cardNumber,
          cvv: cardDetails.cvv,
          expiryDate: cardDetails.expiryDate,
          address: cardDetails.address,
        },
      };
  
      const createOrderResponse = await orderService.createOrder(orderData as any);
      if (createOrderResponse) {
        await cartService.clearCart(); 
        setCartItems([]); 
  
        swal.fire({
          title: "Order Placed!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor:"#0C68F4"
        }).then(() => {
          window.location.href = "/success";
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
        setFormErrors(
          error.errors.reduce((acc: any, curr: any) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {})
        );
      } else {
        toast.error("Error during checkout.");
        console.error("Error during checkout:", error);
      }
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 mb-[10%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="flex items-center justify-between mb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${(item.price || 0) * item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <p className="font-medium">Subtotal</p>
            <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            {formErrors.cardNumber && <p className="text-red-500">{formErrors.cardNumber}</p>}

            <input
              type="text"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            {formErrors.cvv && <p className="text-red-500">{formErrors.cvv}</p>}

            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={cardDetails.expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            {formErrors.expiryDate && <p className="text-red-500">{formErrors.expiryDate}</p>}

            <input
              type="text"
              placeholder="Billing Address"
              value={cardDetails.address}
              onChange={(e) => setCardDetails({ ...cardDetails, address: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="font-semibold">Grand Total</p>
            <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Place an Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
