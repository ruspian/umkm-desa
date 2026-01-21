"use client";

import { KategoriIcon, KategoriType } from "@/types/category";
import React from "react";

interface CategoryFilterProps {
  selectedCategory: KategoriType;
  onSelectCategory: (category: KategoriType) => void;
}

const KategoriFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-6 no-scrollbar">
      {KategoriIcon.map((category) => {
        const IconComponent = category.icon; // ambil iconnya
        return (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all flex gap-2 items-center justify-center
            ${
              selectedCategory === category.name
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <IconComponent
              size={18}
              strokeWidth={selectedCategory === category.name ? 2.5 : 2}
            />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default KategoriFilter;
