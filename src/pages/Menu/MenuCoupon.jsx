import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuCoupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [coupons, setCoupons] = useState([]); // Danh sách mã giảm giá
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Mã giảm giá đã chọn

  const [startTime] = useState(new Date('2024-10-20T00:00:00'));
  const [endTime] = useState(new Date('2024-10-27T23:59:59'));

  useEffect(() => {
    // Gọi API để lấy tất cả mã giảm giá
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/coupons'); // Đảm bảo rằng đường dẫn này đúng với backend của bạn
        setCoupons(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy mã giảm giá:', error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCouponApply = () => {
    const coupon = coupons.find(c => c.code === couponCode); // Tìm mã giảm giá trong danh sách
    if (coupon) {
      setDiscountMessage(`Giảm giá ${coupon.discount}% cho đơn hàng của bạn!`);
      setSelectedCoupon(coupon); // Lưu mã giảm giá đã chọn
    } else {
      setDiscountMessage('Mã giảm giá không hợp lệ. Vui lòng thử lại.');
      setSelectedCoupon(null);
    }
  };

  const isCouponActive = () => {
    const now = new Date();
    return now >= startTime && now <= endTime;
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold text-center mb-4">Nhập mã giảm giá</h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 border rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Mã giảm giá"
        />
        <button
          onClick={handleCouponApply}
          className="bg-orange-500 text-white rounded-r-md px-2 py-3 hover:bg-orange-600 transition"
          disabled={!isCouponActive()}
        >
          Áp dụng
        </button>
      </div>
      {discountMessage && <p className="text-center mt-2 text-green-600">{discountMessage}</p>}
      
      {/* Hiển thị ảnh mã giảm giá nếu có */}
      {selectedCoupon && (
        <div className="mt-4 text-center">
          <img src={selectedCoupon.imageUrl} alt={`Mã giảm giá: ${selectedCoupon.code}`} className="w-full h-auto mb-2" />
          <p className="text-lg font-semibold">Mã giảm giá: {selectedCoupon.code}</p>
          <p className="text-lg font-semibold">Giảm giá: {selectedCoupon.discount}%</p>
        </div>
      )}

      {/* Hiển thị thời gian hiệu lực của mã giảm giá */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Thời gian bắt đầu: {startTime.toLocaleString()}</p>
        <p className="text-lg font-semibold">Thời gian kết thúc: {endTime.toLocaleString()}</p>
        {!isCouponActive() && <p className="text-red-500 mt-2">Mã giảm giá không còn hiệu lực.</p>}
      </div>
    </div>
  );
};

export default MenuCoupon;
