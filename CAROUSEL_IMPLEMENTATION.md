# Carousel Implementation Guide

## Tổng quan

Đã triển khai hệ thống carousel cho tin tức và giải đấu với khả năng lướt trái phải, hiển thị dữ liệu từ backend.

## Tính năng đã triển khai

### 1. Carousel cho Giải đấu
- Hiển thị 3 giải đấu mỗi trang
- Nút điều hướng trái/phải
- Dots indicator để chuyển trang
- Hiệu ứng fade khi chuyển trang
- Tự động load giải đang diễn ra, fallback sang giải sắp diễn ra

### 2. Carousel cho Tin tức
- Hiển thị 3 tin tức mỗi trang
- Nút điều hướng trái/phải
- Dots indicator để chuyển trang
- Hiệu ứng fade khi chuyển trang
- Load tin tức mới nhất từ backend

### 3. Tính năng chung
- Responsive design
- Loading states
- Error handling
- Smooth transitions

## Cấu trúc file

```
src/
├── frontend/
│   ├── dashboard.html          # Trang dashboard với carousel
│   ├── js/
│   │   ├── carousel.js         # Carousel class và logic
│   │   ├── views/
│   │   │   └── guestView.js    # Guest view với carousel
│   │   └── api.js              # API calls
│   └── assets/
│       └── styles/
│           ├── dashboard.css   # Dashboard styles
│           └── carousel.css    # Carousel styles
└── backend/
    └── data/
        ├── tournaments.json    # Dữ liệu giải đấu
        └── news.json          # Dữ liệu tin tức
```

## Cách sử dụng

### 1. Trong Dashboard
```javascript
// Tự động load khi trang được load
loadTournaments();  // Load giải đấu
loadNews();         // Load tin tức
```

### 2. Trong Guest View
```javascript
// Tự động load khi render guest view
loadTournaments();  // Load giải đấu
loadNews();         // Load tin tức
```

### 3. Sử dụng Carousel Class
```javascript
import { createCarousel } from './js/carousel.js';

// Tạo tournament carousel
const tournamentCarousel = createCarousel('tournament', 'containerId', {
  itemsPerPage: 3
});
tournamentCarousel.setItems(tournaments);

// Tạo news carousel
const newsCarousel = createCarousel('news', 'containerId', {
  itemsPerPage: 3
});
newsCarousel.setItems(news);
```

## HTML Structure

### Tournament Carousel
```html
<section class="tournament-section">
  <div class="section-header">
    <h2 class="section-title">Các giải đấu đang diễn ra</h2>
    <div class="section-controls">
      <button class="nav-arrow nav-arrow-left" data-carousel-prev="tournamentContainer">
        <!-- SVG arrow -->
      </button>
      <button class="nav-arrow nav-arrow-right" data-carousel-next="tournamentContainer">
        <!-- SVG arrow -->
      </button>
    </div>
  </div>
  
  <div class="tournament-carousel">
    <div class="tournament-container" id="tournamentContainer">
      <!-- Tournament cards will be inserted here -->
    </div>
  </div>
  
  <div class="carousel-indicator">
    <div class="indicator-dots" data-carousel-dots="tournamentContainer">
      <!-- Dots will be generated here -->
    </div>
  </div>
</section>
```

### News Carousel
```html
<section class="news-section">
  <div class="section-container">
    <div class="section-header">
      <h2 class="section-title">TIN TỨC MỚI NHẤT</h2>
      <div class="section-controls">
        <button class="nav-arrow nav-arrow-left" data-carousel-prev="newsContainer">
          <!-- SVG arrow -->
        </button>
        <button class="nav-arrow nav-arrow-right" data-carousel-next="newsContainer">
          <!-- SVG arrow -->
        </button>
      </div>
    </div>
    
    <div class="news-carousel">
      <div class="news-container" id="newsContainer">
        <!-- News cards will be inserted here -->
      </div>
    </div>
    
    <div class="carousel-indicator">
      <div class="indicator-dots" data-carousel-dots="newsContainer">
        <!-- Dots will be generated here -->
      </div>
    </div>
  </div>
</section>
```

## API Endpoints

### Tournaments
- `GET /api/tournaments/ongoing` - Lấy giải đang diễn ra
- `GET /api/tournaments/upcoming` - Lấy giải sắp diễn ra

### News
- `GET /api/news/published` - Lấy tin tức đã xuất bản

## CSS Classes

### Carousel Controls
- `.nav-arrow` - Nút điều hướng
- `.nav-arrow-left` - Nút trái
- `.nav-arrow-right` - Nút phải
- `.nav-arrow:disabled` - Trạng thái vô hiệu hóa

### Indicators
- `.indicator-dots` - Container cho dots
- `.dot` - Dot indicator
- `.dot.active` - Dot đang active

### Content
- `.tournament-container` - Container cho giải đấu
- `.news-container` - Container cho tin tức
- `.loading-placeholder` - Loading state

## Responsive Design

Carousel tự động điều chỉnh cho các kích thước màn hình:
- Desktop: 3 items per page
- Tablet: 2 items per page
- Mobile: 1 item per page

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Carousel không hoạt động
1. Kiểm tra console errors
2. Đảm bảo API endpoints hoạt động
3. Kiểm tra data attributes trong HTML

### Dữ liệu không hiển thị
1. Kiểm tra network tab
2. Đảm bảo backend server đang chạy
3. Kiểm tra format dữ liệu JSON

### Navigation buttons không hoạt động
1. Kiểm tra data-carousel-prev/next attributes
2. Đảm bảo container ID đúng
3. Kiểm tra JavaScript errors