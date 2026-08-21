import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function Cart() {
  const { lines, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleCheckout() {
    setError(''); setPlacing(true);
    try {
      await api.post('/orders', { items: lines.map((l) => ({ bookId: l.book.id, quantity: l.quantity })) });
      clearCart();
      navigate('/my-orders');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại');
    } finally { setPlacing(false); }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="catalog-tag justify-center">Giỏ hàng</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink-900">Chưa có gì trong giỏ</h1>
        <p className="mt-2 text-ink-400">Hãy chọn vài cuốn sách để bắt đầu.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">Xem sách</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="catalog-tag">Giỏ hàng · {lines.length} đầu sách</p>
      <h1 className="mb-8 mt-1 font-display text-3xl font-semibold text-ink-900">Giỏ hàng của bạn</h1>

      <div className="flex flex-col gap-4">
        {lines.map((line) => (
          <div key={line.book.id} className="card flex items-center gap-4 p-4">
            <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ink-100">
              {line.book.imageUrl ? (
                <img src={line.book.imageUrl} className="h-full w-full object-cover" />
              ) : (
                <span className="font-display text-xl text-ink-300">{line.book.title.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-ink-900">{line.book.title}</h3>
              <p className="font-mono text-xs text-ink-400">{formatVND(Number(line.book.price))}</p>
            </div>
            <div className="flex items-center rounded-full border border-ink-100">
              <button onClick={() => updateQuantity(line.book.id, line.quantity - 1)} className="px-3 py-1.5 text-ink-500 hover:text-ink-900">−</button>
              <span className="w-8 text-center font-mono text-sm">{line.quantity}</span>
              <button onClick={() => updateQuantity(line.book.id, line.quantity + 1)} className="px-3 py-1.5 text-ink-500 hover:text-ink-900">+</button>
            </div>
            <span className="w-28 text-right font-mono text-sm font-medium text-ink-900">
              {formatVND(Number(line.book.price) * line.quantity)}
            </span>
            <button onClick={() => removeFromCart(line.book.id)} className="text-sm text-ink-300 hover:text-red-500">Xóa</button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-6">
        <div>
          <p className="catalog-tag">Tổng cộng</p>
          <span className="font-display text-2xl font-semibold text-ink-900">{formatVND(total)}</span>
        </div>
        <button onClick={handleCheckout} disabled={placing} className="btn-primary !px-8 !py-3">
          {placing ? 'Đang đặt hàng...' : 'Đặt hàng'}
        </button>
      </div>
      {error && <p className="mt-3 text-right text-sm text-red-500">{error}</p>}
    </div>
  );
}
