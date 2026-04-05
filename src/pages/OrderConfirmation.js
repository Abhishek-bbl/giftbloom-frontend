import React, { useEffect, useState } from 'react';
import '../styles/OrderConfirmation.css';
import { FiCheck, FiPackage, FiMapPin, FiClock, FiBell, FiShare2, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, label: 'Order Placed', icon: <FiCheck />, done: true },
  { id: 2, label: 'Being Prepared', icon: <FiPackage />, done: false },
  { id: 3, label: 'Out for Delivery', icon: <FiMapPin />, done: false },
  { id: 4, label: 'Delivered', icon: <FiHome />, done: false },
];

function OrderConfirmation() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const orderId = 'GB' + Math.floor(100000 + Math.random() * 900000);
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 4);
  const dateStr = estimatedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="confirmation-page">

      {/* Success Hero */}
      <div className={`confirmation-hero ${animate ? 'animate' : ''}`}>
        <div className="success-circle">
          <div className="success-ring r1" />
          <div className="success-ring r2" />
          <div className="success-ring r3" />
          <div className="success-icon">
            <FiCheck />
          </div>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Your gift is on its way to bring a smile 🌸</p>
        <div className="order-id-badge">
          Order ID: <strong>{orderId}</strong>
        </div>
      </div>

      <div className="confirmation-body">

        {/* Left Panel */}
        <div className="confirmation-main">

          {/* Order Tracking */}
          <div className="confirmation-section">
            <h3>Order Status</h3>
            <div className="tracking-steps">
              {steps.map((step, i) => (
                <div key={step.id} className="tracking-step">
                  <div className="tracking-left">
                    <div className={`tracking-icon ${step.done ? 'done' : ''} ${i === 0 ? 'active' : ''}`}>
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`tracking-line ${step.done ? 'done' : ''}`} />
                    )}
                  </div>
                  <div className="tracking-info">
                    <p className={`tracking-label ${step.done ? 'done' : ''} ${i === 0 ? 'active' : ''}`}>
                      {step.label}
                    </p>
                    {i === 0 && <span className="tracking-time">Just now</span>}
                    {i === 3 && <span className="tracking-time">Expected by {dateStr}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gift Summary */}
          <div className="confirmation-section">
            <h3>Gift Summary</h3>
            <div className="gift-summary-card">
              <div className="gift-summary-icon">🎁</div>
              <div className="gift-summary-info">
                <p className="gift-summary-name">Customized Gift</p>
                <p className="gift-summary-template">Classic Elegance Template</p>
                <p className="gift-summary-message">"Wishing you a wonderful day!"</p>
              </div>
              <div className="gift-summary-price">₹599</div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="confirmation-section">
            <h3>Delivery Details</h3>
            <div className="delivery-details-card">
              <div className="delivery-detail-row">
                <FiMapPin className="detail-icon" />
                <div>
                  <p className="detail-label">Delivering to</p>
                  <p className="detail-value">Abhishek B, 12A Sunshine Apartments</p>
                  <p className="detail-value">Bangalore, Karnataka — 560034</p>
                </div>
              </div>
              <div className="delivery-detail-row">
                <FiClock className="detail-icon" />
                <div>
                  <p className="detail-label">Expected Delivery</p>
                  <p className="detail-value">{dateStr}</p>
                  <p className="detail-value">Morning Slot — 9:00 AM to 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Reminder Confirmation */}
          <div className="confirmation-section reminder-confirmation">
            <div className="reminder-conf-icon">
              <FiBell />
            </div>
            <div className="reminder-conf-content">
              <h4>Smart Reminder Set! 🔔</h4>
              <p>We'll remind you 1 week before this occasion next year so you never miss it again.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="confirmation-actions">
            <button className="btn-track" onClick={() => navigate('/dashboard')}>
              <FiPackage /> Track Order
            </button>
            <button className="btn-share" onClick={() => {
  if (navigator.share) {
    navigator.share({
      title: 'A gift is on its way!',
      text: `Someone special sent you a gift from Giftbloom! Order #${orderId}`,
      url: window.location.origin,
    });
  } else {
    navigator.clipboard.writeText(`Someone special sent you a gift from Giftbloom! Order #${orderId} - ${window.location.origin}`);
    alert('Share link copied to clipboard!');
  }
}}>
  <FiShare2 /> Share with Recipient
</button>
            <button className="btn-home" onClick={() => navigate('/')}>
              <FiHome /> Back to Home
            </button>
          </div>

        </div>

        {/* Right Panel */}
        <div className="confirmation-summary">

          <div className="conf-summary-card">
            <p className="conf-summary-title">Payment Summary</p>
            <div className="conf-price-row">
              <span>Gift Base Price</span>
              <span>₹599</span>
            </div>
            <div className="conf-price-row">
              <span>Add-ons</span>
              <span>₹0</span>
            </div>
            <div className="conf-price-row">
              <span>Delivery</span>
              <span className="free-tag">FREE</span>
            </div>
            <div className="conf-price-divider" />
            <div className="conf-price-row total">
              <span>Total Paid</span>
              <span>₹599</span>
            </div>
            <div className="conf-payment-method">
              <p>Paid via UPI</p>
            </div>
          </div>

          <div className="conf-summary-card">
            <p className="conf-summary-title">Need Help?</p>
            <div className="help-options">
  <button className="help-btn" onClick={() => window.open('tel:+919876543210')}>Call Support</button>
  <button className="help-btn" onClick={() => navigate('/about')}>Chat with Us</button>
  <button className="help-btn" onClick={() => window.open('mailto:hello@giftbloom.in')}>Email Support</button>
</div>
          </div>

          <div className="conf-summary-card referral-card">
            <p className="referral-title">🎁 Share Giftbloom</p>
            <p className="referral-desc">Share with friends and get ₹100 off your next order!</p>
            <button className="referral-btn">Copy Referral Link</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;