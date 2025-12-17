import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signupPage';
import Header from './components/Header';
import Products from './components/Products';
import Footer from './components/Footer';
import CartPage from './pages/addToCartPage';
import AdminDashboard from './pages/AdminPages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route has Header */}
        <Route
          path="/"
          element={
            <>
              {/* <Header /> */}
              <Products/>
              {/* <Footer/> */}
            </>
          }
        />

        {/* Login route without Header */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup route without Header */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<AdminDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
