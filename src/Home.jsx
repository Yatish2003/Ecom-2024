// src/Home.js
import React from 'react';
import "./Home.css"
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to  E-Commerce Store</h1>
      <div className="image-gallery">
        <div className="image-item fade-in">
          <img src="womendress.png" alt="Product 1" />
          <Link to="/products/womens"><h3>Women's</h3></Link>
        </div>
        <div className="image-item fade-in">
          <img src="tshirt.png" alt="Product 2" />
          <Link to="/products/mens"><h3>Men's</h3></Link>
        </div>
        <div className="image-item fade-in">
          <img src="Kidspaijam-removebg-preview.png" alt="Product 3" />
          <Link to="/products/kids"><h3>kid's</h3></Link>
        </div>

      </div>
    </div>
  );
}

export default Home;
