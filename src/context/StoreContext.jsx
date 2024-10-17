import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Thêm import này
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const url = "http://localhost:8080";
    const [food_list, setFoodList] = useState([]);
    const [orderDishes, setOrderDishes] = useState([]);
    const [dishes, setListDishes] = useState([]);

    const fetchDishesByOrderId = async (orderId) => {
        try {
            const response = await axios.get(`${url}/api/v1/order_item/${orderId}`);
            setListDishes(response.data);
            console.log("Fetched dishes list: ", response.data);
        } catch (error) {
            console.error("Error fetching dishes list:", error);
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("IdOrder");
        if (id) {
            fetchDishesByOrderId(id);
        } else {
            console.warn("No order ID found in localStorage.");
        }
    }, []);

    const addToCart = (id) => {
        setCartItems(prevItems => {
            const updatedItems = { ...prevItems, [id]: (prevItems[id] || 0) + 1 };
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => {
            const updatedItems = { ...prevItems };
            delete updatedItems[id];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(prevItems => {
            const updatedItems = { ...prevItems };
            const newQuantity = Math.max(0, quantity);
            if (newQuantity > 0) {
                updatedItems[id] = newQuantity;
            } else {
                delete updatedItems[id];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/dishes`);
            setFoodList(response.data.content);
            console.log("Fetched food list: ", response.data.content);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const removeFromItem = (id) => {
        setCartItems(prevItems => {
            const updatedItems = { ...prevItems };
            if (updatedItems[id] > 1) {
                updatedItems[id] -= 1;
            } else {
                delete updatedItems[id];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
        };
        loadData();
    }, []);

    // Hàm điều hướng đến trang chi tiết sản phẩm
    const viewProductDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        removeFromItem,
        updateQuantity,
        getTotalCartAmount,
        url,
        setFoodList,
        fetchFoodList,
        fetchDishesByOrderId,
        orderDishes,
        dishes,
        viewProductDetails  // Truyền hàm điều hướng vào context
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
