# 🎮 Tournament Manager - Hướng Dẫn Sử Dụng

## 🚀 Cách Chạy Ứng Dụng Một Cách Đơn Giản

### Phương Pháp 1: Sử Dụng Live Server (Khuyến nghị)

1. **Cài đặt Live Server extension trong VS Code**
2. **Mở thư mục dự án trong VS Code**
3. **Khởi động Backend Server:**
   ```bash
   # Mở terminal trong VS Code
   cd src/backend
   node server.js
   ```
4. **Khởi động Frontend:**
   - Chuột phải vào file `index.html`
   - Chọn "Open with Live Server"
   - Trình duyệt sẽ tự động mở tại `http://localhost:5500`

### Phương Pháp 2: Chạy Thủ Công

1. **Khởi động Backend:**
   ```bash
   cd src/backend
   npm install  # Chỉ cần chạy lần đầu
   node server.js
   ```

2. **Mở Frontend:**
   - Mở file `index.html` bằng trình duyệt
   - Hoặc sử dụng Live Server

## 📋 Yêu Cầu Hệ Thống

- **Node.js** (version 14 trở lên)
- **NPM** (đi kèm với Node.js)
- **Trình duyệt web** hiện đại (Chrome, Firefox, Edge, Safari)
- **MongoDB** (tùy chọn - có thể chạy mà không cần DB)

## 🎯 Tính Năng Chính

### 1. **Quản Lý Người Dùng**
- Đăng ký/Đăng nhập
- 3 loại người dùng: Admin, Organizer, User
- Quản lý profile cá nhân
- Phân quyền theo vai trò

### 2. **Quản Lý Giải Đấu**
- Tạo giải đấu mới (Organizer/Admin)
- Xem danh sách giải đấu
- Đăng ký tham gia giải đấu
- Tìm kiếm giải đấu theo từ khóa
- Quản lý trạng thái giải đấu

### 3. **Quản Lý Tin Tức**
- Tạo/Chỉnh sửa tin tức (Organizer/Admin)
- Xem tin tức nổi bật
- Phân loại theo danh mục
- Quản lý tin tức featured

### 4. **Dashboard Quản Trị**
- Dashboard cho Admin
- Dashboard cho Organizer
- Thống kê tổng quan
- Quản lý người dùng

## 🔐 Tài Khoản Mặc Định

Hệ thống có sẵn các tài khoản để test:

### Admin
- **Email:** `admin@tournament.com`
- **Password:** `admin123`
- **Quyền:** Quản lý toàn bộ hệ thống

### Organizer
- **Email:** `organizer@tournament.com`  
- **Password:** `organizer123`
- **Quyền:** Tạo/quản lý giải đấu và tin tức

### User
- **Email:** `user@tournament.com`
- **Password:** `user123`
- **Quyền:** Xem và đăng ký tham gia giải đấu

## 🎮 Hướng Dẫn Sử Dụng Chi Tiết

### Đăng Nhập Hệ Thống

1. Mở trang chủ
2. Click vào "Đăng nhập"
3. Nhập email và password
4. Hệ thống sẽ tự động chuyển hướng theo vai trò:
   - **Admin** → Dashboard quản trị
   - **Organizer** → Dashboard organizer
   - **User** → Trang chủ

### Tạo Giải Đấu Mới (Organizer/Admin)

1. Đăng nhập với tài khoản Organizer/Admin
2. Vào Dashboard → "Tạo giải đấu mới"
3. Điền thông tin:
   - Tên giải đấu
   - Mô tả
   - Game
   - Thời gian bắt đầu/kết thúc
   - Số lượng thí sinh tối đa
   - Giải thưởng
   - Luật chơi
4. Click "Tạo giải đấu"

### Đăng Ký Tham Gia Giải Đấu (User)

1. Đăng nhập với tài khoản User
2. Duyệt danh sách giải đấu
3. Click "Xem chi tiết" trên giải đấu muốn tham gia
4. Click "Đăng ký tham gia"
5. Xác nhận đăng ký

### Tạo Tin Tức (Organizer/Admin)

1. Đăng nhập với tài khoản Organizer/Admin
2. Vào "Quản lý tin tức" → "Tạo tin tức mới"
3. Điền thông tin:
   - Tiêu đề
   - Nội dung
   - Danh mục
   - Tags
   - Đánh dấu nổi bật (nếu cần)
4. Click "Xuất bản"

