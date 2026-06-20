import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); 
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (name, price) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find(item => item.name === name);
      if (existing) {
        return prevCart.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { name, price, quantity: 1 }];
    });

    setToastMessage(`${name} successfully added to cart!`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const removeFromCart = (name) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find(item => item.name === name);
      if (existing && existing.quantity === 1) {
        return prevCart.filter(item => item.name !== name);
      }
      return prevCart.map(item => item.name === name ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
      
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          backgroundColor: '#fff5f5', 
          color: '#8a1c1c',
          borderLeft: '5px solid #8a1c1c', 
          padding: '16px 28px',
          borderRadius: '8px',
          boxShadow: '0 12px 32px rgba(138, 28, 28, 0.15)',
          zIndex: 999999, 
          fontWeight: '700',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          letterSpacing: '-0.01em',
          animation: 'slideInViewport 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      <style>{`
        @keyframes slideInViewport {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);