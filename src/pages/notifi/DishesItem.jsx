import React, { useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext.jsx";

const DishesItem = () => {
    const { url, dishes, fetchDishesByOrderId } = useContext(StoreContext);

    useEffect(() => {
        const orderId = localStorage.getItem("IdOrder");
        if (orderId) {
            console.log(dishes);
            fetchDishesByOrderId(orderId);
        } else {
            console.warn("No order ID found in localStorage.");
        }
    }, []);

    return (
        <>
            {dishes.length > 0 ? (
                dishes.map((item) => (
                    <Card key={item.id} className="flex flex-row items-center p-4 shadow-md mb-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <div className="item-image">
                            <img
                                src={`${url}/images/${item.dish?.image}`}
                                alt={item.dish?.name}
                                className="rounded-full border border-gray-300"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                        </div>
                        <div className="item-info ms-4 flex-grow-1">
                            <div className="item-title text-lg font-semibold">
                                <span className="item-quantity text-red-600">{item.quantity} × </span> {item.dish?.name}
                            </div>
                            <div className="item-price text-gray-600 font-medium">{item.price.toLocaleString()} đ</div>
                        </div>
                    </Card>
                ))
            ) : (
                <div className="text-center text-gray-500">Không có món ăn nào được tìm thấy</div>
            )}
        </>
    );
};

export default DishesItem;
