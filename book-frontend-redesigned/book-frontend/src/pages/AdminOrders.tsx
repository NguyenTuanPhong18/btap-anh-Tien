import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Order, OrderStatus } from '../types';
import StatusBadge from '../components/StatusBadge';

const STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'];

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  function load() { api.get('/orders').then((res) => setOrders(res.data)); }
  useEffect(load, []);

  async function handleStatusChange(id: string, status: OrderStatus) {
    await api.patch(`/orders/${id}/status`, { status });
    load();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="catalog-tag">Quản trị</p>
      <h1 className="mb-8 mt-1 font-display text-3xl font-semibold text-ink-900">Tất cả đơn hàng</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-ink-900">{order.user?.fullName} — {order.user?.email}</p>
                <p className="catalog-tag mt-0.5">{order.id.slice(0, 8)} · {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  className="rounded-full border border-ink-100 px-3 py-1.5 font-mono text-xs outline-none focus:border-brass-500"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <ul className="mt-4 flex flex-col gap-1 border-t border-ink-100 pt-3 text-sm text-ink-600">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.book.title} × {item.quantity}</span>
                  <span className="font-mono">{formatVND(Number(item.price) * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-end border-t border-ink-100 pt-3 font-mono font-medium text-ink-900">
              Tổng: {formatVND(Number(order.total))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
