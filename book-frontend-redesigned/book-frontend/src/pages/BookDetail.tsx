import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

  useEffect(() => { api.get(`/books/${id}`).then((res) => setBook(res.data)); }, [id]);

  if (!book) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr]">
          <div className="aspect-[3/4] animate-pulse rounded-2xl bg-ink-100" />
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-ink-100" />
            <div className="h-8 w-2/3 animate-pulse rounded bg-ink-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-ink-100" />
          </div>
        </div>
      </div>
    );
  }

  function handleAddToCart() {
    if (!user) return navigate('/login');
    addToCart(book!, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link to="/" className="mb-8 inline-block catalog-tag !text-ink-400 hover:!text-ink-800">← Quay lại mục lục</Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr]">
        <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl bg-ink-100 shadow-card">
          {book.imageUrl ? (
            <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-6xl text-ink-300">{book.title.charAt(0)}</span>
          )}
        </div>

        <div>
          {book.category && <span className="catalog-tag">{book.category.name}</span>}
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink-900">{book.title}</h1>
          <p className="mt-1.5 text-ink-400">Tác giả: {book.author}</p>

          <p className="mt-6 max-w-lg leading-relaxed text-ink-600">
            {book.description || 'Chưa có mô tả cho cuốn sách này.'}
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-ink-100 pt-6">
            <span className="font-mono text-2xl font-medium text-ink-900">{formatVND(Number(book.price))}</span>
            <span className={`font-mono text-xs ${book.stock > 0 ? 'text-moss-600' : 'text-red-500'}`}>
              {book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết hàng'}
            </span>
          </div>

          {user?.role !== 'ADMIN' && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-ink-100">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3.5 py-2 text-ink-500 hover:text-ink-900">−</button>
                <span className="w-8 text-center font-mono text-sm">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))} className="px-3.5 py-2 text-ink-500 hover:text-ink-900">+</button>
              </div>
              <button disabled={book.stock === 0} onClick={handleAddToCart} className="btn-primary">
                {added ? 'Đã thêm ✓' : 'Thêm vào giỏ'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
