import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative py-1 transition hover:text-ink-900 ${isActive ? 'text-ink-900' : 'text-ink-400'}
         after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-brass-500 after:transition-all
         ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-[22px] font-semibold tracking-tight text-ink-900">Thư Quán</span>
          <span className="catalog-tag border-l border-ink-200 pl-2.5">No. 001 — Bookstore</span>
        </Link>

        <nav className="flex items-center gap-7 text-sm font-medium">
          <NavItem to="/">Sách</NavItem>

          {user?.role === 'ADMIN' && (
            <>
              <NavItem to="/admin/books">Quản lý sách</NavItem>
              <NavItem to="/admin/categories">Danh mục</NavItem>
              <NavItem to="/admin/orders">Đơn hàng</NavItem>
            </>
          )}

          {user?.role === 'CUSTOMER' && (
            <>
              <NavItem to="/my-orders">Đơn của tôi</NavItem>
              <NavLink to="/cart" className="relative text-ink-400 transition hover:text-ink-900">
                Giỏ hàng
                {count > 0 && (
                  <span className="absolute -right-3.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass-500 font-mono text-[10px] font-medium text-white">
                    {count}
                  </span>
                )}
              </NavLink>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-4 border-l border-ink-100 pl-6">
              <div className="text-right leading-tight">
                <p className="text-ink-800">{user.fullName}</p>
                <p className="catalog-tag justify-end !text-ink-300">{user.role}</p>
              </div>
              <button onClick={handleLogout} className="btn-secondary !px-3.5 !py-1.5 text-xs">
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-ink-100 pl-6">
              <Link to="/login" className="text-ink-500 hover:text-ink-900">Đăng nhập</Link>
              <Link to="/register" className="btn-primary !px-4 !py-1.5 text-xs">Đăng ký</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
