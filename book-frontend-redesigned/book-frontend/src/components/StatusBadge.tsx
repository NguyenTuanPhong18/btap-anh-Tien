import { OrderStatus } from '../types';

const STYLES: Record<OrderStatus, string> = {
  PENDING: 'bg-brass-500/10 text-brass-600',
  CONFIRMED: 'bg-ink-600/10 text-ink-600',
  SHIPPING: 'bg-moss-500/10 text-moss-600',
  COMPLETED: 'bg-emerald-500/10 text-emerald-700',
  CANCELLED: 'bg-red-500/10 text-red-600',
};
const LABELS: Record<OrderStatus, string> = {
  PENDING: 'Chờ xử lý', CONFIRMED: 'Đã xác nhận', SHIPPING: 'Đang giao',
  COMPLETED: 'Hoàn thành', CANCELLED: 'Đã hủy',
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}
