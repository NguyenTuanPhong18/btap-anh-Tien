import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-ink-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-ink-900">Thư Quán</span>
          <span className="text-xs uppercase tracking-widest text-brass-600">bookstore</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-ink-600">
          <Link to="/" className="hover:text-ink-900">Sách</Link>

          {user?.role === 'ADMIN' && (
            <>
              <Link to="/admin/books" className="hover:text-ink-900">Quản lý sách</Link>
              <Link to="/admin/categories" className="hover:text-ink-900">Danh mục</Link>
              <Link to="/admin/orders" className="hover:text-ink-900">Đơn hàng</Link>
            </>
          )}

          {user?.role === 'CUSTOMER' && (
            <>
              <Link to="/my-orders" className="hover:text-ink-900">Đơn của tôi</Link>
              <Link to="/cart" className="relative hover:text-ink-900">
                Giỏ hàng
                {count > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass-500 text-[10px] font-semibold text-white">
                    {count}
                  </span>
                )}
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-3 border-l border-ink-100 pl-6">
              <span className="text-ink-800">{user.fullName}</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-ink-200 px-3 py-1 text-xs text-ink-600 transition hover:border-ink-800 hover:text-ink-900"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-ink-100 pl-6">
              <Link to="/login" className="hover:text-ink-900">Đăng nhập</Link>
              <Link
                to="/register"
                className="rounded-full bg-ink-900 px-4 py-1.5 text-white transition hover:bg-ink-800"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