## 🔧 API Endpoints

Hệ thống cung cấp các API endpoints sau:

### Authentication
- `POST /api/auth/register` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile
- `PUT /api/auth/profile` - Cập nhật profile
- `POST /api/auth/logout` - Đăng xuất

### Tournaments
- `GET /api/tournaments` - Lấy danh sách giải đấu
- `GET /api/tournaments/upcoming` - Giải đấu sắp tới
- `GET /api/tournaments/ongoing` - Giải đấu đang diễn ra
- `GET /api/tournaments/search` - Tìm kiếm giải đấu
- `POST /api/tournaments` - Tạo giải đấu mới
- `PUT /api/tournaments/:id` - Cập nhật giải đấu
- `DELETE /api/tournaments/:id` - Xóa giải đấu
- `POST /api/tournaments/:id/register` - Đăng ký tham gia
- `DELETE /api/tournaments/:id/withdraw` - Rút khỏi giải đấu

### News
- `GET /api/news` - Lấy danh sách tin tức
- `GET /api/news/featured` - Tin tức nổi bật
- `GET /api/news/:id` - Chi tiết tin tức
- `POST /api/news` - Tạo tin tức mới
- `PUT /api/news/:id` - Cập nhật tin tức
- `DELETE /api/news/:id` - Xóa tin tức

### Admin
- `GET /api/admin/stats` - Thống kê tổng quan

## 🛠️ Cấu Trúc Dự Án

```
tournament-manager/
├── index.html                 # Trang chính
├── src/
│   ├── frontend/
│   │   ├── js/
│   │   │   ├── api.js         # API client
│   │   │   ├── app.js         # Main app controller
│   │   │   ├── backend-starter.js # Backend connection
│   │   │   └── controllers/   # Feature controllers
│   │   ├── *.html            # Các trang giao diện
│   │   └── lang/             # Đa ngôn ngữ
│   ├── backend/
│   │   ├── server.js         # Main server
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Data models
│   │   └── middleware/       # Middleware
│   └── assets/               # CSS, images, fonts
└── package.json
```

## 🚨 Xử Lý Sự Cố

### 1. Backend Server Không Chạy

**Triệu chứng:** Trang hiển thị "Backend Server chưa chạy!"

**Giải pháp:**
```bash
cd src/backend
node server.js
```

Sau đó reload trang web.

### 2. Lỗi CORS

**Triệu chứng:** Console hiển thị CORS errors

**Giải pháp:**
- Đảm bảo backend server đang chạy
- Kiểm tra config CORS trong `src/backend/server.js`

### 3. Lỗi Cơ Sở Dữ Liệu

**Triệu chứng:** API trả về lỗi database

**Giải pháp:**
- Hệ thống sẽ tự động chuyển sang mock mode
- Hoặc cài đặt MongoDB:
  ```bash
  # Windows (với Chocolatey)
  choco install mongodb
  
  # macOS (với Homebrew)
  brew install mongodb-community
  
  # Ubuntu
  sudo apt-get install mongodb
  ```

### 4. Trang Trắng Hoặc Không Load

**Giải pháp:**
1. Mở Developer Tools (F12)
2. Kiểm tra Console tab có lỗi gì
3. Kiểm tra Network tab xem API calls
4. Thử reload trang (Ctrl+F5)

## 📱 Responsive Design

Hệ thống hỗ trợ đầy đủ responsive design:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)  
- **Mobile** (< 768px)

## 🌐 Hỗ Trợ Trình Duyệt

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ❌ Internet Explorer (không hỗ trợ)

## 🔒 Bảo Mật

- JWT tokens cho authentication
- Role-based access control
- Input validation
- SQL injection protection
- XSS protection

## 📈 Performance

- Lazy loading cho images
- Code splitting
- Minified assets
- Caching strategies
- Optimized API calls

## 🤝 Đóng Góp

Để đóng góp vào dự án:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra console log để xem lỗi
2. Đảm bảo backend server đang chạy
3. Thử reload trang
4. Kiểm tra network connectivity
5. Liên hệ team phát triển

## 📝 Changelog

### Version 1.0.0
- ✅ Hoàn thành tích hợp frontend-backend
- ✅ Authentication system
- ✅ Tournament management  
- ✅ News management
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Error handling
- ✅ Auto backend detection

---

🎮 **Chúc bạn có trải nghiệm tuyệt vời với Tournament Manager!** 🏆