const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('giftbloom_token');

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

// ===== AUTH =====
export const api = {
  // Auth
  signup: (data) => fetch(`${BASE_URL}/auth/signup`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  login: (data) => fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  forgotPassword: (email) => fetch(`${BASE_URL}/auth/forgot-password`, { method: 'POST', headers: headers(), body: JSON.stringify({ email }) }).then(r => r.json()),
  getProfile: () => fetch(`${BASE_URL}/auth/profile`, { headers: headers() }).then(r => r.json()),
  updateProfile: (data) => fetch(`${BASE_URL}/auth/profile`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/products?${query}`).then(r => r.json());
  },
  getProduct: (id) => fetch(`${BASE_URL}/products/${id}`).then(r => r.json()),

  // Cart
  getCart: () => fetch(`${BASE_URL}/cart`, { headers: headers() }).then(r => r.json()),
  addToCart: (data) => fetch(`${BASE_URL}/cart/add`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  updateCart: (data) => fetch(`${BASE_URL}/cart/update`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  removeFromCart: (id) => fetch(`${BASE_URL}/cart/remove/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),
  clearCart: () => fetch(`${BASE_URL}/cart/clear`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Orders
  createOrder: (data) => fetch(`${BASE_URL}/orders/create`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  getOrders: () => fetch(`${BASE_URL}/orders`, { headers: headers() }).then(r => r.json()),
  getOrder: (id) => fetch(`${BASE_URL}/orders/${id}`, { headers: headers() }).then(r => r.json()),

  // Addresses
  getAddresses: () => fetch(`${BASE_URL}/addresses`, { headers: headers() }).then(r => r.json()),
  addAddress: (data) => fetch(`${BASE_URL}/addresses/add`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  updateAddress: (id, data) => fetch(`${BASE_URL}/addresses/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  deleteAddress: (id) => fetch(`${BASE_URL}/addresses/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Wishlist
  getWishlist: () => fetch(`${BASE_URL}/wishlist`, { headers: headers() }).then(r => r.json()),
  addToWishlist: (product_id) => fetch(`${BASE_URL}/wishlist/add`, { method: 'POST', headers: headers(), body: JSON.stringify({ product_id }) }).then(r => r.json()),
  removeFromWishlist: (id) => fetch(`${BASE_URL}/wishlist/remove/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Reminders
  getReminders: () => fetch(`${BASE_URL}/reminders`, { headers: headers() }).then(r => r.json()),
  addReminder: (data) => fetch(`${BASE_URL}/reminders/add`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  deleteReminder: (id) => fetch(`${BASE_URL}/reminders/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Notifications
  getNotifications: () => fetch(`${BASE_URL}/notifications`, { headers: headers() }).then(r => r.json()),
  markAsRead: (id) => fetch(`${BASE_URL}/notifications/mark-read/${id}`, { method: 'PUT', headers: headers() }).then(r => r.json()),
  markAllRead: () => fetch(`${BASE_URL}/notifications/mark-all-read`, { method: 'PUT', headers: headers() }).then(r => r.json()),
  deleteNotification: (id) => fetch(`${BASE_URL}/notifications/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Payments
  createPaymentOrder: (amount) => fetch(`${BASE_URL}/payments/create-order`, { method: 'POST', headers: headers(), body: JSON.stringify({ amount }) }).then(r => r.json()),
  verifyPayment: (data) => fetch(`${BASE_URL}/payments/verify`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  validateCoupon: (code, amount) => fetch(`${BASE_URL}/payments/validate-coupon`, { method: 'POST', headers: headers(), body: JSON.stringify({ code, order_amount: amount }) }).then(r => r.json()),
};