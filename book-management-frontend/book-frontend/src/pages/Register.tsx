import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, fullName);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink-900">Tạo tài khoản mới</h1>
      <p className="mt-2 text-sm text-ink-400">Tham gia Thư Quán để bắt đầu đặt sách</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Họ và tên</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-600">Mật khẩu</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-ink-900 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-medium text-brass-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
