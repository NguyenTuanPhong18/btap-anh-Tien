import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Book, Category } from '../types';

const emptyForm = { title: '', author: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' };

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  function load() {
    api.get('/books').then((res) => setBooks(res.data));
    api.get('/categories').then((res) => setCategories(res.data));
  }
  useEffect(load, []);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(book: Book) {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description || '',
      price: String(book.price),
      stock: String(book.stock),
      imageUrl: book.imageUrl || '',
      categoryId: book.categoryId,
    });
    setEditingId(book.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    try {
      if (editingId) {
        await api.patch(`/books/${editingId}`, payload);
      } else {
        await api.post('/books', payload);
      }
      setShowForm(false);
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa cuốn sách này?')) return;
    await api.delete(`/books/${id}`);
    load();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-ink-900">Quản lý sách</h1>
        <button
          onClick={openCreate}
          className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-800"
        >
          + Thêm sách
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-ink-100 bg-white p-6 md:grid-cols-2">
          <input required placeholder="Tên sách" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500" />
          <input required placeholder="Tác giả" value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500" />
          <input required type="number" min={0} placeholder="Giá (VND)" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500" />
          <input required type="number" min={0} placeholder="Tồn kho" value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500" />
          <select required value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500">
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input placeholder="URL ảnh bìa (tùy chọn)" value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500" />
          <textarea placeholder="Mô tả" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="col-span-full rounded-lg border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-brass-500" rows={3} />

          {error && <p className="col-span-full text-sm text-red-500">{error}</p>}

          <div className="col-span-full flex gap-3">
            <button className="rounded-full bg-ink-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-ink-800">
              {editingId ? 'Cập nhật' : 'Tạo mới'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="rounded-full border border-ink-100 px-6 py-2.5 text-sm text-ink-600">
              Hủy
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-ink-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">Tên sách</th>
              <th className="px-5 py-3 font-medium">Danh mục</th>
              <th className="px-5 py-3 font-medium">Giá</th>
              <th className="px-5 py-3 font-medium">Tồn kho</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {books.map((b) => (
              <tr key={b.id}>
                <td className="px-5 py-3 text-ink-900">{b.title}</td>
                <td className="px-5 py-3 text-ink-500">{b.category?.name}</td>
                <td className="px-5 py-3 text-ink-800">{formatVND(Number(b.price))}</td>
                <td className="px-5 py-3 text-ink-500">{b.stock}</td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => openEdit(b)} className="mr-3 text-ink-500 hover:text-ink-900">Sửa</button>
                  <button onClick={() => handleDelete(b.id)} className="text-ink-500 hover:text-red-500">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
