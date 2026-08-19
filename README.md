# ⚡ Chạy Trên Dây Điện - Circuit Defender

## 🎮 Giới Thiệu Trò Chơi

"Chạy Trên Dây Điện" là một trò chơi platformer siêu nhẹ nơi bạn đóng vai một electron chạy trên dây điện, tránh các vật cản để duy trì dòng điện.

## ✨ Tính Năng Chính

- **Gameplay đơn giản nhưng gây nghiện**: Tự động chạy, người chơi chỉ cần nhảy hoặc trượt
- **Đồ họa neon đẹp mắt**: Chủ đề điện với màu xanh, vàng, xanh lá phát sáng
- **Hệ thống vật cản đa dạng**: Cách điện, đoản mạch, cầu dao
- **Đồ sưu tập**: Electron (tăng năng lượng), Pin (thêm mạng)
- **Hệ thống combo**: Tránh vật cản liên tiếp để tăng điểm
- **Hiệu ứng âm thanh**: Tia lửa, âm thanh khi va chạm
- **Lưu điểm cao nhất**: Tự động lưu kỷ lục của bạn

## 🎯 Cách Chơi

### Điều Khiển Bàn Phím
- **⬆️ Mũi tên lên / Space / W**: Nhảy
- **⬇️ Mũi tên xuống / S**: Trượt xuống
- **Escape**: Tạm dừng

### Điều Khiển Cảm Ứng
- **Chạm phía trên màn hình**: Nhảy
- **Chạm phía dưới màn hình**: Trượt

## ⚡ Vật Cản

- **🔌 Cách Điện**: Giảm 25% năng lượng
- **⚡ Đoản Mạch**: Mất 1 mạng
- **🔧 Cầu Dao**: Giảm 35% năng lượng và mất 1 mạng

## 🎁 Đồ Sưu Tập

- **💚 Electron (e-)**: +15 năng lượng, +25 điểm
- **💛 Pin (⚡)**: +1 mạng, +50 điểm

## 🏆 Hệ Thống Điểm

- Tránh vật cản: +10 điểm
- Combo liên tiếp: +5 điểm cho mỗi lần combo
- Thu thập electron: +25 điểm
- Thu thập pin: +50 điểm

## 🚀 Cài Đặt

```bash
npm install
npm run dev
```

Truy cập `http://localhost:3000` trong trình duyệt của bạn.

## 🛠️ Công Nghệ

- **React 19**: Framework UI
- **TypeScript**: An toàn loại
- **Vite**: Công cụ xây dựng nhanh
- **Tailwind CSS**: Styling
- **Canvas API**: Đồ họa game 2D
- **Web Audio API**: Hiệu ứng âm thanh

## 📁 Cấu Trúc Dự Án

```
circuit-defender/
├── src/
│   ├── components/
│   │   ├── GameCanvas.tsx      # Canvas game chính
│   │   ├── StartScreen.tsx     # Màn hình bắt đầu
│   │   └── GameOverScreen.tsx  # Màn hình kết thúc
│   ├── App.tsx                 # Component chính
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
└── vite.config.ts
```

## 🎨 Đặc Thiết Kế

- **Chủ đề màu**: Đen (#0a0a1a) với hiệu ứng neon
- **Màu xanh điện** (#00d4ff): Electron và hiệu ứng chính
- **Màu vàng** (#ffd700): Pin và combo
- **Màu xanh lá** (#00ff88): Thu thập và năng lượng
- **Hiệu ứng**: Độ sáng, độ mờ, và tia lửa điện

## 📱 Responsive Design

Trò chơi hoạt động tốt trên:
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

## 🎮 Trạng Thái Game

- **idle**: Màn hình chào mừng
- **playing**: Đang chơi
- **paused**: Tạm dừng
- **gameover**: Kết thúc game

## 🔧 Tùy Chình

- Tốc độ game tăng dần theo thời gian
- Độ khó vật cản tăng theo điểm số
- Hệ thống combo khuyến khích chơi mượt

## 📊 Lưu Trữ

Điểm cao nhất được lưu trữ trong localStorage với key: `circuitDefenderHighScore`

## 🎯 Kỹ Thuật Game

- **Game Loop**: requestAnimationFrame cho mượt 60fps
- **Collision Detection**: AABB (Axis-Aligned Bounding Box)
- **Particle System**: Hiệu ứng tia lửa điện
- **Canvas 2D**: Không cần physics engine
- **Sound Synthesis**: Web Audio API cho âm thanh thực-time

## 🌟 Tương Lai

- [ ] Thêm màn (levels)
- [ ] Boss battle
- [ ] Multiplayer
- [ ] Leaderboard online
- [ ] Thematic skins

## 📄 Giấy Phép

SPDX-License-Identifier: Apache-2.0

---

**Thưởng thức việc chạy trên dây điện! ⚡🎮**
