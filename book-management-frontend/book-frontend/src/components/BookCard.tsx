import { Link } from 'react-router-dom';
import { Book } from '../types';

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-ink-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ink-900/5"
    >
      <div className="flex aspect-[3/4] items-center justify-center bg-ink-100 overflow-hidden">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-4xl text-ink-400">{book.title.charAt(0)}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {book.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-brass-600">
            {book.category.name}
          </span>
        )}
        <h3 className="font-display text-lg leading-snug text-ink-900 group-hover:text-brass-600">
          {book.title}
        </h3>
        <p className="text-sm text-ink-400">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold text-ink-800">{formatVND(Number(book.price))}</span>
          <span className={`text-xs ${book.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {book.stock > 0 ? `Còn ${book.stock}` : 'Hết hàng'}
          </span>
        </div>
      </div>
    </Link>
  );
}
