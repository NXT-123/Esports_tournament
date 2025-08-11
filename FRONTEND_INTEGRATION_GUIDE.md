# Frontend Backend Integration Guide

## Tổng quan

Tài liệu này mô tả cách tích hợp giữa frontend và backend trong hệ thống Tournament Management System. Hệ thống đã được tích hợp hoàn toàn với các API backend và cung cấp giao diện người dùng hiện đại, responsive.

## Kiến trúc hệ thống

### 1. Cấu trúc thư mục
```
src/frontend/js/
├── api.js                  # Cấu hình API và quản lý token
├── app.js                  # Controller chính của ứng dụng
├── controllers/
│   ├── auth.js            # Xử lý authentication
│   ├── tournaments.js     # Quản lý giải đấu
│   ├── news.js           # Quản lý tin tức
│   └── ...               # Các controller khác
├── models/               # Data models
├── views/               # View rendering
└── lang.js             # Hỗ trợ đa ngôn ngữ
```

### 2. Các thành phần chính

#### API Client (`api.js`)
- **Mục đích**: Quản lý tất cả các cuộc gọi API đến backend
- **Tính năng**:
  - Xử lý authentication tự động
  - Quản lý token JWT
  - Error handling toàn diện
  - Base URL configuration

```javascript
// Sử dụng API client
import { apiCall, API_ENDPOINTS, TokenManager } from './api.js';

// Gọi API với authentication
const result = await apiCall(API_ENDPOINTS.TOURNAMENTS.BASE, {}, 'GET', true);

// Kiểm tra trạng thái đăng nhập
if (TokenManager.isAuthenticated()) {
    // Người dùng đã đăng nhập
}
```

#### Main App Controller (`app.js`)
- **Mục đích**: Điều phối tất cả các module và controller
- **Tính năng**:
  - Khởi tạo ứng dụng
  - Quản lý routing theo trang
  - Xử lý authentication state
  - Cung cấp utilities chung

#### Authentication Controller (`controllers/auth.js`)
- **Mục đích**: Xử lý tất cả các chức năng liên quan đến authentication
- **Tính năng**:
  - Đăng nhập/đăng ký
  - Quản lý profile
  - Đổi mật khẩu
  - Role-based access control

#### Tournament Controller (`controllers/tournaments.js`)
- **Mục đích**: Quản lý toàn bộ chức năng giải đấu
- **Tính năng**:
  - CRUD operations cho giải đấu
  - Đăng ký/rút khỏi giải đấu
  - Tìm kiếm và filter
  - Quản lý trạng thái giải đấu

#### News Controller (`controllers/news.js`)
- **Mục đích**: Quản lý hệ thống tin tức
- **Tính năng**:
  - CRUD operations cho tin tức
  - Quản lý featured news
  - Phân loại theo category
  - Rich text editing support

## Cách sử dụng

### 1. Khởi tạo trong HTML

Để sử dụng hệ thống tích hợp trong file HTML:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tournament Manager</title>
    <!-- CSS imports -->
</head>
<body>
    <main id="content"></main>
    
    <script type="module">
        import App from './src/frontend/js/app.js';
        // App sẽ tự động khởi tạo khi DOM ready
    </script>
</body>
</html>
```

### 2. Authentication Flow

#### Đăng nhập
```javascript
import { authController } from './controllers/auth.js';

// Đăng nhập
await authController.login({
    email: 'user@example.com',
    password: 'password123'
});

// Kiểm tra trạng thái đăng nhập
if (authController.isAuthenticated()) {
    console.log('Đã đăng nhập thành công');
}
```

#### Đăng ký
```javascript
await authController.register({
    email: 'newuser@example.com',
    password: 'password123',
    fullName: 'Nguyễn Văn A',
    role: 'user'
});
```

### 3. Tournament Management

#### Lấy danh sách giải đấu
```javascript
import { tournamentController } from './controllers/tournaments.js';

// Lấy tất cả giải đấu
const tournaments = await tournamentController.getAllTournaments();

// Lấy giải đấu sắp diễn ra
const upcoming = await tournamentController.getUpcomingTournaments();

// Tìm kiếm giải đấu
const searchResults = await tournamentController.searchTournaments('League of Legends');
```

#### Tạo giải đấu (requires organizer/admin role)
```javascript
await tournamentController.createTournament({
    name: 'Giải đấu LOL 2024',
    description: 'Giải đấu League of Legends lớn nhất năm',
    game: 'League of Legends',
    startDate: '2024-06-01T10:00:00Z',
    endDate: '2024-06-03T18:00:00Z',
    maxParticipants: 64,
    prizePool: 10000000
});
```

#### Đăng ký tham gia giải đấu
```javascript
await tournamentController.registerForTournament('tournament-id-123');
```

### 4. News Management

#### Lấy tin tức
```javascript
import { newsController } from './controllers/news.js';

// Lấy tất cả tin tức
const news = await newsController.getAllNews();

