import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import './i18n/i18n';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';
import WelcomeForm from './pages/Welcome/WelcomeForm';
import Menu from './pages/Menu/Menu';
import FoodItem from './components/FoodItem/FoodItem';
import Notification from "./pages/notifi/Notification.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState(null);

  // Kiểm tra localStorage để xem tên người dùng đã được lưu chưa
  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Hàm này sẽ được gọi khi người dùng nhập tên vào WelcomeForm
  const handleNameSubmit = (name) => {
    localStorage.setItem('username', name);
    setUserName(name); // Cập nhật state để hiển thị trang chính
  };

  return (
    <>
      {!userName ? (
        <WelcomeForm onSubmitName={handleNameSubmit} />
      ) : (
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/category/:id" element={<FoodDisplay />} />
            <Route path="/notification" element={<Notification/>}/>
          </Routes>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default App;
