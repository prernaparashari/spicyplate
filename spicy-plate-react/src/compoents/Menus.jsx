import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const menuData = {
  veg: {
    title: "veg menu",
    items: [
      { name: "Paneer Butter Masala", price: 220, img: "The Best Paneer Butter Masala Recipe Ever!.jpg" },
      { name: "Dal Tadka", price: 150, img: "Moong Dal Tadka is a nutritious, flavourful Indian lentil dish with a fragrant spice tempering, perfect for everyday meals_.jpg" },
      { name: "Veg Biryani", price: 200, img: "Vegetable Dum Biryani (In oven).jpg" },
      { name: "sahi paneer", price: 180, img: "Sahi Panner.jpg" },
      { name: "Chole Bhature", price: 170, img: "download (8).jpg" },
      { name: "Aloo Gobi", price: 140, img: "Aloo Gobi - Instant Pot & Stovetop.jpg" },
      { name: "Palak Paneer", price: 210, img: "Palak Paneer.jpg" },
      { name: "Mix Veg", price: 160, img: "Indian Mixed Veg Recipe.jpg" }
    ]
  },
  nonveg: {
    title: "nonveg menu",
    items: [
      { name: "Chicken Curry", price: 250, img: "Chicken Chettinad Curry.jpg" },
      { name: "Chicken Biryani", price: 300, img: "Irresistible Chicken Biryani Recipe_ A Flavorful Delight.jpg" },
      { name: "Fish Fry", price: 280, img: "Kerala Fish Fry _ The Take It Easy Chef.jpg" },
      { name: "Mutton", price: 180, img: "Kosha mangsho mutton.jpg" },
      { name: "Butter chicken", price: 180, img: "Restaurant Style Butter Chicken Masala (Murgh Makhani).jpg" },
      { name: "Tandoori chicken", price: 180, img: "Tandoori Chicken - Savory&SweetFood.jpg" }
    ]
  },
  fastfood: {
    title: "fastfood menu",
    items: [
      { name: "Burger", price: 120, img: "Hambúrguer De Queijo Delicioso E Irritadiço PNG , Hambúrguer, Comida, Comida Rápida PNG Imagem para download gratuito.jpg" },
      { name: "Pizza", price: 250, img: "pizza.jpg" },
      { name: "Fries", price: 90, img: "Crispy french fries on a plate isolated in a white background _ Premium AI-generated image.jpg" },
      { name: "Sandwich", price: 110, img: "Cheesy Garlic Bread Toast.jpg" },
      { name: "Momos", price: 130, img: "Easy Chicken Momo Dumplings (Sajilo Kukhura ko Momo) सजिलो कुखुराको म_म_.jpg" }
    ]
  },
  sweet: {
    title: "sweetdish menu",
    items: [
      { name: "Gulab Jamun", price: 100, img: "how-to-create-new-colour-9539269_1280.jpg" },
      { name: "Rasgulla", price: 120, img: "Rasgulla - Bengali Sweet.jpg" },
      { name: "Kaju Katli", price: 200, img: "Kaju katli (cashew fudge)😋😍.jpg" },
      { name: "kulfi", price: 150, img: "Kulfi.jpg" }
    ]
  }
};

export default function Menus({ type, user, onBack }) {
  const currentMenu = menuData[type] || menuData.veg;
  const { addToCart } = useCart();
  
  // Premium UI State for Toast Notification
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (name, price) => {
    addToCart(name, price);
    
   
    // Automatically dismiss toast after 2.5 seconds
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '120px', position: 'relative' }}>
      
      {/* ===== NAVBAR SECTION ===== */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 40px', 
        background: '#8a1c1c', 
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={onBack} 
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
          >
            ← Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/images/logo.jpeg" alt="Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ fontSize: '24px', fontWeight: '700' }}>Spicy Plate</div>
          </div>
        </div>
        
        <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0, alignItems: 'center' }}>
          <li><span onClick={onBack} style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}>Home</span></li>
          <li><span style={{ color: 'white', textDecoration: 'underline', fontWeight: '600', fontSize: '15px' }}>Menu</span></li>
          <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Cart</Link></li>
          <li><span style={{ fontSize: '14px', fontWeight: '500', color: '#ffcccc' }}>Hi, {user?.name || 'User'} 👋</span></li>
        </ul>
      </nav>

      {/* ===== HEADING ===== */}
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        <h2 style={{ color: '#501212', fontSize: '32px', fontWeight: '700' }}>
          🌶️ Our Categories
        </h2>
      </div>

      {/* ===== VERTICAL DISH CARDS GRID SECTION ===== */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', maxWidth: '1200px', margin: '30px auto 0 auto', padding: '0 20px' }}>
        {currentMenu.items.map((item, idx) => (
          <div key={idx} style={styles.dishCard}>
            
            {/* Image Box */}
            <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '12px', marginBottom: '12px' }}>
              <img src={`/images/${item.img}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src="https://placehold.co/220x140?text=Spicy+Plate"; }} />
            </div>

            {/* Info */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', margin: '5px 0', color: '#222', fontWeight: '600' }}>{item.name}</h3>
              <p style={{ fontWeight: '700', color: '#b30000', margin: '5px 0 15px 0', fontSize: '18px' }}>₹{item.price}</p>
            </div>

            {/* Button */}
            <button 
              onClick={() => handleAddToCart(item.name, item.price)} 
              style={{ background: '#b30000', color: 'white', border: 'none', padding: '11px 0', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', width: '100%', fontSize: '14px', transition: 'transform 0.1s' }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Add To Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {/* ===== 🌟 PREMIUM UI TOAST NOTIFICATION LAYER ===== */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#2e7d32', // Premium Green Success Theme
          color: 'white',
          padding: '14px 28px',
          borderRadius: '30px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          zIndex: 9999,
          fontSize: '15px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          {toastMessage}
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#8a1c1c', color: '#ffcccc', textAlign: 'center', padding: '15px', fontSize: '14px', fontWeight: '500', position: 'fixed', bottom: 0, width: '100%', boxSizing: 'border-box', zIndex: 10 }}>
        © 2026 Spicy Plate — Hot • Fresh • Fast Delivery
      </footer>

      {/* Toast Animation Style injection */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

    </div>
  );
}

const styles = {
  dishCard: {
    background: 'white',
    width: '220px',
    padding: '16px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #eaeaea'
  }
};