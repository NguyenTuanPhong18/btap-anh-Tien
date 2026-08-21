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

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (categoryId) params.categoryId = categoryId;
    if (search) params.search = search;
    api
      .get('/books', { params })
      .then((res) => setBooks(res.data))
      .finally(() => setLoading(false));
  }, [categoryId, search]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-10 rounded-2xl bg-ink-900 px-8 py-12 text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brass-400">Thư viện của bạn</p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          Khám phá những trang sách
          <br /> đáng đọc tiếp theo
        </h1>
      </section>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên sách..."
          className="w-full max-w-sm rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-brass-500 md:w-72"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryId('')}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              categoryId === '' ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-100'
            }`}
          >
            Tất cả
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryId(c.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                categoryId === c.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-ink-400">Đang tải...</p>
      ) : books.length === 0 ? (
        <p className="text-ink-400">Không tìm thấy sách nào.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
