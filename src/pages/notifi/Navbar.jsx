import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; 
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext.jsx';
import { getTableFromUrl } from '../../components/Service/TableService';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const CustomNavbar = () => {
    const { url } = useContext(StoreContext);
    const [orderStatus, setOrderStatus] = useState('');
    const [status, setStatus] = useState('');
    const [searchParams] = useSearchParams();
    const { tableId, tableName } = getTableFromUrl(searchParams);
    const navigate = useNavigate();

    // Fetch order status by orderId
    const fetchOrderStatusById = async (orderId) => {
        try {
            const response = await axios.get(`${url}/api/v1/orders/${orderId}`);
            setOrderStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching order status:', error);
        }
    };

    useEffect(() => {
        const orderId = localStorage.getItem('IdOrder');
        if (orderId) {
            fetchOrderStatusById(orderId);
        } else {
            console.warn('No order ID found in localStorage.');
        }
    }, []);

    const checkStatus = () => {
        if (orderStatus === "Paid") {
            setStatus("Đã thanh toán");
        } else if (orderStatus === "Pending") {
            setStatus("Đang chờ");
        } else {
            setStatus("Trạng thái không xác định");
        }
    };

    useEffect(() => {
        if (orderStatus) {
            checkStatus();
        }
    }, [orderStatus]);

    return (
        <Navbar className="bg-white shadow-md" expand="lg">
            <Container>
                <Navbar.Brand className="flex flex-col items-start">
                    <div className="flex items-center">
                        <Link to={`/?table_id=${tableId}&table_name=${tableName}`} className="flex items-center text-orange-500 hover:text-orange-600 transition-colors">
                            <HomeRoundedIcon/>
                        </Link>
                        <span className="ml-3 text-lg font-semibold">
                            Các món đã gọi (
                            <span
                                className={`font-bold ${status === "Đã thanh toán" ? "text-green-600" : status === "Đang chờ" ? "text-orange-600" : "text-red-600"}`}
                            >
                                {status}
                            </span>
                            )
                        </span>
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
