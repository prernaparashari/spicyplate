import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Data extraction from Signup route state passing
  const email = location.state?.email || ''; 
  const mobile = location.state?.mobile || '';

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    
    setLoading(true);

    try {
      // Backend schema payload validation object ('phone' and 'otp')
      const response = await fetch('https://spicy-plate-backend-api.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile, otp }) 
      });

      const data = await response.json();

      // Check for success condition from response status or data status flags
      if (response.ok && (data.success || data.token)) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        localStorage.setItem('isAuthenticated', 'true');
        alert("Verification Successful!");
        navigate('/home'); 
      } else {
        alert(data.message || "Invalid Verification Code.");
      }
    } catch (error) {
      console.error("❌ OTP Error:", error);
      alert("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #501212 0%, #290505 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ background: '#ffffff', padding: '45px 35px', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)', maxWidth: '420px', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
        
        <h2 style={{ color: '#501212', fontSize: '26px', margin: '0 0 6px 0', fontWeight: '800' }}>Verification Checkpoint</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 25px 0' }}>
          Enter the 6-digit code sent to your registered mobile number.
        </p>

        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" 
            maxLength="6"
            placeholder="000000" 
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            required
            disabled={loading}
            style={{ width: '100%', padding: '14px 0', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '24px', fontWeight: '700', letterSpacing: '8px', textAlign: 'center', backgroundColor: '#f9fafb', outline: 'none' }}
          />

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#8a1c1c', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {loading ? (
              <>
                <div style={{ width: '18px', height: '18px', border: '3px solid #ffffff', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1.5s linear infinite' }} />
                <span>Verifying...</span>
              </>
            ) : "Verify & Enter System →"}
          </button>
        </form>

        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}