// Lấy tin tức nổi bật
const featured = await newsController.getFeaturedNews();

// Lấy tin tức theo category
const gameNews = await newsController.getNewsByCategory('game-updates');
```

#### Tạo tin tức (requires organizer/admin role)
```javascript
await newsController.createNews({
    title: 'Thông báo giải đấu mới',
    content: 'Nội dung chi tiết về giải đấu...',
    category: 'announcements',
    featured: true,
    tags: ['tournament', 'announcement']
});
```

## Form Integration

### Auto-save Functionality

Để enable auto-save cho form:

```html
<form id="tournamentForm" data-autosave>
    <input name="name" type="text" placeholder="Tên giải đấu">
    <textarea name="description" placeholder="Mô tả"></textarea>
    <button type="submit">Lưu</button>
</form>
```

### Form Event Handling

Hệ thống tự động bind các form handlers:

```javascript
// Tournament creation form
<form id="createTournamentForm">
    <!-- Form fields -->
</form>

// News creation form  
<form id="createNewsForm">
    <!-- Form fields -->
</form>
```

## Role-based Access Control

### HTML Elements

Sử dụng CSS classes để kiểm soát hiển thị:

```html
<!-- Chỉ admin mới thấy -->
<div class="admin-only">
    <button>Admin Panel</button>
</div>

<!-- Organizer và admin mới thấy -->
<div class="organizer-only">
    <button>Tạo giải đấu</button>
</div>
```

### JavaScript Checks

```javascript
// Kiểm tra role trong code
if (authController.isAdmin()) {
    // Admin functionality
} else if (authController.isOrganizer()) {
    // Organizer functionality
}
```

## Error Handling

### API Errors

Hệ thống tự động xử lý các lỗi API:

```javascript
try {
    const result = await apiCall('/api/tournaments', data, 'POST', true);
} catch (error) {
    // Lỗi đã được hiển thị tự động cho user
    // Có thể thêm xử lý custom tại đây
}
```

### Authentication Errors

Khi token hết hạn hoặc không hợp lệ:
- Tự động redirect đến trang login
- Clear local storage
- Hiển thị thông báo phù hợp

## Notification System

### Hiển thị thông báo

```javascript
// Success message
authController.showSuccess('Thao tác thành công!');

// Error message  
authController.showError('Có lỗi xảy ra!');

// Info message
authController.showNotification('Thông tin', 'info');
```

## Page-specific Initialization

Mỗi trang có thể có logic khởi tạo riêng:

```javascript
// Trong app.js
async initTournamentDetailPage() {
    const tournamentId = this.getURLParameter('id');
    if (tournamentId) {
        await this.controllers.tournaments.getTournamentById(tournamentId);
    }
}
```

## Configuration

### API Base URL

Cấu hình trong `api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Endpoints

Tất cả endpoints được định nghĩa trong `API_ENDPOINTS`:

```javascript
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        // ...
    },
    TOURNAMENTS: {
        BASE: '/tournaments',
        BY_ID: (id) => `/tournaments/${id}`,
        // ...
    }
};
```

## Best Practices

### 1. Sử dụng Controllers
Luôn sử dụng controllers thay vì gọi API trực tiếp:

```javascript
// ✅ Tốt
await tournamentController.getAllTournaments();

// ❌ Không nên
await apiCall('/api/tournaments');
```

### 2. Error Handling
Luôn wrap async calls trong try-catch:

```javascript
try {
    await someAsyncOperation();
} catch (error) {
    // Handle error appropriately
}
```

### 3. Authentication Checks
Kiểm tra authentication trước khi thực hiện operations quan trọng:

```javascript
if (!authController.isAuthenticated()) {
    window.location.href = '/login.html';
    return;
}
```

### 4. Role Validation
Validate user roles cho các operations nhạy cảm:

```javascript
if (!authController.isOrganizer() && !authController.isAdmin()) {
    authController.showError('Bạn không có quyền thực hiện thao tác này');
    return;
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Đảm bảo backend đã config CORS đúng
2. **Token Expired**: Hệ thống sẽ tự động redirect đến login
3. **Network Errors**: Kiểm tra kết nối và API server status
4. **Role Access**: Đảm bảo user có đúng role để thực hiện action

### Debug Tools

```javascript
// Check authentication state
console.log('Authenticated:', TokenManager.isAuthenticated());
console.log('Current user:', authController.getCurrentUser());

// Check API health
const health = await apiCall('/health');
console.log('API Status:', health);
```

## Migration từ hệ thống cũ

Để migrate từ hệ thống cũ:

1. Replace old API calls với new controllers
2. Update form handlers
3. Add proper error handling
4. Implement role-based access control
5. Test all functionality

## Support

Nếu gặp vấn đề trong quá trình tích hợp:

1. Kiểm tra browser console cho errors
2. Verify API endpoints
3. Check authentication state
4. Validate user roles
5. Review network requests trong DevTools