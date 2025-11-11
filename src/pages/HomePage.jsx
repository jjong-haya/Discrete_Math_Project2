// src/pages/HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate(); 

  const handleStart = () => {
    navigate('/input');
  };

  return (
    <div className="home-container">
      <div className='content-container'>
        <div className='content'>
      <h1 className="home-title">Report 2</h1>
      <h2 className="home-subtitle">20221234 함종하</h2>
      <button className="start-button" onClick={handleStart}>
        시작하기
      </button>
      </div>
    </div>
    </div>
  );
}

export default HomePage;