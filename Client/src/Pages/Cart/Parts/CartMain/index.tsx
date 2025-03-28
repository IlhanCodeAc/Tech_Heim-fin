import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Minus, Plus, Trash2 } from "lucide-react";
import cartService from "../../../../services/reservation";
import swal from "sweetalert2";
import getStripe from "../../../../Components/utils/stripe";
import { toast } from "sonner";
import { Product } from "../../../../types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  product: Partial<Product>;
  quantity: number;
}

const CartMain: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await cartService.getAll();
        console.log("Fetched cart data:", cartResponse.data.items);

        const populatedCart: CartItem[] = cartResponse.data.items.map((item: any) => {
          const product = item.product || {};
          return {
            ...item,
            productId: product._id || item._id,
            name: product.name || "Unknown Product",
            price: item.price || 0,
            image: product.images?.length
              ? `http://localhost:3000/public/product/${product.images[0]}`
              : "https://via.placeholder.com/150",
            quantity: item.quantity || 1,
          };
        });

        setCartItems(populatedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleIncrease = async (productId: string) => {
    try {
      const response = await cartService.addToCart({ productId, quantity: 1 } as any);
      if (response.data) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      }
    } catch (error: any) {
      console.error("Error increasing quantity:", error.response?.data || error);
    }
  };

  const handleDecrease = async (productId: string) => {
    try {
      const item = cartItems.find((item) => item.productId === productId);
      if (!item) return;

      if (item.quantity === 1) {
        await handleRemove(productId);
        return;
      }

      const response = await cartService.addToCart({ productId, quantity: -1 } as any);
      if (response.data) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    } catch (error: any) {
      console.error("Error decreasing quantity:", error.response?.data || error);
    }
  };

  const handleRemove = async (id: string) => {
    console.log("Removing item with ID:", id);
    try {
      const response = await cartService.removeFromCart({ productId: id });
      console.log("Remove Response:", response);

      if (response.data) {
        setCartItems((prevCart) => prevCart.filter((item) => item.productId !== id));
        swal.fire("Removed!", "Item removed from cart.", "success");
      }
    } catch (error: any) {
      swal.fire("Error!", "Failed to remove item.", "error");
      console.error("Error removing item:", error.response?.data || error);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      await swal.fire({
        title: "Your cart is empty!",
        text: "Please add items to your cart before proceeding to checkout.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#0C68F4", // Blue button
      });
      return; 
    }
  
    const result = await swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0C68F4", 
      cancelButtonColor: "#d33", 
    });
  
    if (!result.isConfirmed) {
      return; 
    }
  
    try {
      console.log("Basket before checkout:", cartItems);
  
      const itemsForCheckout = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price ?? 0,
        quantity: item.quantity,
      }));
  
      const response = await fetch(`http://localhost:3000/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsForCheckout }),
      });
  
      const data = await response.json();
      console.log("Response from API:", data);
  
      const { sessionId } = data;
      const stripe = await getStripe();
  
      if (stripe && sessionId) {
        try {
          await cartService.clearCart();
          setCartItems([]);
        } catch (error: any) {
          console.error("Failed to clear cart:", error.response?.data || error);
        }
        await stripe.redirectToCheckout({ sessionId });
      }
  
      localStorage.setItem("checkoutTotal", subtotal.toFixed(2));
  
      navigate("/checkout");
    } catch (error) {
      toast.error("Checkout error.");
      console.error(error);
    }
  };
  
  
  return (
    <div className="container">
      <div className={style.CartContainer}>
        <div className={style.Left}>
          <div className={style.CartCards}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.productId} className={style.CartCard}>
                  <div className={style.CardLeft}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={style.CardMid}>
                    <div className={style.MidTop}>
                      <h3>{item.name}</h3>
                    </div>
                    <div className={style.MidBottom}>
                      <div className={style.BottomLeft}>
                        <p>${(item.price || 0) * item.quantity}</p>
                      </div>
                      <div className={style.BottomRight}>
                        <button className={style.btn} onClick={() => handleDecrease(item.productId)}>
                          <Minus size={16} />
                        </button>
                        <p>{item.quantity}</p>
                        <button className={style.btn} onClick={() => handleIncrease(item.productId)}>
                          <Plus size={16} />
                        </button>
                        <button className={style.trashBtn} onClick={() => handleRemove(item.productId)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={style.EmptyCart}>
                <h3>Your cart is empty</h3>
                <p>Browse our products and add them to your cart!</p>
                <button className={style.BtnGoToProducts} onClick={() => navigate("/products")}>
                  Go to Products
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={style.Right}>
          <div className={style.CheckoutCard}>
            <div className={style.cardTop}>
              <h3>Payment Details</h3>
            </div>
            <div className={style.cardMain}>
              <div className={style.Subtotal}>
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className={style.Shipment}>
                <p>Shipment cost</p>
                <p>$0.00</p>
              </div>
            </div>
            <div className={style.cardFoot}>
              <div className={style.GrandTotal}>
                <p>Grand Total</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <button className={style.ToCheckout} onClick={handleCheckout}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMain;
