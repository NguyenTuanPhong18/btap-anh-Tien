import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import AdminBooks from './pages/AdminBooks';
import AdminCategories from './pages/AdminCategories';
import AdminOrders from './pages/AdminOrders';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        {/* Public - Guest xem được không cần đăng nhập */}
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer only */}
        <Route path="/cart" element={
          <ProtectedRoute roles={['CUSTOMER']}><Cart /></ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute roles={['CUSTOMER']}><MyOrders /></ProtectedRoute>
        } />

        {/* Admin only */}
        <Route path="/admin/books" element={
          <ProtectedRoute roles={['ADMIN']}><AdminBooks /></ProtectedRoute>
        } />
        <Route path="/admin/categories" element={
          <ProtectedRoute roles={['ADMIN']}><AdminCategories /></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute roles={['ADMIN']}><AdminOrders /></ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
