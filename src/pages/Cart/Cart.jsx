import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; 
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Swal from "sweetalert2";
import { getTableFromUrl } from '../../components/Service/TableService'; 

const Cart = () => {
    const { cartItems, setCartItems, food_list, updateQuantity, removeFromCart, url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const { tableId, tableName } = getTableFromUrl(searchParams);

    const totalOriginalPrice = food_list.reduce((total, item) => {
        const quantity = cartItems[item.id] || 0;
        return total + (item.price * quantity);
    }, 0);

    const totalAmount = food_list.reduce((total, item) => {
        const quantity = cartItems[item.id] || 0;
        const discount = item.discount ? parseFloat(item.discount) : 0;
        const discountedPrice = item.price * (1 - (discount / 100));
        return total + (discountedPrice * quantity);
    }, 0);

    const totalDiscount = totalOriginalPrice - totalAmount;

    const handleSendOrderRequest = async () => {
        try {
            const orderRequest = {
                customer: localStorage.getItem('username'),
                originalPrice: totalOriginalPrice,
                coupon: "10%",
                orderItems: Object.keys(cartItems).map(itemId => ({
                    dish_id: itemId,
                    quantity: cartItems[itemId],
                })),
                createAt: new Date().toISOString(),
                status: "Pending",
                payment: localStorage.getItem('paymentMethod')
            };

            if (Object.keys(cartItems).length > 0) {
                const response = await axios.post(`http://localhost:8080/api/v1/orders/${tableId}`, orderRequest);
                if (response.status === 200) {
                    console.log("Order created successfully!", response.data);
                    localStorage.setItem('IdOrder', response.data.id);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Đã gửi yêu cầu đến đầu bếp!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.removeItem('cartItems');
                    setCartItems({});  // Reset giỏ hàng
                    navigate(`/?table_id=${tableId}&table_name=${tableName}`);
                } else {
                    console.error("Error creating order: ", response);
                    alert("Có lỗi xảy ra khi tạo đơn hàng.");
                }
            } else {
                alert("Vui lòng chọn món!");
            }
        } catch (error) {
            console.error("Error while sending order request: ", error);
            alert("Có lỗi xảy ra khi gửi yêu cầu tạo đơn hàng.");
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen">
            <Navbar />
            {Object.keys(cartItems).length > 0 ? (
                <div className="container mx-auto p-4">
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        {/* List of Cart Items */}
                        <div className="bg-white shadow-lg rounded-lg p-6 lg:w-2/3">
                            <div className="cart-items">
                                <div className="grid grid-cols-7 text-center font-bold text-gray-600">
                                    <div>Items</div>
                                    <div>Title</div>
                                    <div>Price</div>
                                    <div>Discount</div>
                                    <div>Quantity</div>
                                    <div>Total</div>
                                    <div>Remove</div>
                                </div>
                                <hr />
                                {food_list.map((item) => {
                                    const quantity = cartItems[item.id] || 0;
                                    if (quantity > 0) {
                                        const discount = item.discount ? parseFloat(item.discount) : 0;
                                        const discountedPrice = item.price * (1 - (discount / 100));
                                        return (
                                            <div key={item._id} className="grid grid-cols-7 items-center text-center py-4 border-b">
                                                <div>
                                                    <img src={`${url}/images/${item.image}`} alt={item.name} className="w-16 h-16 object-cover mx-auto" />
                                                </div>
                                                <div>{item.name}</div>
                                                <div>${item.price.toFixed(2)}</div>
                                                <div>{discount > 0 ? `${discount}%` : 'No discount'}</div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                                                        className="w-16 text-center border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>${(discountedPrice * quantity).toFixed(2)}</div>
                                                <div>
                                                    <button onClick={() => removeFromCart(item.id)} className='text-red-500 hover:text-red-700'>x</button>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>

                        {/* Cart Totals */}
                        <div className="mt-6 lg:mt-0 bg-white shadow-lg rounded-lg p-6 lg:w-1/3">
                            <h2 className="text-lg font-semibold">Cart Totals</h2>
                            <div className="flex justify-between mt-4">
                                <p>Subtotal (Original Price):</p>
                                <p>${totalOriginalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Total Discount:</p>
                                <p>-${totalDiscount.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Subtotal (Discounted Price):</p>
                                <p>${totalAmount.toFixed(2)}</p>
                            </div>
                            
                            <hr className="my-4" />
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${totalAmount === 0 ? 0 : totalAmount.toFixed(2)}</span>
                            </div>
                            <button className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300" onClick={handleSendOrderRequest}>
                                SEND ORDER REQUEST
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen bg-orange-50">
                    <img src="/src/assets/cart_empty.jpg" alt="Empty Cart" className="w-1/3 mb-4" />
                    <p className="text-gray-600 text-lg mb-4">Vui lòng chọn đồ ăn!</p>
                    <Link to={`/menu?table_id=${tableId}&table_name=${tableName}`} className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
                        Đi đến Menu
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Cart;
