import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { getFoodDetail } from './apiService'; // Import API service for fetching food details

const FoodDetailModal = ({ isOpen, onClose, foodId }) => {
  const [foodItem, setFoodItem] = useState(null); // State to hold the food item details

  useEffect(() => {
    if (isOpen && foodId) {
      // Fetch food details when modal is open and foodId is provided
      getFoodDetail(foodId).then(data => setFoodItem(data));
    }
  }, [isOpen, foodId]);

  if (!isOpen || !foodItem) return null; // Don't render if modal is closed or foodItem is null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
        {/* Close modal button */}
        <button
          className="absolute top-2 right-2 text-gray-800 dark:text-gray-50"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {/* Display food item details */}
        <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
          <div>
            <img
              className="object-cover h-64 w-full"
              src={`http://localhost:8080/public/img/${foodItem.image}`} // Image URL from backend
              alt={foodItem.name}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 px-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">{foodItem.name}</h2>
            <span className="font-normal text-gray-600 dark:text-gray-300">{foodItem.description || 'No description available'}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-50">${foodItem.price}</span>
          </div>

          <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
            <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50">
              <span className="text-base">Add to Cart</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FoodDetailModal;
