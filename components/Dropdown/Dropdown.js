import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DropdownMenu = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

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

  const handleCategoryChange = (e) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);

    if (categorySlug) {
      router.push(`${categorySlug}`);
    } else {
      router.push("/");
    }
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="w-full text-white p-2 border border-gray-300 rounded-md md:w-64 bg-gray-900"
    >
      <option value="">Бүгд</option>
      {products.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
