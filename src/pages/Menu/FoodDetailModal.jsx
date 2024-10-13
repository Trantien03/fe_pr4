import React from 'react';

const FoodDetailModal = ({ isOpen, onClose, foodItem }) => {
  if (!isOpen || !foodItem) return null; // Đảm bảo modal không mở khi không có foodItem

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <button className="absolute top-4 right-4 text-red-500 text-lg" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-2">{foodItem.name}</h2>
        <img 
          src={foodItem.image} 
          alt={foodItem.name} 
          className="w-full h-auto rounded-md mb-4" 
        />
        <p className="text-lg text-gray-700 mb-2">Giá: <span className="font-semibold">{foodItem.price} VND</span></p>
        <p className="text-lg text-gray-700 mb-4">Giảm giá: <span className="font-semibold">{foodItem.discount}%</span></p>
        <p className="text-md text-gray-600 mb-4">Mô tả: {foodItem.description || 'Không có mô tả'}</p>
        {/* Thêm các thông tin khác nếu cần */}
      </div>
    </div>
  );
};

export default FoodDetailModal;
