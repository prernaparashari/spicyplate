import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menus from './Menus';

function IndexPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Session parse error");
      }
    }
  }, []);

    if (selectedCategory) {
    return (
      <Menus 
        type={selectedCategory} 
        user={currentUser} 
        onBack={() => setSelectedCategory(null)} 
      />
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ===== EXACT BROWNISH/RED NAVBAR ===== */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 40px', 
        background: '#8a1c1c', 
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/images/logo.jpeg" alt="Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>Spicy Plate</div>
        </div>
        
        <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0, alignItems: 'center' }}>
          <li><Link to="/home" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Home</Link></li>
          <li><span onClick={() => setSelectedCategory('veg')} style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}>Menu</span></li>
          <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Cart</Link></li>
          <li><Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Login</Link></li>
        </ul>
      </nav>

      {/* ===== EXACT MAIN BODY CONTAINER ===== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        
        {/* "🌶️ Our Categories" Heading */}
        <h2 style={{ color: '#501212', fontSize: '32px', fontWeight: '700', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🌶️ Our Categories
        </h2>

        {/* ===== EXACT 4 VERTICAL CARDS ROW ===== */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', maxWidth: '1200px', width: '100%' }}>
          
          {/* Veg Card */}
          <div onClick={() => setSelectedCategory('veg')} style={styles.verticalCard}>
            <div style={styles.imgContainer}>
              <img src="/images/veg logo.jpg" alt="Veg" style={styles.cardImg} />
            </div>
            <div style={styles.cardText}>Veg</div>
          </div>

          {/* Non Veg Card */}
          <div onClick={() => setSelectedCategory('nonveg')} style={styles.verticalCard}>
            <div style={styles.imgContainer}>
              <img src="/images/nonveg logo.jpg" alt="Non Veg" style={styles.cardImg} />
            </div>
            <div style={styles.cardText}>Non Veg</div>
          </div>

          {/* Sweet Card */}
          <div onClick={() => setSelectedCategory('sweet')} style={styles.verticalCard}>
            <div style={styles.imgContainer}>
              <img src="/images/sweet logo.jpg" alt="Sweet" style={styles.cardImg} />
            </div>
            <div style={styles.cardText}>Sweet</div>
          </div>

          {/* Fast Food Card */}
          <div onClick={() => setSelectedCategory('fastfood')} style={styles.verticalCard}>
            <div style={styles.imgContainer}>
              <img src="/images/fastfood logo.jpg" alt="Fast Food" style={styles.cardImg} />
            </div>
            <div style={styles.cardText}>Fast Food</div>
          </div>

        </div>
      </div>

      {/* ===== EXACT NAVBAR COLOR FOOTER ===== */}
      <footer style={{ background: '#8a1c1c', color: '#ffcccc', textAlign: 'center', padding: '15px', fontSize: '14px', fontWeight: '500', letterSpacing: '0.3px' }}>
        © 2026 Spicy Plate — Hot • Fresh • Fast Delivery
      </footer>
    </div>
  );
}

const styles = {
  verticalCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    width: '180px',
    height: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, boxShadow 0.2s ease',
    border: '1px solid #eaeaea'
  },
  imgContainer: {
    width: '100%',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '12px'
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' 
  },
  cardText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginTop: '10px'
  }
};

export default IndexPage;