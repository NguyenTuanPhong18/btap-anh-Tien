import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Order } from '../types';
import StatusBadge from '../components/StatusBadge';

function formatVND(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine').then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mx-auto max-w-4xl px-6 py-12 text-ink-400">Đang tải...</div>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink-900">Đơn hàng của tôi</h1>

      {orders.length === 0 ? (
        <p className="text-ink-400">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-ink-400">Mã đơn: {order.id.slice(0, 8)}</p>
                  <p className="text-xs text-ink-400">
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <ul className="mt-4 flex flex-col gap-1 border-t border-ink-100 pt-3 text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-ink-600">
                    <span>{item.book.title} × {item.quantity}</span>
                    <span>{formatVND(Number(item.price) * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-end border-t border-ink-100 pt-3 font-medium text-ink-900">
                Tổng: {formatVND(Number(order.total))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
