import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();
const CartDispatchContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }
  return context;
};

function cartReducer(cart, action) {
  switch (action.type) {
    case 'added': {
      const existingItem = cart.find(item => item.id === action.item.id);
      if (existingItem) {
        return cart.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cart, { ...action.item, quantity: 1 }];
    }
    case 'removed': {
      return cart.filter(item => item.id !== action.id);
    }
    case 'updated': {
      return cart.map(item =>
        item.id === action.id
          ? { ...item, quantity: action.quantity }
          : item
      );
    }
    case 'cleared': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: 'added', item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'removed', id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'updated', id, quantity });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'cleared' });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
