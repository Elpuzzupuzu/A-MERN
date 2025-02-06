import React, { Fragment } from "react";
import { filterOptions } from "@/config";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      <div className="px-4 py-3">
        <h2 className="text-lg font-bold text-pink-600">Filters</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem} className="px-4 py-3">
            <h3 className="text-sm font-semibold text-pink-600 mb-3">
              {keyItem}
            </h3>
            <div className="space-y-2">
              {filterOptions[keyItem].map(option => (
                <label 
                  key={option.id} 
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={filters?.[keyItem]?.includes(option.id)}
                      onChange={() => handleFilter(keyItem, option.id)}
                      className="w-4 h-4 border-2 rounded border-gray-300 
                        checked:bg-blue-600 checked:border-blue-600
                        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        transition-colors"
                    />
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-pink-600">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;

