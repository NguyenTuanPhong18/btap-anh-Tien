import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    setError('');
    setPlacing(true);
    try {
      await api.post('/orders', {
        items: lines.map((l) => ({ bookId: l.book.id, quantity: l.quantity })),
      });
      clearCart();
      navigate('/my-orders');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại');
    } finally {
      setPlacing(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Giỏ hàng trống</h1>
        <p className="mt-2 text-ink-400">Hãy chọn vài cuốn sách để bắt đầu.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink-900">Giỏ hàng của bạn</h1>

      <div className="flex flex-col gap-4">
        {lines.map((line) => (
          <div key={line.book.id} className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4">
            <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-ink-100">
              <span className="font-display text-xl text-ink-400">{line.book.title.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-ink-900">{line.book.title}</h3>
              <p className="text-sm text-ink-400">{formatVND(Number(line.book.price))}</p>
            </div>
            <div className="flex items-center rounded-lg border border-ink-100">
              <button
                onClick={() => updateQuantity(line.book.id, line.quantity - 1)}
                className="px-3 py-1.5 text-ink-600 hover:text-ink-900"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{line.quantity}</span>
              <button
                onClick={() => updateQuantity(line.book.id, line.quantity + 1)}
                className="px-3 py-1.5 text-ink-600 hover:text-ink-900"
              >
                +
              </button>
            </div>
            <span className="w-28 text-right font-medium text-ink-900">
              {formatVND(Number(line.book.price) * line.quantity)}
            </span>
            <button
              onClick={() => removeFromCart(line.book.id)}
              className="text-sm text-ink-400 hover:text-red-500"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-6">
        <span className="font-display text-xl font-semibold text-ink-900">
          Tổng: {formatVND(total)}
        </span>
        <button
          onClick={handleCheckout}
          disabled={placing}
          className="rounded-full bg-ink-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {placing ? 'Đang đặt hàng...' : 'Đặt hàng'}
        </button>
      </div>
      {error && <p className="mt-3 text-right text-sm text-red-500">{error}</p>}
    </div>
  );
}
