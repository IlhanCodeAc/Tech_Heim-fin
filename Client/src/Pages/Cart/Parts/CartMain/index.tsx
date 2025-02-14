import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Minus, Plus, Trash2 } from "lucide-react";
import cartService from "../../../../services/reservation";
import swal from "sweetalert2";
import { Product } from "../../../../types";

interface CartItem {
  _id: string;
  productId: string;
  name?: string;
  price?: number;
  images?: string;
  product: Product;
  quantity: number;
}

const CartMain = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await cartService.getAll();
        console.log("Fetched cart data:", cartResponse.data.items);

        const populatedCart = cartResponse.data.items.map((item) => {
            const product = item.product || {};
            return {
              ...item,
              productId: product._id || item._id,
              name: product.name || "Unknown Product",
              price: item.price || 0,
              image: product.images && product.images.length 
                ? `/product/${product.images[0]}`  // Adjust this path based on your API response
                : "https://via.placeholder.com/150",
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
      const response = await cartService.addToCart({ productId, quantity: 1 });
      if (response.data) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      }
    } catch (error) {
      console.error("Error increasing quantity:", error.response?.data || error);
    }
  };
  
  const handleDecrease = async (productId: string) => {
    try {
      const item = cartItems.find((item) => item.productId === productId);
      if (!item || item.quantity <= 1) return;
  
      const response = await cartService.addToCart({ productId, quantity: -1 });
      if (response.data) {
        setCartItems((prevCart) =>
          prevCart
            .map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0) // Remove items with 0 quantity
        );
      }
    } catch (error) {
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
    } catch (error) {
      swal.fire("Error!", "Failed to remove item.", "error");
      console.error("Error removing item:", (error as any).response?.data || error);
    }
  };
  

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <div className="container">
      <div className={style.CartContainer}>
        <div className={style.Left}>
          <div className={style.CartCards}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.productId} className={style.CartCard}>
                  <div className={style.CardLeft}>
                  <img src={item.product.images[0]} alt={item.name} />


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
              <p>Your cart is empty.</p>
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
              <button className={style.ToCheckout}>Proceed To Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMain;
