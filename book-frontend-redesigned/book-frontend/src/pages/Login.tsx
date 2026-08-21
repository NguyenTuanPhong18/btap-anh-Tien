import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally { setLoading(false); }
  }

  return (
    <div className="grid min-h-[calc(100vh-73px)] grid-cols-1 md:grid-cols-2">
      <div className="relative hidden items-end overflow-hidden bg-ink-900 p-12 md:flex">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brass-500/10 blur-3xl" />
        <div>
          <p className="catalog-tag !text-brass-400">Thư Quán</p>
          <p className="mt-3 max-w-xs font-display text-2xl leading-snug text-paper">
            "Một căn phòng không có sách như cơ thể không có linh hồn."
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-semibold text-ink-900">Chào mừng trở lại</h1>
          <p className="mt-2 text-sm text-ink-400">Đăng nhập để tiếp tục mua sắm</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-600">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-600">Mật khẩu</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full">
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-brass-600 hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
