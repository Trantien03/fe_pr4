import paymentImage from "../../assets/request_payment.svg";
import {Button, Form, Modal} from "react-bootstrap";
import serviceImage from "../../assets/request_service.svg";
import rateImage from "../../assets/rate.svg";
import React, {useState} from "react";
import './CustomModel.css';
import './Home.css';
const ButtonHome=()=>{

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedbackReasons, setFeedbackReasons] = useState([]);
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');

    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleFeedbackReason = (reason) => {
        setFeedbackReasons(prev =>
            prev.includes(reason)
                ? prev.filter(r => r !== reason)
                : [...prev, reason]
        );
    };

    const handleSubmit = () => {
        console.log({
            rating,
            feedbackReasons,
            phone,
            comment,
        });
        handleClose();
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false)};

    const handleSubmitPayment = () => {
        if (selectedPayment) {
            localStorage.setItem('paymentMethod', selectedPayment);

            setShowPaymentModal(false);
        } else {
            alert('Vui lòng chọn một phương thức thanh toán trước khi gửi.');
        }
    };
    const handleShowPaymentModal = () => setShowPaymentModal(true);

    const handleCloseServiceModal = () => setShowServiceModal(false);
    const handleShowServiceModal = () => setShowServiceModal(true);

    return(
        <>
            <div className="actions">
                <div className="action-item">
                    <button className="action-button" onClick={handleShowPaymentModal}>
                        <img src={paymentImage} alt="Payment Icon" className="action-icon" />
                        <span className="action-text">Request Bill</span>
                    </button>
                </div>

                <Modal show={showPaymentModal} onHide={handleClosePaymentModal} dialogClassName="custom-payment-modal">
                    <Modal.Header >
                        <Modal.Title>Gọi thanh toán</Modal.Title>
                        <div className="title">
                            <p>Bạn muốn thanh toán bằng ?</p>
                        </div>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <div
                                className={`payment-option ${selectedPayment === 'Cash' ? 'selected' : ''}`}
                                onClick={() => setSelectedPayment('Cash')}
                            >
                                <Form.Check
                                    type="radio"
                                    label="Tiền mặt"
                                    name="payment"
                                    value="Cash"
                                    checked={selectedPayment === 'Cash'}
                                    onChange={handlePaymentChange}
                                />
                            </div>

                            <div
                                className={`payment-option ${selectedPayment === 'CreditCard' ? 'selected' : ''}`}
                                onClick={() => setSelectedPayment('CreditCard')}
                            >
                                <Form.Check
                                    type="radio"
                                    label="Thẻ ngân hàng"
                                    name="payment"
                                    value="CreditCard"
                                    checked={selectedPayment === 'CreditCard'}
                                    onChange={handlePaymentChange}
                                />
                            </div>

                            <div
                                className={`payment-option ${selectedPayment === 'MobilePayment' ? 'selected' : ''}`}
                                onClick={() => setSelectedPayment('MobilePayment')}
                            >
                                <Form.Check
                                    type="radio"
                                    label="Ứng dụng điện thoại"
                                    name="payment"
                                    value="MobilePayment"
                                    checked={selectedPayment === 'MobilePayment'}
                                    onChange={handlePaymentChange}
                                />
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="submit-button" onClick={handleSubmitPayment}>
                            Gửi yêu cầu
                        </Button>
                    </Modal.Footer>
                </Modal>

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

                        <input className="form-control" type="text" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="submit-button" onClick={handleCloseServiceModal}>
                            Gửi yêu cầu
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="action-item">
                    <button className="action-button" onClick={handleShow}>
                    <img src={rateImage} alt="Rate Icon" className="action-icon" />
                        <span className="action-text">Give feedback</span>
                    </button>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Trải nghiệm của bạn hôm nay thế nào?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    style={{ cursor: 'pointer',
                                        fontSize: '40px',
                                        padding:'10px',
                                        color: star <= rating ? 'orange' : 'gray' }}
                                >
          ★
        </span>
                            ))}
                        </div>

                        {/* Hiển thị phản hồi dựa trên đánh giá */}
                        <p>{rating === 1 ? 'Rất thất vọng' : ''}</p>
                        <p>{rating === 2 ? 'Thất vọng' : ''}</p>
                        <p>{rating === 3 ? 'Tạm ổn' : ''}</p>
                        <p>{rating === 4 ? 'Hài Lòng' : ''}</p>
                        <p>{rating === 5 ? 'Quá tuyệt vời' : ''}</p>

                        {/* Chỉ hiển thị phần lý do chưa hài lòng nếu đánh giá không phải 5 */}
                        {rating !== 5 && (
                            <Form.Group>
                                <Form.Label>Bạn có điều gì chưa hài lòng phải không?</Form.Label>
                                <div className="feedback-reasons">
                                    {[
                                        'Vệ sinh không sạch sẽ',
                                        'Nhân viên không nhiệt tình',
                                        'Món ăn không ngon',
                                        'Món ăn phục vụ lâu',
                                        'Giá không phù hợp với chất lượng',
                                        'Không gian bất tiện',
                                        'Không gian ồn'
                                    ].map((reason) => (
                                        <Button
                                            key={reason}
                                            variant={feedbackReasons.includes(reason) ? 'primary' : 'outline-secondary'}
                                            onClick={() => handleFeedbackReason(reason)}
                                            style={{ margin: '5px' }}
                                        >
                                            {reason}
                                        </Button>
                                    ))}
                                </div>
                            </Form.Group>
                        )}

                        <Form.Group controlId="formPhone">
                            <Form.Label>Số điện thoại của bạn</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formComment">
                            <Form.Label>Chia sẻ thêm về trải nghiệm của bạn</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Chia sẻ cho nhà hàng trải nghiệm của bạn nhé"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Gửi đánh giá
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </>
    )
}
export default ButtonHome;