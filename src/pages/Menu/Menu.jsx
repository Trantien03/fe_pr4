// Menu.jsx
import React, { useEffect, useState, useContext } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import FoodItem from "../../components/FoodItem/FoodItem.jsx";
import './CartBar.css';
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menu = () => {
  const { cartItems, food_list, } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const navigate = useNavigate();

  // Tìm kiếm món ăn theo từ khóa
  useEffect(() => {
    const results = food_list.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoodList(results);
  }, [searchTerm, food_list]);

  // Tính tổng số sản phẩm trong giỏ hàng
  const totalItems = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  return (
      <div className="food-display">
        <div className="food-display-header">
          <h2>Dishes List</h2>
          <div className="search-bar-container">
            <FaSearch className="search-bar-icon" />
            <input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
          </div>
        </div>
        <div className="food-display-list">
          {filteredFoodList.length === 0 ? (
              <p>No items available in this category.</p>
          ) : (
              filteredFoodList.map(item => (
                  <FoodItem
                      key={item._id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      discount={item.discount}
                      image={item.image}
                      // Không cần truyền addToCart từ props nữa
                  />
              ))
          )}
        </div>
        {totalItems > 0 && (
            <div className="cart-bar" onClick={() => navigate('/cart')}>
              <div className="cart-bar-content">
                <div className="cart-icon">
                  <span role="img" aria-label="cart">🛒</span>
                </div>
                <div className="cart-details">
                  <span>Xem giỏ hàng ({totalItems})</span>
                </div>
                <div className="cart-arrow">
                  <span>➤</span>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Menu;
