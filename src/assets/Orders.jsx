import React from 'react'
import './orders.css'

const Orders = () => {
  return (
    <div className="checkout-page mt-10 m-4 pt-14">
    <div className="checkout-container">
      {/* Personal Details and Address */}
      <div className="address-section">
        <h2>PERSONAL DETAILS AND ADDRESS</h2>
        <div className="personal-info">
          <h3>Sudha</h3>
          <p>Email: ksmadhuri736@gmail.com</p>
          <p>Phone: +918712749123</p>
        </div>
        <div className="address-selection">
          
          
          
        </div>
        <button className="add-address-btn">ADD NEW ADDRESS</button>
      </div>

      {/* Order Details */}
      <div className="order-section overflow-y-auto h-80">
        <h2>ORDER DETAILS</h2>
        <div className="order-item">
          <img src=" /iskcon_logo.jpg" alt="Book 1" />
          <p>భగవద్గీత యథార్థము ₹604</p>
        </div>
        <div className="order-item">
          <img src="/iskcon_logo.jpg" alt="Book 2" />
          <p>దేవాది దేవుడు ₹346</p>
        </div>
        <div className="order-item">
          <img src=" /iskcon_logo.jpg" alt="Book 1" />
          <p>భగవద్గీత యథార్థము ₹604</p>
        </div>
        <div className="order-item">
          <img src="/iskcon_logo.jpg" alt="Book 2" />
          <p>దేవాది దేవుడు ₹346</p>
        </div>

        <div className="cost-details">
          <h3>TOTAL COST: ₹950</h3>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Orders