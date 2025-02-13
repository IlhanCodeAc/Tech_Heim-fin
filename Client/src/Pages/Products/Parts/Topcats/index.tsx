// import React, { useState } from "react";
// import { Input } from "../../../../Components/components/ui/input";
// import { useSearchParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import productService from "../../../../services/product";

// const ProductSearch = () => {
//   const [search, setSearch] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();

//   const searchQuery = searchParams.get("name") || "";

//   const { data: products = [], isLoading, error } = useQuery({
//     queryKey: ["products", searchQuery],
//     queryFn: async () => {
//       if (!searchQuery) return [];
//       const response = await productService.getAll({}, `name=${searchQuery}`);
//       return response.data;
//     },
//   });

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     setSearchParams({ name: value });
//   };

//   return (
//     <div>
//       <Input
//         type="text"
//         placeholder="Search for products..."
//         value={search}
//         onChange={handleSearch}
//         className="mb-[40px]"
//       />
//       <div>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error fetching products</p>
//         ) : products.length > 0 ? (
//           <ul>
//             {products.map((product) => (
//               <li key={product.id}>{product.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductSearch;
