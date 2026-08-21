import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Category } from '../types';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  function load() { api.get('/categories').then((res) => setCategories(res.data)); }
  useEffect(load, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      if (editingId) await api.patch(`/categories/${editingId}`, { name });
      else await api.post('/categories', { name });
      setName(''); setEditingId(null); load();
    } catch (err: any) { setError(err.response?.data?.message || 'Có lỗi xảy ra'); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa danh mục này? (chỉ xóa được nếu không còn sách nào thuộc danh mục)')) return;
    try { await api.delete(`/categories/${id}`); load(); }
    catch (err: any) { alert(err.response?.data?.message || 'Không thể xóa danh mục'); }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="catalog-tag">Quản trị</p>
      <h1 className="mb-8 mt-1 font-display text-3xl font-semibold text-ink-900">Quản lý danh mục</h1>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên danh mục" className="field flex-1" />
        <button className="btn-primary">{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setName(''); }} className="btn-secondary">Hủy</button>
        )}
      </form>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="card flex flex-col divide-y divide-ink-100">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-ink-800">{c.name}</span>
            <div className="flex gap-4 text-sm">
              <button onClick={() => { setEditingId(c.id); setName(c.name); }} className="text-ink-400 hover:text-ink-900">Sửa</button>
              <button onClick={() => handleDelete(c.id)} className="text-ink-400 hover:text-red-500">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
