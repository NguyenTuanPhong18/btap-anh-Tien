import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Book } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <div className="mx-auto max-w-6xl px-6 py-12 text-ink-400">Đang tải...</div>;

  function handleAddToCart() {
    if (!user) return navigate('/login');
    addToCart(book!, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr]">
        <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-ink-100 overflow-hidden">
          {book.imageUrl ? (
            <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-6xl text-ink-400">{book.title.charAt(0)}</span>
          )}
        </div>

        <div>
          {book.category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brass-600">
              {book.category.name}
            </span>
          )}
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">{book.title}</h1>
          <p className="mt-1 text-ink-400">Tác giả: {book.author}</p>

          <p className="mt-6 leading-relaxed text-ink-600">
            {book.description || 'Chưa có mô tả cho cuốn sách này.'}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-3xl font-semibold text-ink-900">
              {formatVND(Number(book.price))}
            </span>
            <span className={`text-sm ${book.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết hàng'}
            </span>
          </div>

          {user?.role !== 'ADMIN' && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-ink-100">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-ink-600 hover:text-ink-900"
                >
                  −
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                  className="px-3 py-2 text-ink-600 hover:text-ink-900"
                >
                  +
                </button>
              </div>
              <button
                disabled={book.stock === 0}
                onClick={handleAddToCart}
                className="rounded-full bg-ink-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-400"
              >
                {added ? 'Đã thêm ✓' : 'Thêm vào giỏ'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
