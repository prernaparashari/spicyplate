import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch('https://spicy-plate-backend-api.onrender.com/api/auth/signup',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: mobile, password }) 
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/otp', { state: { email, mobile } });
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection error. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1.5px solid #e5e7eb',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s'
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #501212 0%, #290505 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', maxWidth: '400px', width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#501212', fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800' }}>Join Spicy Plate 🌶️</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Let's get you started</p>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} style={inputStyle} />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} style={inputStyle} />
          
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
            disabled={loading}
            style={{ ...inputStyle, background: '#fcfcfc', border: '1.5px solid #d1d5db' }} 
          />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} style={inputStyle} />

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '15px', 
              background: loading ? '#a65353' : '#8a1c1c', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '16px', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              marginTop: '10px' 
            }}
          >
            {loading ? "Processing..." : "Create Account →"}
          </button>
        </form>
      </div>
    </div>
  );
}