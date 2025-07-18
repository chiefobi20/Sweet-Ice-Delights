import { useCart, useCartDispatch } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();

  const removeFromCart = (id) => {
    dispatch({
      type: 'removed',
      id: id
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    dispatch({
      type: 'quantity_changed',
      id: id,
      quantity: quantity
    });
  };

  const clearCart = () => {
    dispatch({ type: 'cleared' });
  };

  const total = cart.reduce((sum, item) =>
    sum + (item.price_cents * item.quantity), 0
  );

  return (
    <div className="cart">
      <div className="page-header">
        <h2>Your Cart ({cart.length} items)</h2>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Cart is empty</p>
          <Link to="/flavors" className="browse-flavors-btn">Browse Flavors</Link>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h4>{item.name}</h4>
              <p>${(item.price_cents / 100).toFixed(2)} each</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>Qty: {item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${(total / 100).toFixed(2)}</h3>
            <div className="cart-actions">
              <button onClick={clearCart}>Clear Cart</button>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
