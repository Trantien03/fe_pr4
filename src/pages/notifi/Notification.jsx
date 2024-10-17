import CustomNavbar from "./Navbar";
import DishesItem from "./DishesItem.jsx";
import Verify from "../Verify/Verify.jsx";
import { useState } from "react";

const Notification = () => {
    const [isPaid, setIsPaid] = useState(false); // Quản lý trạng thái thanh toán

    return (
        <>
            <CustomNavbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-orange-600">Thông báo đơn hàng</h1>
                
                {/* Sử dụng Flexbox, thay đổi layout trên màn hình nhỏ */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4">
                    
                    {/* Phần món ăn, chiếm toàn bộ chiều rộng trên điện thoại */}
                    <div className="w-full md:w-1/2">
                        <DishesItem />
                    </div>

                    {/* Phần xác nhận thanh toán, chiếm toàn bộ chiều rộng trên điện thoại */}
                    <div className="w-full md:w-1/2">
                        <div className="text-center">
                            {isPaid ? (
                                <p className="text-green-600 font-bold">Đã thanh toán</p>
                            ) : (
                                <Verify />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
