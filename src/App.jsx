import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import MainLayout from './utils/mainLayout';
import AdminLayout from './utils/adminLayout';

// Import Guard
import AdminRoute from './utils/adminRoute';

// Import Pages
import HomePage from './pages/home'; // From pages/home/index.jsx
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import ShopPage from './pages/shop'; // Renamed from productsPage

// Admin Pages
import AdminDashboard from './pages/adminDashboard';
import ManageProductsPage from './pages/manageProductsPage';
import AddProductPage from './pages/addProductPage';
import EditProductPage from './pages/editProductPage';
import ViewOrdersPage from './pages/viewOrdersPage';
import OrderDetailsPage from './pages/orderDetailsPage';
import ViewCustomersPage from './pages/viewCustomersPage';

import './App.css';
import OffersPage from './pages/offers/offersPage';
import ContactPage from './pages/contactUs/contactPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Routes>
      {/* 1. Public Site Routes (wrapped in the main layout) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/category/:categoryId" element={<ShopPage />} />
        <Route path="offers" element={<OffersPage/>} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="product/:productId" element={<ProductDetailPage/>} />
        
      </Route>

      {/* 2. Admin Panel Routes (protected and with their own layout) */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ManageProductsPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
          <Route path="orders" element={<ViewOrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="customers" element={<ViewCustomersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;