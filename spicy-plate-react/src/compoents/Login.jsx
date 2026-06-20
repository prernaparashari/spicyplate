import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      alert("Security Constraint: Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
       const response = await axios.post('https://spicy-plate-backend-api.onrender.com/api/auth/login', {
        userIdentity: email, 
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('isAuthenticated', 'true'); 
        
        alert("Login Successful! Welcome to Spicy Plate 🌶️");
        navigate('/home'); 
      } else {
        alert("Authentication failed: Token not received.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert(error.response?.data?.message || "Invalid Email/Phone or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #501212 0%, #290505 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        background: '#ffffff', 
        padding: '45px 35px', 
        borderRadius: '24px', 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)', 
        maxWidth: '420px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', backgroundColor: '#fff5f5', borderRadius: '50%', marginBottom: '12px' }}>
            <span style={{ fontSize: '28px' }}>🌶️</span>
          </div>
          <h2 style={{ color: '#501212', fontSize: '26px', margin: '0 0 6px 0', fontWeight: '800' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
            Sign in to access your administrative food dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase' }}>Email Address or Phone</label>
            <input 
              type="text" 
              placeholder="name@spicyplate.com or phone" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '15px', color: '#1f2937', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase' }}>Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Min 6 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                style={{ width: '100%', padding: '13px 50px 13px 16px', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '15px', color: '#1f2937', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: loading ? '#a65353' : '#8a1c1c', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '15px', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              marginTop: '8px', 
              boxShadow: '0 4px 12px rgba(138, 28, 28, 0.2)' 
            }}
          >
            {loading ? "Authenticating..." : "Authenticate Account →"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Don't have an operations profile?{' '}
            <span onClick={() => navigate('/signup')} style={{ color: '#8a1c1c', fontWeight: '600', cursor: 'pointer' }}>Create Account</span>
          </p>
        </div>

      </div>
    </div>
  );
}