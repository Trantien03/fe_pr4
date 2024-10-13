import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    // State để quản lý phương thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán.");
            return;
        }

        setIsProcessing(true); // Hiển thị trạng thái đang xử lý thanh toán

        // Gửi yêu cầu xác nhận thanh toán với phương thức thanh toán đã chọn
        const response = await axios.post(url + "/api/order/verify", {
            success,
            orderId,
            paymentMethod, // Thêm phương thức thanh toán vào request
        });

        setIsProcessing(false);

        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="verify flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-center text-2xl font-bold mb-6 text-orange-600">Chọn phương thức thanh toán</h2>

                {/* Lựa chọn phương thức thanh toán */}
                <div className="payment-options space-y-4 mb-6">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={handlePaymentMethodChange}
                            className="form-radio h-5 w-5 text-orange-600"
                        />
                        <span className="ml-2 text-gray-700">Thanh toán bằng tiền mặt</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="bank_transfer"
                            checked={paymentMethod === "bank_transfer"}
                            onChange={handlePaymentMethodChange}
                            className="form-radio h-5 w-5 text-orange-600"
                        />
                        <span className="ml-2 text-gray-700">Chuyển khoản ngân hàng</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="credit_card"
                            checked={paymentMethod === "credit_card"}
                            onChange={handlePaymentMethodChange}
                            className="form-radio h-5 w-5 text-orange-600"
                        />
                        <span className="ml-2 text-gray-700">Thanh toán bằng thẻ ngân hàng</span>
                    </label>
                </div>

                {/* Nút xác nhận thanh toán */}
                <div className="text-center">
                    <button
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ${
                            isProcessing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handlePayment}
                        disabled={isProcessing} // Vô hiệu hóa khi đang xử lý
                    >
                        {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verify;
