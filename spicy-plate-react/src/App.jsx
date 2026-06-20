import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// this is my correct path
import Signup from "./compoents/signup";
import OtpVerify from "./compoents/OtpVerify";
import IndexPage from "./compoents/IndexPage";
import Login from "./compoents/Login";
import Cart from "./compoents/Cart";
import OrderConfirm from './compoents/OrderConfirm';
import Menus from "./compoents/Menus";
import ProtectedRoute from "./compoents/ProtectedRoute";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Access Endpoints */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />

          {/* Secure Protected Subsystems */}
          <Route path="/home" element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          } />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          {/* Post-Transaction Confirmation Landing */}
          <Route path="/order-confirm" element={
            <ProtectedRoute>
              <OrderConfirm />
            </ProtectedRoute>
          } />
          
          <Route path="/menu/veg" element={
            <ProtectedRoute>
              <Menus type="veg" />
            </ProtectedRoute>
          } />
          
          <Route path="/menu/nonveg" element={
            <ProtectedRoute>
              <Menus type="nonveg" />
            </ProtectedRoute>
          } />
          
          <Route path="/menu/fastfood" element={
            <ProtectedRoute>
              <Menus type="fastfood" />
            </ProtectedRoute>
          } />
          
          <Route path="/menu/sweet" element={
            <ProtectedRoute>
              <Menus type="sweet" />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;