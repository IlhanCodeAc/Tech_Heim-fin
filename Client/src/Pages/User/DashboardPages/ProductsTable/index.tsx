import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import productService from "../../../../services/product";
import { Product } from "../../../../types";
import axiosInstance from "../../../../services/axiosInstance";
import ProductDialog from "./CreateProduct";
import ProductFormDialog from "./CreateProduct";
import YourDialogComponent from "./CreateProduct";

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control ProductDialog visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        setProducts(response.data.items); // Assuming 'items' holds the products
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await axiosInstance.delete(`/Product/${selectedProduct._id}`);
        setProducts(products.filter((p) => p._id !== selectedProduct._id));
        setShowModal(false);
        setSelectedProduct(null);
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true); // Open the dialog when creating a new product
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border border-[#F6F6F6] bg-[#F9F9F9] rounded-lg p-5 w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">All Products</h2>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between mb-4">
        <div className="flex justify-between mb-4">
  <button onClick={openDialog} className="px-4 py-2 bg-blue-500 text-white rounded-md">
    Create Product
  </button>
  <ProductDialog open={isDialogOpen} onClose={closeDialog} />
</div>

        </div>

        <table className="w-full border-collapse min-w-[600px] md:table hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3 flex items-center gap-3 min-w-[150px]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span className="truncate">{product.name}</span>
                </td>
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
            <div key={product._id} className="border p-3 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
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
