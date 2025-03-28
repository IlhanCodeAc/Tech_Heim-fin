import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import wishlistService from "../../../../services/wishlist";
import cartService from "../../../../services/reservation";

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await wishlistService.getAll();
        setWishlistItems(response.data.items); // Ensure API returns correct structure
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Add product to cart
  const addToCart = async (productId: string) => {
    try {
      await cartService.addToCart({ productId, quantity: 1 } as any);
      Swal.fire("Success!", "Product added to cart!", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error", "Failed to add product to cart", "error");
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist({ productId });
      setWishlistItems((prev) => prev.filter((item) => item.product._id !== productId));
      Swal.fire("Removed", "Product removed from wishlist", "info");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      Swal.fire("Error", "Failed to remove from wishlist", "error");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading wishlist...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-lg bg-white shadow-lg border border-gray-200 flex flex-col items-center"
            style={{ boxShadow: "-2px 2px 20px -1px rgba(113, 113, 113, 0.20)" }}
          >
            <img
              src={
                item.product.images?.length
                  ? `http://localhost:3000/public/product/${item.product.images[0]}`
                  : "https://via.placeholder.com/150"
              }
              alt={item.product.name}
              className="w-full h-[100px] object-contain rounded-md mb-4"
            />
            <p className="text-lg font-semibold mb-2">{item.product.name}</p>
            <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
            <div className="flex justify-between w-full mt-4">
              <button
                className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
                onClick={() => addToCart(item.product._id)}
              >
                Add to Cart
              </button>
              <button className="text-red-500 hover:text-red-700" onClick={() => removeFromWishlist(item.product._id)}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center text-gray-500">Your wishlist is empty.</div>
      )}
    </div>
  );
};

export default Wishlist;
