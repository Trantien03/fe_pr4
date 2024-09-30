import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import headerImage from '../../assets/home_header.jpg';
import paymentImage from '../../assets/request_payment.svg';
import serviceImage from '../../assets/request_service.svg';
import rateImage from '../../assets/rate.svg';
import menuImage from '../../assets/menu.svg';
import morningIcon from '../../assets/sun.svg';
import afternoonIcon from '../../assets/sun.svg';
import eveningIcon from '../../assets/moon.svg';
import editIcon from '../../assets/edit_pencil.svg';
import { Button, Form, Modal } from "react-bootstrap";
import './CustomModel.css';
import ButtonHome from "./Button";

const Home = () => {
  const [customerName, setCustomerName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState(morningIcon);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setCustomerName(name);
    }

    const fetchTime = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
        const data = await response.json();
        const currentHour = new Date(data.datetime).getHours();

        if (currentHour < 12) {
          setGreeting('Good morning');
          setIcon(morningIcon);
        } else if (currentHour < 18) {
          setGreeting('Good afternoon');
          setIcon(afternoonIcon);
        } else {
          setGreeting('Good evening');
          setIcon(eveningIcon);
        }
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();
  }, []);

  const handleEditClick = () => {
    setNewName(customerName);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setCustomerName(newName);
    localStorage.setItem('username', newName);
    setIsEditing(false);
  };

  const goToMenu = () => {
    navigate('/menu');
  };

  return (
      <>
        <div className="home">
          <div className="banner">
            <img src={headerImage} alt="Banner" className="banner-img" />
          </div>

          <div className="greeting">
          <span className="greeting-text">
            <img src={icon} alt="Greeting Icon" className="greeting-icon" />
            {greeting} <b className="customer-name">&nbsp; {customerName || 'Guest!'}</b>
            <button className="edit-button" onClick={handleEditClick}>
              <img src={editIcon} alt="Edit Icon" />
            </button>
          </span>
            <p>We will return your item to you at the table: <span className="table-number">B18</span></p>

            {isEditing && (
                <div className="edit-name">
                  <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter new name"
                  />
                  <button onClick={handleSaveClick}>Save</button>
                </div>
            )}
          </div>

          <ButtonHome/>

          <div className="menu-section">
            <button className="menu-button" onClick={goToMenu}>
              <img src={menuImage} alt="Menu Icon" />
              View Menu - Order Now
            </button>
          </div>
        </div>
        <Link to={"/notification"} className="notification-icon">
          <img src="src/assets/notification.png" alt="Notification"/>
        </Link>
      </>
  );
};

export default Home;
