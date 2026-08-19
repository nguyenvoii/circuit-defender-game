# 🧪 Hướng Dẫn Kiểm Thử Game - Testing Guide

## 🎯 Tóm Tắt Tính Năng Đã Triển Khai

### ✅ Core Gameplay Mechanics
- [x] **Auto-running platformer**: Electron tự động chạy về phía trước
- [x] **Jump mechanic**: Nhảy để tránh vật cản (Space/↑/W hoặc touch)
- [x] **Slide mechanic**: Trượt xuống để tránh vật cản cao (S/↓ hoặc touch)
- [x] **Gravity physics**: Electron rơi tự nhiên sau khi nhảy
- [x] **Collision detection**: Phát hiện va chạm chính xác với vật cản

### ✅ Obstacles (Vật Cản)
- [x] **Insulator (Cách Điện)**: -25% năng lượng, màu nâu (#8b4513)
- [x] **Short Circuit (Đoản Mạch)**: -1 mạng, màu cam (#ff6b35), hiệu ứng tia lửa
- [x] **Circuit Breaker (Cầu Dao)**: -35% năng lượng + -1 mạng, màu xám (#4a5568)

### ✅ Collectibles (Đồ Sưu Tập)
- [x] **Electron (e-)**: +15 năng lượng, +25 điểm, màu xanh lá (#00ff88)
- [x] **Battery (⚡)**: +1 mạng, +50 điểm, màu vàng (#ffd700)
- [x] **Pulse animation**: Hiệu ứng nhấp nháy cho đồ sưu tập

### ✅ Game Systems
- [x] **Score system**: Điểm tăng theo thời gian và vật cản tránh được
- [x] **Combo system**: Combo cho việc tránh vật cản liên tiếp (+5 điểm/combo)
- [x] **Energy system**: Năng lượng bắt đầu 100%, giảm khi va chạm
- [x] **Lives system**: Bắt đầu với 3 mạng, thu thập pin để thêm mạng
- [x] **High score storage**: Lưu điểm cao nhất vào localStorage
- [x] **Difficulty progression**: Tốc độ game tăng dần theo thời gian

### ✅ Visual Effects
- [x] **Neon theme**: Màu neon (xanh #00d4ff, vàng #ffd700, xanh lá #00ff88)
- [x] **Electron glow**: Hiệu ứng phát sáng quanh electron
- [x] **Particle system**: Hiệu ứng hạt khi nhảy, va chạm, thu thập
- [x] **Spark effects**: Tia lửa khi va chạm với vật cản
- [x] **Trail effect**: Đường thẳng khi nhảy hoặc trượt
- [x] **Circuit background**: Nền mạch điện với lưới và dây dẫn
- [x] **Wire glow**: Dây điện phát sáng theo nhịp

### ✅ Audio Effects
- [x] **Jump sound**: Âm thanh khi nhảy
- [x] **Slide sound**: Âm thanh khi trượt
- [x] **Collect sound**: Âm thanh khi thu thập đồ
- [x] **Hit sound**: Âm thanh khi va chạm vật cản
- [x] **Game over sound**: Âm thanh khi kết thúc game

### ✅ UI/UX
- [x] **Start screen**: Màn hình bắt đầu với hướng dẫn
- [x] **Game screen**: Canvas game với UI overlay
- [x] **Game over screen**: Màn hình kết thúc với điểm số
- [x] **Responsive design**: Hoạt động trên desktop và mobile
- [x] **Control hints**: Hướng dẫn điều khiển trực quan
- [x] **Score display**: Hiển thị điểm, năng lượng, mạng
- [x] **Combo indicator**: Hiển thị combo khi đạt được
- [x] **High score display**: Hiển thị điểm cao nhất

### ✅ Controls
- [x] **Keyboard**: Arrow keys, Space, W/S keys
- [x] **Touch**: Touch upper/lower half of screen
- [x] **Escape**: Pause functionality (navigates to menu)

## 🧪 Test Cases

### Test 1: Basic Gameplay
1. Mở game tại `http://localhost:3002`
2. Click "BẮT ĐẦU CHƠI"
3. Electron tự động chạy
4. Nhấn Space để nhảy
5. Observe: Electron nhảy lên và rơi xuống

### Test 2: Obstacle Collision
1. Chạy game
2. Đợi vật cản xuất hiện
3. ĐỂ electron va chạm với vật cản
4. Observe:
   - Insulator: -25% năng lượng
   - Short circuit: -1 mạng
   - Circuit breaker: Cả hai

### Test 3: Collectibles
1. Chạy game
2. Nhảy để thu thập electron
3. Observe: +15 năng lượng, +25 điểm
4. Thu thập pin
5. Observe: +1 mạng, +50 điểm

### Test 4: Combo System
1. Tránh nhiều vật cản liên tiếp
2. Observe: Combo counter tăng (2x, 3x, etc.)
3. Observe: Điểm cộng thêm cho mỗi combo

### Test 5: Game Over
1. Va chạm vật cản đến khi mạng = 0
2. Observe: Game over screen xuất hiện
3. Observe: Điểm số hiển thị chính xác
4. Click "CHƠI LẠI"
5. Observe: Game bắt đầu lại từ đầu

### Test 6: High Score
1. Chơi và đạt điểm cao
2. Để game over
3. Click "TRỞ VỀ MENU CHÍNH"
4. Observe: Điểm cao nhất hiển thị

### Test 7: Mobile Controls
1. Resize browser to mobile width
2. Chạm upper half of screen
3. Observe: Electron nhảy
4. Chạm lower half of screen
5. Observe: Electron trượt

### Test 8: Audio
1. Mở game với volume bật
2. Nhảy, trượt, thu thập, va chạm
3. Observe: Âm thanh tương ứng phát

### Test 9: Visual Effects
1. Chạy game và observe:
   - Electron glow
   - Particles khi nhảy
   - Sparks khi va chạm
   - Trail khi di chuyển
   - Pulse animation trên collectibles
   - Circuit background animation

### Test 10: Performance
1. Chạy game trong 5 phút
2. Observe: FPS duy trì ~60fps
3. Observe: Không có memory leaks
4. Observe: Game mượt mà

## 🎯 Expected Results

- Game starts without errors
- All controls work responsively
- Collision detection is accurate
- Sound effects play correctly
- Visual effects render smoothly
- Score updates in real-time
- High scores persist across sessions
- Mobile/touch controls work
- Game difficulty increases over time

## 🐛 Known Issues & Limitations

- Web Audio API requires user interaction to unlock (first click/touch)
- Mobile browsers may have different touch behavior
- Some older browsers may not support all Canvas features

## ✅ Success Criteria

- [x] All core mechanics work as specified
- [x] All 3 obstacle types implemented
- [x] Both collectible types work
- [x] Score, energy, and lives systems functional
- [x] High score storage works
- [x] All visual effects implemented
- [x] All sound effects implemented
- [x] Mobile responsive design
- [x] No build errors
- [x] Game is fun and challenging!

---

**Game Status**: ✅ FULLY FUNCTIONAL & READY TO PLAY
