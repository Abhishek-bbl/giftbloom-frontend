import React, { useState } from 'react';
import '../styles/Payment.css';
import { FiCreditCard, FiSmartphone, FiGlobe, FiShoppingBag, FiTag, FiCheck, FiLock, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: <FiSmartphone /> },
  { id: 'card', label: 'Credit / Debit Card', icon: <FiCreditCard /> },
  { id: 'netbanking', label: 'Net Banking', icon: <FiGlobe /> },
  { id: 'wallet', label: 'Wallets', icon: <FiShoppingBag /> },
];

const banks = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank',
];

const wallets = [
  { id: 'paytm', name: 'Paytm', color: '#00BAF2' },
  { id: 'phonepe', name: 'PhonePe', color: '#5F259F' },
  { id: 'amazonpay', name: 'Amazon Pay', color: '#FF9900' },
  { id: 'mobikwik', name: 'MobiKwik', color: '#1B5299' },
];

const upiApps = [
  { id: 'gpay', name: 'Google Pay' },
  { id: 'phonepe', name: 'PhonePe' },
  { id: 'paytm', name: 'Paytm' },
  { id: 'other', name: 'Other UPI' },
];

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState('gpay');
  const [upiMode, setUpiMode] = useState('id'); // id | qr
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [placing, setPlacing] = useState(false);

  const basePrice = 599;
  const addonTotal = 0;
  const deliveryCharge = 0;
  const discount = couponApplied ? 60 : 0;
  const total = basePrice + addonTotal + deliveryCharge - discount;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === 'BLOOM10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 2000);
  };

  const getCardType = () => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'VISA';
    if (num.startsWith('5')) return 'MC';
    if (num.startsWith('6')) return 'RuPay';
    return '';
  };

  return (
    <div className="payment-page">

      {/* Header */}
      <div className="payment-header">
        <p className="section-label">FINAL STEP</p>
        <h1>Payment</h1>
        <p className="payment-sub">Choose your preferred payment method</p>
      </div>

      <div className="payment-body">

        {/* Left — Payment Methods */}
        <div className="payment-main">

          {/* Method Tabs */}
          <div className="payment-methods">
            {paymentMethods.map(m => (
              <button
                key={m.id}
                className={`method-tab ${selectedMethod === m.id ? 'active' : ''}`}
                onClick={() => setSelectedMethod(m.id)}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Payment Panel */}
          <div className="payment-panel">

            {/* ===== UPI ===== */}
            {selectedMethod === 'upi' && (
              <div className="payment-section">
                <h3>Pay via UPI</h3>
                <p className="payment-section-sub">Fast, secure and instant payment</p>

                {/* UPI Mode Toggle */}
                <div className="upi-mode-toggle">
                  <button
                    className={`upi-mode-btn ${upiMode === 'id' ? 'active' : ''}`}
                    onClick={() => setUpiMode('id')}
                  >
                    Enter UPI ID
                  </button>
                  <button
                    className={`upi-mode-btn ${upiMode === 'qr' ? 'active' : ''}`}
                    onClick={() => setUpiMode('qr')}
                  >
                    Scan QR Code
                  </button>
                </div>

                {upiMode === 'id' && (
                  <>
                    {/* UPI Apps */}
                    <div className="upi-apps">
                      {upiApps.map(app => (
                        <div
                          key={app.id}
                          className={`upi-app ${upiApp === app.id ? 'active' : ''}`}
                          onClick={() => setUpiApp(app.id)}
                        >
                          <div className="upi-app-icon">
                            {app.name.charAt(0)}
                          </div>
                          <p>{app.name}</p>
                        </div>
                      ))}
                    </div>

                    {/* UPI ID Input */}
                    <div className="payment-field">
                      <label>UPI ID</label>
                      <div className="payment-input-wrap">
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                        />
                        {upiId.includes('@') && (
                          <span className="upi-verified"><FiCheck /> Valid</span>
                        )}
                      </div>
                      <p className="field-hint">e.g. 9876543210@paytm, name@okicici</p>
                    </div>
                  </>
                )}

                {upiMode === 'qr' && (
                  <div className="qr-section">
                    <div className="qr-placeholder">
                      <div className="qr-inner">
                        <div className="qr-grid">
                          {[...Array(25)].map((_, i) => (
                            <div key={i} className={`qr-cell ${Math.random() > 0.5 ? 'filled' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <p>Scan with any UPI app</p>
                      <span>Valid for 10 minutes</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===== CARD ===== */}
            {selectedMethod === 'card' && (
              <div className="payment-section">
                <h3>Credit / Debit Card</h3>
                <p className="payment-section-sub">All major cards accepted</p>

                {/* Live Card Preview */}
                <div className="card-preview">
                  <div className="card-preview-inner">
                    <div className="card-chip" />
                    <p className="card-preview-number">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </p>
                    <div className="card-preview-bottom">
                      <div>
                        <p className="card-preview-label">Card Holder</p>
                        <p className="card-preview-value">{cardName || 'YOUR NAME'}</p>
                      </div>
                      <div>
                        <p className="card-preview-label">Expires</p>
                        <p className="card-preview-value">{cardExpiry || 'MM/YY'}</p>
                      </div>
                      <div className="card-type-badge">{getCardType()}</div>
                    </div>
                  </div>
                </div>

                {/* Card Fields */}
                <div className="payment-field">
                  <label>Card Number</label>
                  <div className="payment-input-wrap">
                    <FiCreditCard className="payment-input-icon" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="payment-field">
                  <label>Name on Card</label>
                  <div className="payment-input-wrap">
                    <input
                      type="text"
                      placeholder="As printed on card"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                <div className="card-row">
                  <div className="payment-field">
                    <label>Expiry Date</label>
                    <div className="payment-input-wrap">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                  </div>
                  <div className="payment-field">
                    <label>CVV</label>
                    <div className="payment-input-wrap">
                      <input
                        type={showCvv ? 'text' : 'password'}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/, '').slice(0, 4))}
                        maxLength={4}
                      />
                      <button className="cvv-toggle" onClick={() => setShowCvv(!showCvv)}>
                        {showCvv ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <p className="field-hint">3 digits on back of card</p>
                  </div>
                </div>
              </div>
            )}

            {/* ===== NET BANKING ===== */}
            {selectedMethod === 'netbanking' && (
              <div className="payment-section">
                <h3>Net Banking</h3>
                <p className="payment-section-sub">Select your bank to proceed</p>

                <div className="bank-grid">
                  {banks.map(bank => (
                    <div
                      key={bank}
                      className={`bank-card ${selectedBank === bank ? 'active' : ''}`}
                      onClick={() => setSelectedBank(bank)}
                    >
                      <div className="bank-icon">{bank.charAt(0)}</div>
                      <p>{bank}</p>
                      {selectedBank === bank && <FiCheck className="bank-check" />}
                    </div>
                  ))}
                </div>

                <div className="payment-field" style={{ marginTop: '20px' }}>
                  <label>Or search your bank</label>
                  <div className="select-wrap">
                    <select
                      className="plain-select"
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                    >
                      <option value="">All Banks</option>
                      {banks.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <FiChevronDown className="select-icon" />
                  </div>
                </div>
              </div>
            )}

            {/* ===== WALLETS ===== */}
            {selectedMethod === 'wallet' && (
              <div className="payment-section">
                <h3>Pay via Wallet</h3>
                <p className="payment-section-sub">Use your digital wallet balance</p>

                <div className="wallet-list">
                  {wallets.map(w => (
                    <div
                      key={w.id}
                      className={`wallet-card ${selectedWallet === w.id ? 'active' : ''}`}
                      onClick={() => setSelectedWallet(w.id)}
                    >
                      <div className="wallet-radio">
                        {selectedWallet === w.id && <div className="radio-dot" />}
                      </div>
                      <div className="wallet-icon" style={{ backgroundColor: w.color + '20', color: w.color }}>
                        {w.name.charAt(0)}
                      </div>
                      <p className="wallet-name">{w.name}</p>
                      {selectedWallet === w.id && (
                        <span className="wallet-selected"><FiCheck /> Selected</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Coupon Code */}
          <div className="coupon-section">
            <div className="coupon-header">
              <FiTag className="coupon-icon" />
              <p>Have a coupon code?</p>
            </div>
            <div className="coupon-input-row">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponError(''); setCouponApplied(false); }}
                className="coupon-input"
                disabled={couponApplied}
              />
              <button
                className={`coupon-btn ${couponApplied ? 'applied' : ''}`}
                onClick={handleCoupon}
                disabled={couponApplied}
              >
                {couponApplied ? <><FiCheck /> Applied</> : 'Apply'}
              </button>
            </div>
            {couponError && <p className="coupon-error">{couponError}</p>}
            {couponApplied && <p className="coupon-success"><FiCheck /> ₹60 discount applied! Code: BLOOM10</p>}
            <p className="coupon-hint">Try code: <strong>BLOOM10</strong> for 10% off</p>
          </div>

          {/* Place Order Button */}
          <button
            className={`btn-place-order ${placing ? 'loading' : ''}`}
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? (
              <span className="placing-text">
                <span className="placing-dots">Processing</span>
              </span>
            ) : (
              <>
                <FiLock />
                Pay ₹{total} Securely
              </>
            )}
          </button>

          <p className="payment-security-note">
            🔒 Your payment is 256-bit SSL encrypted and 100% secure
          </p>

        </div>

        {/* Right — Order Summary */}
        <div className="payment-summary">
          <p className="filter-label">Order Summary</p>

          {/* Gift */}
          <div className="summary-card">
            <div className="summary-gift-row">
              <div className="summary-gift-emoji">🎁</div>
              <div>
                <p className="summary-gift-name">Customized Gift</p>
                <p className="summary-gift-template">Classic Elegance Template</p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="summary-card">
            <div className="summary-price-row">
              <span>Gift Base Price</span>
              <span>₹{basePrice}</span>
            </div>
            <div className="summary-price-row">
              <span>Add-ons</span>
              <span>₹{addonTotal}</span>
            </div>
            <div className="summary-price-row">
              <span>Delivery</span>
              <span className="free-label">FREE</span>
            </div>
            {couponApplied && (
              <div className="summary-price-row discount">
                <span>Discount (BLOOM10)</span>
                <span>− ₹{discount}</span>
              </div>
            )}
            <div className="summary-divider" />
            <div className="summary-price-row total">
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="summary-card">
            <p className="summary-info-label">Delivering to</p>
            <p className="summary-info-value">Bangalore, Karnataka — 560034</p>
            <p className="summary-info-label" style={{ marginTop: '12px' }}>Estimated Delivery</p>
            <p className="summary-info-value">3–5 business days</p>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            {[
              { icon: '🔒', text: 'Secure Payment' },
              { icon: '↩️', text: 'Easy Returns' },
              { icon: '📦', text: 'Safe Packaging' },
            ].map((b, i) => (
              <div key={i} className="trust-badge">
                <span>{b.icon}</span>
                <p>{b.text}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Payment;