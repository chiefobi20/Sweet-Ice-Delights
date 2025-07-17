import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, cancelOrder } from '../services/api';

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelling(true);
    try {
      await cancelOrder(orderId);
      setOrder({ ...order, status: 'cancelled' });
    } catch (err) {
      setError('Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details">
      <div className="order-header">
        <h2>Order #{order.id}</h2>
        <span className={`status ${order.status}`}>{order.status}</span>
      </div>

      <div className="order-info">
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${(order.total_cents / 100).toFixed(2)}</p>
      </div>

      <div className="order-items">
        <h3>Items</h3>
        {order.order_items?.map(item => (
          <div key={item.id} className="order-item-detail">
            <span className="item-name">{item.flavor?.name || 'Unknown Flavor'}</span>
            <span className="item-quantity">Qty: {item.quantity}</span>
            <span className="item-price">${(item.price_cents / 100).toFixed(2)} each</span>
            <span className="item-total">${((item.price_cents * item.quantity) / 100).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="order-actions">
        {order.status === 'pending' && (
          <button 
            onClick={handleCancel} 
            disabled={cancelling}
            className="cancel-btn"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
        <button onClick={() => navigate('/orders')} className="back-btn">
          Back to Orders
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;