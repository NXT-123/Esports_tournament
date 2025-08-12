# 🏆 Tournament Management System - Hướng dẫn sử dụng

## 🚀 Khởi động ứng dụng

### Cách 1: Sử dụng script tự động
```bash
# Cài đặt dependencies cho backend
npm run install:backend

# Khởi động cả frontend và backend
node start-app.js
```

### Cách 2: Khởi động thủ công

**Backend (API Server):**
```bash
cd src/backend
npm install
npm start
# Server sẽ chạy trên http://localhost:3000
```

**Frontend (Web Server):**
```bash
# Sử dụng Python
python -m http.server 8080

# Hoặc sử dụng Node.js
npx serve . -p 8080

# Hoặc sử dụng live-server (có auto-reload)
npx live-server --port=8080
```

## 🌐 Truy cập ứng dụng

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000/api
- **API Health Check**: http://localhost:3000/api/health

## ✨ Tính năng đã tích hợp

### 🏠 Trang chủ (Guest View)
- Hiển thị các giải đấu đang diễn ra
- Carousel giải đấu với navigation
- Tin tức nổi bật
- Hệ thống tìm kiếm
- Đăng nhập/Đăng ký

### 🔐 Hệ thống Authentication
- Đăng ký tài khoản mới
- Đăng nhập với email/password
- Quản lý token JWT
- Bảo vệ các trang yêu cầu đăng nhập
- Logout an toàn

### 🎯 Single Page Application (SPA)
- Routing không reload trang
- Navigation mượt mà
- Back/Forward button support
- URL-based routing

### 📱 Responsive Design
- Tương thích mobile
- Dark mode support
- Modern UI/UX
- Loading states
- Error handling

## 🗺️ Cấu trúc Routing

```
/ (hoặc /home)           → Trang chủ (Guest View)
/login                   → Trang đăng nhập
/register                → Trang đăng ký
/dashboard               → Dashboard người dùng (cần login)
/tournaments             → Quản lý giải đấu
/tournament/:id          → Chi tiết giải đấu
/news                    → Quản lý tin tức
/news/:id                → Chi tiết tin tức
/profile                 → Hồ sơ người dùng (cần login)
/support                 → Trang hỗ trợ
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Thông tin profile

### Tournaments
- `GET /api/tournaments` - Danh sách giải đấu
- `GET /api/tournaments/upcoming` - Giải đấu sắp diễn ra
- `GET /api/tournaments/ongoing` - Giải đấu đang diễn ra
- `GET /api/tournaments/:id` - Chi tiết giải đấu
- `POST /api/tournaments` - Tạo giải đấu mới (cần login)

### News
- `GET /api/news` - Danh sách tin tức
- `GET /api/news/featured` - Tin tức nổi bật
- `GET /api/news/:id` - Chi tiết tin tức

## 🎮 Cách sử dụng

### 1. Lần đầu truy cập
- Mở http://localhost:8080
- Xem các giải đấu và tin tức mà không cần đăng nhập
- Click "Đăng ký" để tạo tài khoản

### 2. Đăng nhập
- Click "Đăng nhập" trên header
- Nhập email và password
- Được chuyển đến Dashboard

### 3. Điều hướng
- Sử dụng navigation menu
- Hoặc gõ URL trực tiếp
- Browser back/forward hoạt động bình thường

### 4. Quản lý giải đấu
- Truy cập `/tournaments` 
- Xem, tạo, sửa giải đấu
- Đăng ký tham gia giải đấu

### 5. Quản lý tin tức
- Truy cập `/news`
- Đọc tin tức chi tiết
- Quản lý tin tức (cho admin)

## 🛠️ Development

### Cấu trúc Frontend
```
src/frontend/js/
├── api.js              # API client & token management
├── router.js           # SPA routing system
├── app.js             # Main application controller
├── controllers/       # Page controllers
├── views/            # View rendering
└── models/           # Data models
```

### Thêm route mới
```javascript
// Trong router.js
this.addRoute('/new-page', () => this.renderNewPage());

// Thêm handler method
async renderNewPage() {
    await this.loadHTMLPage('new-page.html');
    this.setupNewPageEvents();
}
```

### Gọi API
```javascript
import { apiCall, API_ENDPOINTS } from './api.js';

// GET request
const tournaments = await apiCall(API_ENDPOINTS.TOURNAMENTS.BASE);

// POST request với authentication
const result = await apiCall(
    API_ENDPOINTS.TOURNAMENTS.BASE, 
    { name: 'New Tournament' }, 
    'POST', 
    true
);
```

## 🐛 Troubleshooting

### Backend không khởi động
- Kiểm tra port 3000 có bị chiếm không
- Chạy `npm install` trong `src/backend`
- Kiểm tra file `.env` (nếu có)

### Frontend không load
- Kiểm tra port 8080 có available không
- Kiểm tra console browser có lỗi không
- Đảm bảo backend đang chạy

### CORS errors
- Backend đã được cấu hình CORS
- Đảm bảo frontend và backend chạy đúng port

### Module import errors
- Sử dụng modern browser hỗ trợ ES6 modules
- Hoặc serve qua HTTP server (không mở file trực tiếp)

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console browser (F12)
2. Kiểm tra logs backend
3. Đảm bảo cả frontend và backend đang chạy
4. Restart lại các servers

## 🎯 Kế hoạch phát triển

- [ ] Real-time updates với WebSocket
- [ ] Push notifications
- [ ] PWA support
- [ ] Advanced search & filters
- [ ] Tournament brackets visualization
- [ ] Live match streaming
- [ ] Mobile app