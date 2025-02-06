import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  image: string;
  name: string;
  details: string;
  price: string;
}

const productData: Product[] = [
  {
    id: 1,
    image: "/path/to/image1.jpg",
    name: "Product 1",
    details: "Description of product 1",
    price: "$120",
  },
  {
    id: 2,
    image: "/path/to/image2.jpg",
    name: "Product 2",
    details: "Description of product 2",
    price: "$85",
  },
  {
    id: 3,
    image: "/path/to/image3.jpg",
    name: "Product 3",
    details: "Description of product 3",
    price: "$150",
  },
];

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="border border-[#F6F6F6] bg-[#F9F9F9] rounded-lg p-5 w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">All Products</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px] md:table hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Details</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3 flex items-center gap-3 min-w-[150px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span className="truncate">{product.name}</span>
                </td>
                <td className="p-3 min-w-[200px] truncate">{product.details}</td>
                <td className="p-3 font-semibold min-w-[100px]">{product.price}</td>
                <td className="p-3 min-w-[100px]">
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden flex flex-col gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-3 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.details}</p>
                  <span className="font-semibold block mt-2">{product.price}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(product)}
                className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
              >
                <Trash2 size={20} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete {selectedProduct?.name}?</p>
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="px-4 py-2 border rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
