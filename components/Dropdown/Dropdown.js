import React, { useState , useEffect } from "react";





const DropdownMenu = () => {
  const [products, setProducts] = useState([]);
   
  
    useEffect(() => {
      fetch("api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="w-full text-white p-2 border border-gray-300 rounded-md md:w-64 bg-gray-900"
    >
      <option value="">Бүгд</option>
      {products.map((category) => (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
