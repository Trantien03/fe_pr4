// FoodDetailModal.jsx
import React from 'react';

const FoodDetailModal = ({ isOpen, onClose, foodItem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-700 hover:text-red-600 transition duration-300"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">{foodItem.name}</h2>
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold text-gray-800">Giá: <span className="text-green-500 font-bold">{foodItem.price} VND</span></p>
          <p className="text-lg font-semibold text-gray-800">Giảm giá: <span className="text-red-600 font-bold">{foodItem.discount}%</span></p>
        </div>
        <p className="text-gray-700 mt-2">{foodItem.description}</p> {/* Nếu có trường mô tả trong item */}
      </div>
    </div>
  );
};

export default FoodDetailModal;
