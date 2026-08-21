import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Book, Category } from '../types';
import BookCard from '../components/BookCard';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get('/categories').then((res) => setCategories(res.data)); }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (categoryId) params.categoryId = categoryId;
    if (search) params.search = search;
    api.get('/books', { params }).then((res) => setBooks(res.data)).finally(() => setLoading(false));
  }, [categoryId, search]);

  return (
    <div>
      {/* Hero - thesis của trang: 1 thư viện đang được lập mục lục, không phải shop hàng hóa */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-900">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass-500/10 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="catalog-tag !text-brass-400">Bộ sưu tập · cập nhật liên tục</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-[1.15] text-paper md:text-5xl">
            Mỗi cuốn sách là một
            <br />
            lối vào thế giới khác
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
            Tìm kiếm, lọc theo danh mục, và đặt những cuốn sách bạn muốn đọc tiếp theo.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên sách..."
            className="field max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryId('')}
              className={`rounded-full px-4 py-1.5 text-sm transition ${categoryId === '' ? 'bg-ink-900 text-white' : 'border border-ink-100 bg-white text-ink-500 hover:border-ink-300'}`}
            >
              Tất cả
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${categoryId === c.id ? 'bg-ink-900 text-white' : 'border border-ink-100 bg-white text-ink-500 hover:border-ink-300'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-ink-100" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 py-20 text-center">
            <p className="font-display text-lg text-ink-600">Chưa có mục nào khớp</p>
            <p className="mt-1 text-sm text-ink-400">Thử đổi bộ lọc hoặc từ khóa tìm kiếm khác.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {books.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </div>
    </div>
  );
}
