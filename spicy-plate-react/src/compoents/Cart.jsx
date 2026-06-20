import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemTotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = itemTotal > 0 ? 40 : 0;
  const totalAmount = itemTotal + deliveryFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    setLoading(true);

    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch('https://spicy-plate-backend-api.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : ''
        },
        body: JSON.stringify({
          items: cartItems,
          total: totalAmount,
          paymentMethod: 'COD'
        })
      });

      if (response.status === 401 || response.status === 403) {
        setLoading(false);
        navigate('/signup');
        return;
      }

      clearCart();
      navigate('/order-confirm');

    } catch (error) {
      clearCart();
      navigate('/order-confirm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button onClick={() => navigate('/home')} style={{ background: '#8a1c1c', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            ← Back to Menu
          </button>
          <h2 style={{ color: '#501212', margin: 0, fontWeight: '800' }}>🛒 Your Food Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', background: '#fff', padding: '50px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '18px', color: '#6b7280', margin: '0 0 20px 0' }}>Your plate is empty right now.</p>
            <button onClick={() => navigate('/home')} style={{ background: '#8a1c1c', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Browse Delicious Food</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', color: '#1f2937', fontSize: '18px', fontWeight: '700' }}>{item.name}</h4>
                    <span style={{ color: '#8a1c1c', fontWeight: '700' }}>₹{item.price} x {item.quantity || 1}</span>
                  </div>
                  
                  <button onClick={() => removeFromCart(item.name)} style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', height: 'fit-content' }}>
              <h3 style={{ color: '#501212', margin: '0 0 20px 0', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px', fontSize: '20px', fontWeight: '800' }}>Bill Details</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '15px' }}>
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '15px' }}>
                  <span>Delivery Partner Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1f2937', fontSize: '18px', fontWeight: '800' }}>
                  <span>To Pay</span>
                  <span style={{ color: '#8a1c1c' }}>₹{totalAmount}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout} 
                disabled={loading}
                style={{ width: '100%', padding: '14px', background: '#8a1c1c', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(138, 28, 28, 0.2)' }}
              >
                {loading ? (
                  <>
                    <div style={{ width: '18px', height: '18px', border: '3px solid #ffffff', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <span>Processing Order...</span>
                  </>
                ) : "Proceed to Checkout 🚀"}
              </button>
            </div>

          </div>
        )}

        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}