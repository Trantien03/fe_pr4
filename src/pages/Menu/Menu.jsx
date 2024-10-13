import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { getTableFromUrl } from '../../components/Service/TableService';
import FoodItem from "../../components/FoodItem/FoodItem.jsx";
import MenuHeader from './MenuHeader.jsx';
import FoodDetailModal from './FoodDetailModal.jsx';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const Menu = () => {
  const { cartItems, food_list } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State để quản lý trang hiện tại
  const [itemsPerPage] = useState(8); // Số lượng món ăn trên mỗi trang
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tableId, tableName } = getTableFromUrl(searchParams);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const results = food_list.filter(item => {
      const matchesSearchTerm = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || categories.some(category => 
        category.id === selectedCategory && category.dishes.some(dish => dish.id === item.id)
      );
      return matchesSearchTerm && matchesCategory;
    });
    setFilteredFoodList(results);
  }, [searchTerm, food_list, selectedCategory]);

  // Tính toán các món ăn được hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoodList = filteredFoodList.slice(indexOfFirstItem, indexOfLastItem);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

  const openModal = (item) => {
    setSelectedFoodItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFoodItem(null);
  };

  const goToCart = () => {
    const params = new URLSearchParams();
    params.set('table_id', tableId);
    params.set('table_name', tableName);
    navigate(`/cart?${params.toString()}`);
  };

  const totalItems = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  // Hàm để chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Menu Header */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <MenuHeader
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              goHome={() => navigate(`/?table_id=${tableId}&table_name=${tableName}`)}
            />
          </div>

          {/* Dishes List */}
          <div className="w-full md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Danh Sách Món Ăn</h2>
            {currentFoodList.length === 0 ? (
              <p className="text-red-500">Không có món ăn nào trong danh mục này.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentFoodList.map(item => (
                  <div key={item.id} className="mx-1 p-1 transition-transform transform">
                    <FoodItem
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      discount={item.discount}
                      image={item.image}
                      status={item.status}
                      onClick={() => openModal(item)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cart Bar */}
        {totalItems > 0 && (
          <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-orange-600 text-white p-3 rounded-lg shadow-lg flex items-center cursor-pointer" onClick={goToCart}>
            <ShoppingCartCheckoutIcon className="mr-2" />
            <span>Xem giỏ hàng ({totalItems})</span>
            <ArrowForwardOutlinedIcon className="ml-2" />
          </div>
        )}
      </div>

      <FoodDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        foodItem={selectedFoodItem}
      />
    </>
  );
};

export default Menu;
