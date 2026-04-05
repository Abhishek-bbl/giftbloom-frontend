import React, { useState } from 'react';
import '../styles/Delivery.css';
import { FiMapPin, FiPhone, FiUser, FiPlus, FiCheck, FiBell, FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const savedAddresses = [
  { id: 1, tag: 'Home', name: 'Abhishek B', phone: '9876543210', flat: '12A, Sunshine Apartments', area: 'MG Road, Koramangala', city: 'Bangalore', state: 'Karnataka', pincode: '560034' },
  { id: 2, tag: 'Office', name: 'Abhishek B', phone: '9876543210', flat: '4th Floor, Tech Park', area: 'Whitefield', city: 'Bangalore', state: 'Karnataka', pincode: '560066' },
];

const timeSlots = [
  { id: 1, label: 'Morning', time: '9:00 AM – 12:00 PM', icon: '🌅' },
  { id: 2, label: 'Afternoon', time: '12:00 PM – 4:00 PM', icon: '☀️' },
  { id: 3, label: 'Evening', time: '4:00 PM – 8:00 PM', icon: '🌆' },
];

const serviceablePincodes = ['560034', '560066', '560001', '560002', '400001', '400051', '110001', '600001'];

const indianStates = ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Delhi', 'Gujarat', 'Rajasthan', 'West Bengal'];

function Delivery() {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
  const [addingNew, setAddingNew] = useState(false);
  const [deliveryType, setDeliveryType] = useState('standard');
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [surpriseDelivery, setSurpriseDelivery] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [occasionDate, setOccasionDate] = useState('');
  const [reminderTiming, setReminderTiming] = useState('1week');
  const [pincodeStatus, setPincodeStatus] = useState('idle'); // idle | checking | valid | invalid
  const [mapVisible, setMapVisible] = useState(false);
  const navigate = useNavigate();

  // New address form
  const [newAddress, setNewAddress] = useState({
    tag: 'Home', name: '', phone: '', flat: '', area: '', city: '', state: '', pincode: ''
  });

  const checkPincode = (pin) => {
    if (pin.length === 6) {
      setPincodeStatus('checking');
      setTimeout(() => {
        setPincodeStatus(serviceablePincodes.includes(pin) ? 'valid' : 'invalid');
      }, 800);
    } else {
      setPincodeStatus('idle');
    }
  };

  const handleNewAddressChange = (key, value) => {
    setNewAddress(prev => ({ ...prev, [key]: value }));
    if (key === 'pincode') checkPincode(value);
  };

  const saveNewAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.flat || !newAddress.pincode) return;
    setSelectedAddress({ ...newAddress, id: Date.now() });
    setAddingNew(false);
  };

  const getMinDate = () => {
  const date = new Date();
  const daysToAdd = deliveryType === 'express' ? 1 : 3;
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
};
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const basePrice = 599;
  const deliveryCharge = deliveryType === 'express' ? 99 : 0;
  const addonTotal = 0;
  const total = basePrice + deliveryCharge + addonTotal;

  return (
    <div className="delivery-page">

      {/* Header */}
      <div className="delivery-header">
        <p className="section-label">ALMOST THERE</p>
        <h1>Delivery Details</h1>
        <p className="delivery-sub">Tell us where and when to deliver your gift</p>
      </div>

      <div className="delivery-body">

        {/* Left — Main Content */}
        <div className="delivery-main">

          {/* ===== SECTION 1 — ADDRESS ===== */}
          <div className="delivery-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h3>Delivery Address</h3>
            </div>

            {/* Saved Addresses */}
            {!addingNew && (
              <div className="address-list">
                {savedAddresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`address-card ${selectedAddress.id === addr.id ? 'active' : ''}`}
                    onClick={() => setSelectedAddress(addr)}
                  >
                    <div className="address-card-left">
                      <div className={`address-radio ${selectedAddress.id === addr.id ? 'active' : ''}`}>
                        {selectedAddress.id === addr.id && <div className="radio-dot" />}
                      </div>
                      <div className="address-details">
                        <div className="address-tag-row">
                          <span className="address-tag">{addr.tag}</span>
                          <span className="address-name">{addr.name}</span>
                        </div>
                        <p className="address-line">{addr.flat}, {addr.area}</p>
                        <p className="address-line">{addr.city}, {addr.state} — {addr.pincode}</p>
                        <p className="address-phone"><FiPhone size={11} /> {addr.phone}</p>
                      </div>
                    </div>
                    {selectedAddress.id === addr.id && (
                      <div className="address-selected-badge"><FiCheck /> Selected</div>
                    )}
                  </div>
                ))}

                {/* Add New */}
                <button className="add-address-btn" onClick={() => setAddingNew(true)}>
                  <FiPlus /> Add New Address
                </button>
              </div>
            )}

            {/* New Address Form */}
            {addingNew && (
              <div className="new-address-form">
                <div className="form-row">
                  <div className="tag-selector">
                    {['Home', 'Office', 'Other'].map(tag => (
                      <button
                        key={tag}
                        className={`tag-btn ${newAddress.tag === tag ? 'active' : ''}`}
                        onClick={() => handleNewAddressChange('tag', tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-field">
                    <label>Full Name</label>
                    <div className="field-wrap">
                      <FiUser className="field-icon" />
                      <input type="text" placeholder="Recipient's full name" value={newAddress.name} onChange={e => handleNewAddressChange('name', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Phone Number</label>
                    <div className="field-wrap">
                      <FiPhone className="field-icon" />
                      <input type="tel" placeholder="10-digit number" value={newAddress.phone} onChange={e => handleNewAddressChange('phone', e.target.value.replace(/\D/, '').slice(0, 10))} />
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label>Flat / House No., Building Name</label>
                  <input type="text" className="plain-input" placeholder="e.g. 12A, Sunshine Apartments" value={newAddress.flat} onChange={e => handleNewAddressChange('flat', e.target.value)} />
                </div>

                <div className="form-field">
                  <label>Street, Area, Landmark</label>
                  <input type="text" className="plain-input" placeholder="e.g. MG Road, Near Central Mall" value={newAddress.area} onChange={e => handleNewAddressChange('area', e.target.value)} />
                </div>

                <div className="form-row two-col">
                  <div className="form-field">
                    <label>City</label>
                    <input type="text" className="plain-input" placeholder="City" value={newAddress.city} onChange={e => handleNewAddressChange('city', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>State</label>
                    <div className="select-wrap">
                      <select className="plain-select" value={newAddress.state} onChange={e => handleNewAddressChange('state', e.target.value)}>
                        <option value="">Select State</option>
                        {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <FiChevronDown className="select-icon" />
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label>Pincode</label>
                  <div className="pincode-wrap">
                    <input
                      type="text"
                      className="plain-input"
                      placeholder="6-digit pincode"
                      value={newAddress.pincode}
                      maxLength={6}
                      onChange={e => handleNewAddressChange('pincode', e.target.value.replace(/\D/, ''))}
                    />
                    {pincodeStatus === 'checking' && <span className="pincode-status checking">Checking...</span>}
                    {pincodeStatus === 'valid' && <span className="pincode-status valid"><FiCheck /> Delivery available</span>}
                    {pincodeStatus === 'invalid' && <span className="pincode-status invalid"><FiAlertCircle /> Not serviceable</span>}
                  </div>
                </div>

                {/* Map */}
                <div className="map-toggle" onClick={() => setMapVisible(!mapVisible)}>
                  <FiMapPin /> {mapVisible ? 'Hide map' : 'Confirm location on map'}
                </div>
                {mapVisible && (
                  <div className="map-placeholder">
                    <div className="map-inner">
                      <FiMapPin className="map-pin-icon" />
                      <p>Map will load here</p>
                      <span>Google Maps integration in Step 11</span>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setAddingNew(false)}>Cancel</button>
                  <button className="btn-save-address" onClick={saveNewAddress}>Save Address</button>
                </div>
              </div>
            )}
          </div>

          {/* ===== SECTION 2 — DELIVERY DATE & TIME ===== */}
          <div className="delivery-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h3>Delivery Date & Time</h3>
            </div>

            {/* Delivery Type */}
            <div className="delivery-type-row">
              <div
                className={`delivery-type-card ${deliveryType === 'standard' ? 'active' : ''}`}
                onClick={() => { setDeliveryType('standard'); setDeliveryDate(''); }}
              >
                <div className="type-radio">{deliveryType === 'standard' && <div className="radio-dot" />}</div>
                <div>
                  <p className="type-label">Standard Delivery</p>
                  <p className="type-desc">3–5 business days • Free above ₹500</p>
                </div>
                <span className="type-price free">FREE</span>
              </div>
              <div
                className={`delivery-type-card ${deliveryType === 'express' ? 'active' : ''}`}
                onClick={() => { setDeliveryType('express'); setDeliveryDate(''); }}
              >
                <div className="type-radio">{deliveryType === 'express' && <div className="radio-dot" />}</div>
                <div>
                  <p className="type-label">Express Delivery</p>
                  <p className="type-desc">Next business day • Priority handling</p>
                </div>
                <span className="type-price">+₹99</span>
              </div>
            </div>

            {/* Date Picker */}
<div className="form-field" style={{ marginTop: '20px' }}>
  <label>Choose Delivery Date</label>
  <p className="delivery-date-hint">
    {deliveryType === 'express'
      ? '⚡ Express: Available from tomorrow onwards'
      : '📦 Standard: Available from 3 days onwards'}
  </p>
              <input
                type="date"
                className="plain-input date-input"
                min={getMinDate()}
                max={maxDateStr}
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
            />
            </div>

            {/* Time Slots */}
            <div className="form-field" style={{ marginTop: '16px' }}>
              <label>Preferred Time Slot</label>
              <div className="time-slots">
                {timeSlots.map(slot => (
                  <div
                    key={slot.id}
                    className={`time-slot ${selectedSlot.id === slot.id ? 'active' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <span className="slot-icon">{slot.icon}</span>
                    <p className="slot-label">{slot.label}</p>
                    <p className="slot-time">{slot.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== SECTION 3 — GIFT OPTIONS ===== */}
          <div className="delivery-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h3>Gift Options</h3>
            </div>

            {/* Surprise Toggle */}
            <div className="toggle-row">
              <div className="toggle-info">
                <p className="toggle-title">Surprise Delivery</p>
                <p className="toggle-desc">Don't reveal the sender's name to the recipient</p>
              </div>
              <div className={`toggle-switch ${surpriseDelivery ? 'active' : ''}`} onClick={() => setSurpriseDelivery(!surpriseDelivery)}>
                <div className="toggle-thumb" />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="form-field" style={{ marginTop: '20px' }}>
              <label>Special Instructions (Optional)</label>
              <textarea
                className="plain-textarea"
                placeholder="e.g. Please handle with care, Leave at the door, Call before delivery..."
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                maxLength={200}
              />
              <p className="char-count">{specialInstructions.length}/200</p>
            </div>
          </div>

          {/* ===== SECTION 4 — SMART REMINDER ===== */}
          <div className="delivery-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h3>Smart Reminder</h3>
              <span className="section-badge">New</span>
            </div>

            <div className="reminder-box">
              <div className="reminder-icon-wrap">
                <FiBell className="reminder-icon" />
              </div>
              <div className="reminder-content">
                <p className="reminder-title">Never miss this occasion again</p>
                <p className="reminder-desc">We'll remind you next year before this special date so you can send a gift on time</p>
              </div>
              <div className={`toggle-switch ${reminderEnabled ? 'active' : ''}`} onClick={() => setReminderEnabled(!reminderEnabled)}>
                <div className="toggle-thumb" />
              </div>
            </div>

            {reminderEnabled && (
              <div className="reminder-options">
                <div className="form-field">
                  <label>Occasion Date (next year)</label>
                  <input
                    type="date"
                    className="plain-input date-input"
                    value={occasionDate}
                    onChange={e => setOccasionDate(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Remind Me</label>
                  <div className="reminder-timing">
                    {[
                      { value: '1week', label: '1 week before' },
                      { value: '3days', label: '3 days before' },
                      { value: 'both', label: 'Both' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        className={`timing-btn ${reminderTiming === opt.value ? 'active' : ''}`}
                        onClick={() => setReminderTiming(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Proceed Button */}
        <button className="btn-proceed" onClick={() => navigate('/payment')}>
  Proceed to Payment →
</button>

        </div>

        {/* Right — Order Summary */}
        <div className="delivery-summary">
          <p className="filter-label">Order Summary</p>

          {/* Gift Preview */}
          <div className="summary-gift-preview">
            <div className="summary-gift-icon">🎁</div>
            <div className="summary-gift-info">
              <p className="summary-gift-name">Customized Gift</p>
              <p className="summary-gift-template">Classic Elegance Template</p>
            </div>
          </div>

          {/* Delivery Address */}
          {selectedAddress && (
            <div className="summary-address">
              <p className="summary-label">Delivering to</p>
              <div className="summary-address-box">
                <FiMapPin className="summary-map-icon" />
                <div>
                  <p className="summary-address-name">{selectedAddress.name}</p>
                  <p className="summary-address-line">{selectedAddress.flat}</p>
                  <p className="summary-address-line">{selectedAddress.city}, {selectedAddress.pincode}</p>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Info */}
          {deliveryDate && (
            <div className="summary-delivery-info">
              <p className="summary-label">Delivery</p>
              <p className="summary-value">{new Date(deliveryDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              <p className="summary-value">{selectedSlot.label} • {selectedSlot.time}</p>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="summary-price-box">
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
              <span>{deliveryCharge === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryCharge}`}</span>
            </div>
            <div className="summary-price-divider" />
            <div className="summary-price-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="security-badge">
            <span>🔒</span>
            <p>100% secure & encrypted checkout</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Delivery;