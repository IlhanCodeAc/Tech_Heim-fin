import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrderType } from "../../../../services/orders/types";
import orderService from "../../../../services/orders";
import { useNavigate } from "react-router-dom";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ _id: string; role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!storedUser || !storedUser._id) {
      setError("No user found, please log in.");
      setLoading(false);
      return;
    }

    setUser(storedUser);

    const fetchOrders = async () => {
      try {
        if (storedUser.role === "admin") {
          const response = await orderService.getAllOrders();
          setOrders(response.data as any);
        } else {
          const response = await orderService.getUserOrders(storedUser._id);
          setOrders(response.data as any);
        }
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await orderService.updateOrderStatus(orderId, { status });
      toast.success(`Order status updated to ${status}`);
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status } : order)));
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await orderService.deleteOrder(orderId);
      toast.success("Order deleted successfully");
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Orders</h1>

      {/* Card-Based Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 overflow-hidden max-w-xs w-full"
            onClick={() => handleOrderClick(order._id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{order._id}</h3>
              <span
                className={`px-2 py-1 rounded-full text-white text-xs ${
                  order.status === "pending"
                    ? "bg-yellow-500"
                    : order.status === "completed"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-700 mb-2">Total: ${order.total}</p>
            <p className="text-gray-500">Currency: {order.currency}</p>

            {user?.role === "admin" && (
              <div className="mt-4 flex flex-wrap gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateStatus(order._id, "completed");
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateStatus(order._id, "failed");
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Mark as Failed
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteOrder(order._id);
                  }}
                  className="bg-red-700 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
