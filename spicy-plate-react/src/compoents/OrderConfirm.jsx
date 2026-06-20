import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirm() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #501212 0%, #290505 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        background: '#ffffff', 
        padding: '50px 40px', 
        borderRadius: '24px', 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)', 
        maxWidth: '480px', 
        width: '100%', 
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#fee2e2',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 24px auto',
          fontSize: '40px',
          boxShadow: '0 8px 20px rgba(138, 28, 28, 0.15)'
        }}>
          🌶️
        </div>

        <h2 style={{ color: '#501212', fontSize: '28px', margin: '0 0 10px 0', fontWeight: '800' }}>
          Order Confirmed!
        </h2>
        
        <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6', margin: '0 0 30px 0', fontWeight: '500' }}>
          Your delicious meal pipeline has been initialized. Our culinary team is preparing your spicy plate right now!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => navigate('/home')} 
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: '#8a1c1c', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '16px', 
              fontWeight: '600', 
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(138, 28, 28, 0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            Back to Dashboard Menu →
          </button>
        </div>

      </div>
    </div>
  );
}