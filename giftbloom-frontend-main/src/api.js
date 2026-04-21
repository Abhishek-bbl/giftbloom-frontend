const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('giftbloom_token');

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();
  return data;
};

export const api = {
  // Auth
  signup: (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  getProfile: () => request('/auth/profile'),
  updateProfile: (data) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Products
  getProducts: (params = {}) => request('/products?' + new URLSearchParams(params).toString()),
  getProduct: (id) => request(`/products/${id}`),

  // Cart
  getCart: () => request('/cart'),
  addToCart: (data) => request('/cart/add', { method: 'POST', body: JSON.stringify(data) }),
  updateCart: (data) => request('/cart/update', { method: 'PUT', body: JSON.stringify(data) }),
  removeFromCart: (id) => request(`/cart/remove/${id}`, { method: 'DELETE' }),
  clearCart: () => request('/cart/clear', { method: 'DELETE' }),

  // Orders
  createOrder: (data) => request('/orders/create', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => request('/orders'),
  getOrder: (id) => request(`/orders/${id}`),

  // Addresses
  getAddresses: () => request('/addresses'),
  addAddress: (data) => request('/addresses/add', { method: 'POST', body: JSON.stringify(data) }),
  updateAddress: (id, data) => request(`/addresses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAddress: (id) => request(`/addresses/${id}`, { method: 'DELETE' }),

  // Wishlist
  getWishlist: () => request('/wishlist'),
  checkWishlist: () => request('/wishlist/check'),
  addToWishlist: (product_id) => request('/wishlist/add', { method: 'POST', body: JSON.stringify({ product_id }) }),
  removeFromWishlist: (id) => request(`/wishlist/remove/${id}`, { method: 'DELETE' }),

  // Reminders
  getReminders: () => request('/reminders'),
  addReminder: (data) => request('/reminders/add', { method: 'POST', body: JSON.stringify(data) }),
  deleteReminder: (id) => request(`/reminders/${id}`, { method: 'DELETE' }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markAsRead: (id) => request(`/notifications/mark-read/${id}`, { method: 'PUT' }),
  markAllRead: () => request('/notifications/mark-all-read', { method: 'PUT' }),
  deleteNotification: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),

  // Payments
createPaymentOrder: (amount, order_db_id) => request('/payments/create-order', {
  method: 'POST',
  body: JSON.stringify({ amount, order_db_id })
}),
verifyPayment: (data) => request('/payments/verify', {
  method: 'POST',
  body: JSON.stringify(data)
}),
  validateCoupon: (code, amount) => request('/payments/validate-coupon', { method: 'POST', body: JSON.stringify({ code, order_amount: amount }) }),
};

export default api;