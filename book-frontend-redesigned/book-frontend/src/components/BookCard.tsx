import { Link } from 'react-router-dom';
import { Book } from '../types';

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
// Sinh "số hiệu mục lục" giả lập kiểu thẻ thư viện, dựa trên id sách - ổn định, không đổi mỗi lần render
function callNumber(id: string) {
  return id.replace(/-/g, '').slice(0, 6).toUpperCase();
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="group card rise-in flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-ink-100">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        ) : (
          <span className="font-display text-4xl text-ink-300">{book.title.charAt(0)}</span>
        )}
        {/* Nhãn số hiệu mục lục - điểm nhấn thị giác riêng của thiết kế */}
        <span className="absolute left-0 top-3 rounded-r-full bg-ink-900/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-paper backdrop-blur-sm">
          №{callNumber(book.id)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {book.category && <span className="catalog-tag">{book.category.name}</span>}
        <h3 className="font-display text-lg leading-snug text-ink-900 group-hover:text-brass-600">{book.title}</h3>
        <p className="text-sm text-ink-400">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-[15px] font-medium text-ink-800">{formatVND(Number(book.price))}</span>
          <span className={`font-mono text-[11px] ${book.stock > 0 ? 'text-moss-600' : 'text-red-500'}`}>
            {book.stock > 0 ? `Còn ${book.stock}` : 'Hết hàng'}
          </span>
        </div>
      </div>
    </Link>
  );
}
