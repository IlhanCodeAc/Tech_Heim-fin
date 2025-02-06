import React from "react";
import { Trash2 } from "lucide-react";

const Wishlist: React.FC = () => {
  const wishlistItems = [
    { id: 1, image: "https://via.placeholder.com/150" },
    { id: 2, image: "https://via.placeholder.com/150" },
    { id: 3, image: "https://via.placeholder.com/150" },
    { id: 4, image: "https://via.placeholder.com/150" },
    { id: 5, image: "https://via.placeholder.com/150" },
    { id: 6, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-lg bg-white shadow-lg border border-gray-200 flex flex-col items-center"
          style={{ boxShadow: "-2px 2px 20px -1px rgba(113, 113, 113, 0.20)" }}
        >
          <img src={item.image} alt="Wishlist Item" className="w-full h-40 object-cover rounded-md mb-4" />
          <div className="flex justify-between w-full mt-4">
            <button
              className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              Add to Cart
            </button>
            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
