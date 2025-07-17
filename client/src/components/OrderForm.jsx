import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart, useCartDispatch } from '../context/CartContext';
import { createOrder } from '../services/api';

function OrderForm() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price_cents * item.quantity), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (cart.length === 0) {
      setError('Cart is empty');
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        total_cents: total,
        items: cart.map(item => ({
          flavor_id: item.id,
          quantity: item.quantity,
          price_cents: item.price_cents
        }))
      };

      const response = await createOrder(orderData);

      // Clear cart after successful order
      dispatch({ type: 'cleared' });

      // Show success message
      setOrderSuccess(true);

    } catch (err) {
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="order-form">
        <div className="success-message">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for your order. We'll have your delicious Italian ice ready soon!</p>
          <div className="success-actions">
            <Link to="/" className="home-btn">Return to Home</Link>
            <Link to="/orders" className="orders-btn">View My Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="order-form">
        <h2>Your cart is empty</h2>
        <p>Add some flavors to your cart before placing an order.</p>
        <Link to="/" className="home-btn">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="order-form">
      <div className="page-header">
        <Link to="/" className="back-home-btn">← Home</Link>
        <h2>Review Your Order</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="order-summary">
        {cart.map(item => (
          <div key={item.id} className="order-item">
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">Qty: {item.quantity}</span>
            <span className="item-price">${((item.price_cents * item.quantity) / 100).toFixed(2)}</span>
          </div>
        ))}

        <div className="order-total">
          <strong>Total: ${(total / 100).toFixed(2)}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <button type="submit" disabled={loading} className="place-order-btn">
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
