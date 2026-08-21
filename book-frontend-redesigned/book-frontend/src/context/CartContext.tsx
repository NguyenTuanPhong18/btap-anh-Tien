import { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';

export interface CartLine { book: Book; quantity: number; }
interface CartContextType {
  lines: CartLine[];
  addToCart: (book: Book, quantity?: number) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  total: number; count: number;
}
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  function addToCart(book: Book, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.book.id === book.id);
      if (existing) return prev.map((l) => (l.book.id === book.id ? { ...l, quantity: l.quantity + quantity } : l));
      return [...prev, { book, quantity }];
    });
  }
  function updateQuantity(bookId: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(bookId);
    setLines((prev) => prev.map((l) => (l.book.id === bookId ? { ...l, quantity } : l)));
  }
  function removeFromCart(bookId: string) {
    setLines((prev) => prev.filter((l) => l.book.id !== bookId));
  }
  function clearCart() { setLines([]); }
  const total = lines.reduce((sum, l) => sum + Number(l.book.price) * l.quantity, 0);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider value={{ lines, addToCart, updateQuantity, removeFromCart, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart phải được dùng bên trong CartProvider');
  return ctx;
}
