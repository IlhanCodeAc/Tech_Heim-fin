import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../../../../services/orders";
import Newproducts from "../../../Home/Parts/New_Products";

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const orderId = id;
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await orderService.getOrderItems(orderId as string);
        if (response.data.order) {
          setOrder(response.data.order); 
        } else {
          setError("No order data found");
          toast.error("No order data found");
        }

        if (!response.data.order.items || response.data.order.items.length === 0) {
          setError("No items found in this order");
          toast.error("No items found in this order");
        }
      } catch (error) {
        setError("Failed to fetch order details");
        toast.error("Failed to fetch order details");
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">Order Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              <span className="block md:inline-block md:mr-4 px-2 py-1">{`Order ID: ${order._id || "Not Available"}`}</span>
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Status:
              <span
                className={`px-2 py-1 rounded-full ml-[2px] text-white text-xs ${
                  order.status === "pending"
                    ? "bg-yellow-500"
                    : order.status === "completed"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-2">Total: ${order.total}</p>
            <p className="text-sm text-gray-600">Currency: {order.currency}</p>
          </div>
       
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Items in this Order</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-4 text-sm font-medium text-gray-700">Product</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">Quantity</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.length > 0 ? (
                order.items.map((item: any) => (
                  <tr key={item.productId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.name || "Unknown Product"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">${item.price ?? "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      ${item.quantity * (item.price ?? 0)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center px-6 py-4 text-sm text-gray-800">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Newproducts/>
    </div>
  );
};

export default OrderDetailsPage;
