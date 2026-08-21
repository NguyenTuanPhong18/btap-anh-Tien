export type Role = 'ADMIN' | 'CUSTOMER';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: string;
  category?: Category;
}

export interface OrderItem {
  id: string;
  bookId: string;
  quantity: number;
  price: number;
  book: Book;
}

export interface Order {
  id: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
  user?: { id: string; email: string; fullName: string };
}
