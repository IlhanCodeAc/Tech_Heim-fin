import React from "react";

interface CartItem {
  id: number;
  image: string;
  name: string;
  details: string;
  price: string;
  status: "Pending" | "Shipped" | "Delivered";
}

const cartData: CartItem[] = [
  {
    id: 1,
    image: "/path/to/image1.jpg",
    name: "Product 1",
    details: "Description of product 1",
    price: "$120",
    status: "Pending",
  },
  {
    id: 2,
    image: "/path/to/image2.jpg",
    name: "Product 2",
    details: "Description of product 2",
    price: "$85",
    status: "Shipped",
  },
  {
    id: 3,
    image: "/path/to/image3.jpg",
    name: "Product 3",
    details: "Description of product 3",
    price: "$150",
    status: "Delivered",
  },
];

const UserTable: React.FC = () => {
  return (
    <div className="border border-[#F6F6F6] bg-[#F9F9F9] rounded-lg p-5 w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">User Overview</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px] md:table hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Cart Details</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 flex items-center gap-3 min-w-[150px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span className="truncate">{item.name}</span>
                </td>
                <td className="p-3 min-w-[200px] truncate">{item.details}</td>
                <td className="p-3 font-semibold min-w-[100px]">{item.price}</td>
                <td className="p-3 min-w-[120px]">
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-medium 
                      ${item.status === "Pending" ? "text-yellow-600 bg-yellow-100" : ""} 
                      ${item.status === "Shipped" ? "text-blue-600 bg-blue-100" : ""} 
                      ${item.status === "Delivered" ? "text-green-600 bg-green-100" : ""}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden flex flex-col gap-4">
          {cartData.map((item) => (
            <div key={item.id} className="border p-3 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold">{item.price}</span>
                <span
                  className={`px-2 py-1 rounded-md text-sm font-medium 
                    ${item.status === "Pending" ? "text-yellow-600 bg-yellow-100" : ""} 
                    ${item.status === "Shipped" ? "text-blue-600 bg-blue-100" : ""} 
                    ${item.status === "Delivered" ? "text-green-600 bg-green-100" : ""}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
