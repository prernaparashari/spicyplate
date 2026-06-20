import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', background: '#b30000', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src="/images/logo.jpeg" alt="Logo" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ fontSize: '26px', fontWeight: 'bold', fontFamily: 'Pacifico, sans-serif' }}>Spicy Plate</div>
      </div>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '30px', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link to="/home" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Home</Link></li>
        <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Cart ({totalItems})</Link></li>
        <li><Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;