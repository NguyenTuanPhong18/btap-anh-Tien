import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { Order } from '../types';
import StatusBadge from '../components/StatusBadge';

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get('/orders/mine').then((res) => setOrders(res.data)).finally(() => setLoading(false)); }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="catalog-tag">Lịch sử</p>
      <h1 className="mb-8 mt-1 font-display text-3xl font-semibold text-ink-900">Đơn hàng của tôi</h1>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-ink-100" />)}</div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 py-20 text-center">
          <p className="font-display text-lg text-ink-600">Chưa có đơn hàng nào</p>
          <Link to="/" className="btn-primary mt-6 inline-block">Xem sách</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="catalog-tag">Mã đơn: {order.id.slice(0, 8)}</p>
                  <p className="mt-0.5 text-xs text-ink-400">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <ul className="mt-4 flex flex-col gap-1 border-t border-ink-100 pt-3 text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-ink-600">
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
      )}
    </div>
  );
}
