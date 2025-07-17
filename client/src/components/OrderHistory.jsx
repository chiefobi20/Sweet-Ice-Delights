import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../services/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-history">
      <div className="page-header">
        <Link to="/" className="back-home-btn">← Home</Link>
        <h2>Your Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/flavors" className="browse-flavors-btn">Browse Flavors</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>

              <div className="order-details">
                <p>Total: ${(order.total_cents / 100).toFixed(2)}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Items: {order.order_items?.length || 0}</p>
              </div>

              <Link to={`/orders/${order.id}`} className="view-order-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
