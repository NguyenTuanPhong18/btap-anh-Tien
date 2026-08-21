# Backend - Hệ thống quản lý sách

## Cài đặt
```bash
npm install
cp .env.example .env    # rồi sửa DATABASE_URL cho đúng máy bạn
npx prisma migrate dev --name init
npm run start:dev
```
API chạy tại: http://localhost:3000/api

## Tạo tài khoản Admin đầu tiên
Hệ thống không cho đăng ký trực tiếp thành Admin (bảo mật). Sau khi đăng ký 1 tài khoản thường,
vào database đổi field `role` của user đó từ `CUSTOMER` sang `ADMIN`:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'ban@example.com';
```
