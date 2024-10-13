import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeForm = ({ onSubmitName }) => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('VIETNAM');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('paymentMethod', "Cash");
      onSubmitName(name);
    } else {
      alert("Vui lòng nhập tên!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-200 to-orange-400 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <img src="https://o2o.ipos.vn/static/images/icon_staff.svg" alt="Staff Icon" className="w-28 h-28 mb-4 mx-auto" />
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Trà Đá Quán!<br/> Xin kính chào quý khách</h1>
        <p className="text-gray-600 mb-4">Mời bạn nhập tên để nhà hàng phục vụ bạn<br/> nhanh chóng và chính xác hơn!</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200">
            Bắt đầu
          </button>
        </form>
        <div className="mt-4">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out">
            <option value="VIETNAM">VIETNAM</option>
            <option value="ENGLISH">ENGLISH</option>
            <option value="FRANCAIS">FRANCAIS</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WelcomeForm;
