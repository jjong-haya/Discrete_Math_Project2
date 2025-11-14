import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className='content-container'>
        <div className='content'>
          <div className="home-title">Report 2</div>
          <div className="home-subtitle">20221234 함종하</div>
          <div className="home-button-container">
            <button className="start-button" onClick={() => navigate('/input')}>
              나의 행렬 계산하기
            </button>
            <button className="start-button" onClick={() => navigate('/random-problem')}>
              무작위 행렬 문제 풀기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;