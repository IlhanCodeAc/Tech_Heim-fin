import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../../../../services/orders";

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any | null>(null); // Adjusted to any for flexibility
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await orderService.getOrderItems(orderId as string);
        console.log(response); // Log the full response to check its structure

        if (response.data && response.data.items) {
          setOrder(response.data);
        } else {
          setError('No items found in this order');
          toast.error("No items found in this order");
        }
      } catch (error) {
        setError('Failed to fetch order details');
        toast.error("Failed to fetch order details");
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
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Order Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Order ID: {order._id}</h2>
            <p className="text-sm text-gray-600">Status: 
              <span className={`px-2 py-1 rounded-full text-white text-xs ${order.status === "pending" ? "bg-yellow-500" : order.status === "completed" ? "bg-green-500" : "bg-red-500"}`}>
                {order.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">Total: ${order.total}</p>
            <p className="text-sm text-gray-600">Currency: {order.currency}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
            <p className="text-sm text-gray-600">{order.shippingAddress}</p>
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
                  <tr key={item.product._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">${item.product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">${item.quantity * item.product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center px-6 py-4 text-sm text-gray-800">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
