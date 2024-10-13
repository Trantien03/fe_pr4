import { Button, Modal } from "react-bootstrap";
import serviceImage from "../../../assets/request_service.svg";
import React, { useState } from "react";
import '../CustomModel.css';
import '../Home.css';

const ServiceRequest = () => {
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [description, setDescription] = useState(""); // State cho mô tả yêu cầu
    const [error, setError] = useState(""); // State cho thông báo lỗi

    const handleCloseServiceModal = () => {
        setShowServiceModal(false);
        setDescription("");
        setError("");
    };

    const handleShowServiceModal = () => {
        setShowServiceModal(true);
    };

    // Hàm gửi yêu cầu
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/notifications/1", { // Thay đổi endpoint nếu cần
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }), // Gửi mô tả yêu cầu
            });

            if (!response.ok) {
                throw new Error("Gửi yêu cầu thất bại");
            }

            const data = await response.json();
            console.log(data); // Xử lý phản hồi thành công
            handleCloseServiceModal(); // Đóng modal sau khi gửi yêu cầu
        } catch (error) {
            setError(error.message); // Hiển thị thông báo lỗi
        }
    };

    return (
        <>
            <div className="action-item">
                <button className="action-button" onClick={handleShowServiceModal}>
                    <img src={serviceImage} alt="Waiter Icon" className="action-icon" />
                    <span className="action-text">Ask for service</span>
                </button>
            </div>

            <Modal show={showServiceModal} onHide={handleCloseServiceModal} dialogClassName="custom-service-modal">
                <Modal.Header>
                    <Modal.Title>Gọi nhân viên</Modal.Title>
                    <div className="title">
                        <p>Bạn muốn yêu cầu nhân viên làm gì?</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className="form-control"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Mô tả yêu cầu của bạn"
                    />
                    {error && <div className="error-message">{error}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="submit-button" onClick={handleSubmit}>
                        Gửi yêu cầu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ServiceRequest;
