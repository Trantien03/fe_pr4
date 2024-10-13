import CustomNavbar from "./Navbar";
import DishesItem from "./DishesItem.jsx";

const Notification = () => {
    return (
        <>
            <CustomNavbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Thông báo đơn hàng</h1>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <DishesItem />
                </div>
            </div>
        </>
    );
};

export default Notification;
