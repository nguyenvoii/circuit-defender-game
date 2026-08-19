import { GameMap, TowerConfig, FaultConfig, WaveData } from '../types';

export const MAPS: GameMap[] = [
  {
    id: 'map_straight_circuit',
    name: 'Tuyến Dây 01: Đường Thẳng Cơ Bản',
    difficulty: 'Dễ',
    description: 'Đường dây điện chạy từ trạm phát phía Tây sang trạm biến áp trung tâm phía Đông. Dễ dàng bố trí trụ hai bên.',
    gridSize: 5,
    paths: [
      [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 }
      ]
    ],
    substation: { row: 2, col: 4 },
    entries: [{ row: 2, col: 0 }]
  },
  {
    id: 'map_u_bend',
    name: 'Tuyến Dây 02: Uốn Cong Chữ U',
    difficulty: 'Trung bình',
    description: 'Dây dẫn uốn cong qua các góc lưới 5x5, tạo thêm nhiều vị trí đặt trụ kiểm soát góc cua hiểm hóc.',
    gridSize: 5,
    paths: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 3 },
        { row: 2, col: 3 },
        { row: 2, col: 1 },
        { row: 3, col: 1 },
        { row: 4, col: 1 },
        { row: 4, col: 2 },
        { row: 4, col: 3 },
        { row: 4, col: 4 }
      ]
    ],
    substation: { row: 4, col: 4 },
    entries: [{ row: 0, col: 0 }]
  },
  {
    id: 'map_dual_feed',
    name: 'Tuyến Dây 03: Hội Tụ Song Hành',
    difficulty: 'Khó',
    description: 'Hai nguồn sự cố cùng ập vào từ hai phía Bắc và Nam hội tụ về Trạm Biến Áp trung tâm.',
    gridSize: 5,
    paths: [
      [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 2, col: 2 }
      ],
      [
        { row: 4, col: 3 },
        { row: 3, col: 3 },
        { row: 2, col: 3 },
        { row: 2, col: 2 }
      ]
    ],
    substation: { row: 2, col: 2 },
    entries: [{ row: 0, col: 1 }, { row: 4, col: 3 }]
  },
  {
    id: 'map_zigzag_complex',
    name: 'Tuyến Dây 04: Mạng Lưới Zic-Zac',
    difficulty: 'Chuyên gia',
    description: 'Tuyến truyền tải cao thế dài chạy ngoằn ngoèo qua toàn bộ lưới điện 5x5, tần suất sự cố dày đặc.',
    gridSize: 5,
    paths: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 4 },
        { row: 1, col: 4 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 2, col: 4 },
        { row: 3, col: 4 },
        { row: 3, col: 0 },
        { row: 4, col: 0 },
        { row: 4, col: 4 }
      ]
    ],
    substation: { row: 4, col: 4 },
    entries: [{ row: 0, col: 0 }]
  }
];

export const TOWERS: Record<string, TowerConfig> = {
  circuit_breaker: {
    type: 'circuit_breaker',
    name: 'Circuit Breaker',
    nameVi: 'Cầu Dao Tự Động (CB)',
    symbol: '—/ —',
    description: 'Bắn xung điện triệt tiêu đơn mục tiêu với tốc độ cao, phản ứng cực nhanh.',
    baseCost: 100,
    baseDamage: 25,
    baseRange: 1.5,
    baseFireRate: 2.2, // shots/sec
    attackType: 'single_pulse',
    color: '#06b6d4', // Cyan
    accentColor: '#67e8f9',
    upgrades: [
      {
        level: 2,
        cost: 80,
        damageMultiplier: 1.5,
        rangeMultiplier: 1.15,
        fireRateMultiplier: 1.25,
        description: 'Tăng dòng cắt định mức: +50% Sát thương, +25% Tốc bắn'
      },
      {
        level: 3,
        cost: 140,
        damageMultiplier: 2.3,
        rangeMultiplier: 1.35,
        fireRateMultiplier: 1.6,
        description: 'Cầu dao bán dẫn siêu tốc: +130% Sát thương, Tầm bắn rộng'
      }
    ]
  },
  grounding_rod: {
    type: 'grounding_rod',
    name: 'Grounding Rod',
    nameVi: 'Hệ Thống Tiếp Địa',
    symbol: '⏚',
    description: 'Phát sóng xả điện diện rộng 360°, làm chậm 40% và gây sát thương toàn bộ sự cố xung quanh.',
    baseCost: 140,
    baseDamage: 18,
    baseRange: 1.4,
    baseFireRate: 1.1,
    attackType: 'area_discharge',
    color: '#10b981', // Emerald
    accentColor: '#6ee7b7',
    upgrades: [
      {
        level: 2,
        cost: 100,
        damageMultiplier: 1.45,
        rangeMultiplier: 1.25,
        fireRateMultiplier: 1.2,
        description: 'Mạng lưới bãi cọc đồng: +45% Sát thương lan, Tăng bán kính xả'
      },
      {
        level: 3,
        cost: 180,
        damageMultiplier: 2.2,
        rangeMultiplier: 1.5,
        fireRateMultiplier: 1.4,
        description: 'Tiếp địa đẳng thế sâu: Khử 60% tốc độ di chuyển, Sát thương lan mạnh'
      }
    ]
  },
  surge_protector: {
    type: 'surge_protector',
    name: 'Surge Protector',
    nameVi: 'Bộ Chống Sét & Quá Tải',
    symbol: '⚡⟡',
    description: 'Phát tia laser cao tần công suất cực lớn, chuyên khắc chế các khối quá tải và sét đánh mạnh.',
    baseCost: 200,
    baseDamage: 65,
    baseRange: 2.0,
    baseFireRate: 1.0,
    attackType: 'laser_beam',
    color: '#eab308', // Amber / Gold
    accentColor: '#fef08a',
    upgrades: [
      {
        level: 2,
        cost: 150,
        damageMultiplier: 1.6,
        rangeMultiplier: 1.2,
        fireRateMultiplier: 1.2,
        description: 'Van chống sét oxit kim loại (MOV): +60% Sát thương xung'
      },
      {
        level: 3,
        cost: 250,
        damageMultiplier: 2.5,
        rangeMultiplier: 1.4,
        fireRateMultiplier: 1.5,
        description: 'Chống sét plasma quang học: Xuyên phá mọi điểm quá tải'
      }
    ]
  },
  thermal_relay: {
    type: 'thermal_relay',
    name: 'Thermal Relay',
    nameVi: 'Rơ-Le Nhiệt Cảm Ứng',
    symbol: '∫dt',
    description: 'Tấn công tầm xa, để lại hiệu ứng cháy nhiệt gây tiêu hao năng lượng sự cố liên tục trong 3s.',
    baseCost: 160,
    baseDamage: 20,
    baseRange: 2.2,
    baseFireRate: 1.5,
    attackType: 'dot_burn',
    color: '#f97316', // Orange
    accentColor: '#fdba74',
    upgrades: [
      {
        level: 2,
        cost: 110,
        damageMultiplier: 1.5,
        rangeMultiplier: 1.2,
        fireRateMultiplier: 1.25,
        description: 'Lưỡng kim nhiệt độ nhạy cao: Tăng thời gian cháy & sát thương thiêu đốt'
      },
      {
        level: 3,
        cost: 190,
        damageMultiplier: 2.3,
        rangeMultiplier: 1.45,
        fireRateMultiplier: 1.5,
        description: 'Cảm biến số vi xử lý: Sát thương nhiệt nhân đôi, tầm bắn siêu xa'
      }
    ]
  }
};

export const FAULTS: Record<string, FaultConfig> = {
  rodent: {
    type: 'rodent',
    name: 'Rodent Cable Damage',
    nameVi: 'Chuột Cắn Vỏ Dây',
    description: 'Sự cố rò rỉ nhẹ do chuột cắn dây, di chuyển nhanh và xuất hiện theo đàn.',
    baseHp: 65,
    speed: 0.85,
    reward: 20,
    damageToGrid: 8,
    color: '#f59e0b',
    radius: 7,
    specialTrait: 'Số lượng đông, tốc độ khá nhanh'
  },
  lightning: {
    type: 'lightning',
    name: 'Lightning Strike',
    nameVi: 'Sét Đánh Trực Tiếp',
    description: 'Xung điện áp tăng vọt bất ngờ do sét lan truyền, tốc độ lướt trên dây cực nhanh.',
    baseHp: 110,
    speed: 1.2,
    reward: 35,
    damageToGrid: 15,
    color: '#ef4444',
    radius: 8,
    specialTrait: 'Tốc độ siêu nhanh, nguy hiểm cho trạm'
  },
  short_circuit: {
    type: 'short_circuit',
    name: 'Short Circuit Arc',
    nameVi: 'Hồ Quang Đoản Mạch',
    description: 'Chập pha đoản mạch sinh nhiệt độ cao, có khả năng làm gián đoạn dòng điện.',
    baseHp: 160,
    speed: 0.75,
    reward: 45,
    damageToGrid: 18,
    color: '#a855f7',
    radius: 9,
    specialTrait: 'Khối năng lượng dày, sát thương nặng'
  },
  overload: {
    type: 'overload',
    name: 'System Overload',
    nameVi: 'Quá Tải Lưới Điện',
    description: 'Dòng điện quá mức chịu đựng của dây, khối năng lượng lớn di chuyển lầm lũi nhưng rất trâu.',
    baseHp: 320,
    speed: 0.5,
    reward: 70,
    damageToGrid: 25,
    color: '#dc2626',
    radius: 12,
    specialTrait: 'Máu cực lớn, gây tụt sụt áp nghiêm trọng'
  },
  solar_storm: {
    type: 'solar_storm',
    name: 'Solar Geomagnetic Storm',
    nameVi: 'Bão Từ Địa Cực (Boss)',
    description: 'Cơn bão từ trường cực đại gây cảm ứng toàn bộ mạng lưới điện quốc gia.',
    baseHp: 900,
    speed: 0.4,
    reward: 200,
    damageToGrid: 45,
    color: '#ec4899',
    radius: 15,
    specialTrait: 'Boss siêu cấp: Máu khổng lồ, kháng làm chậm'
  }
};

export const WAVES: WaveData[] = [
  {
    waveNumber: 1,
    title: 'Đợt 1: Cảnh Báo Chuột Cắn Cáp',
    spawns: [
      { faultType: 'rodent', count: 5, interval: 1.8 }
    ],
    rewardWatts: 80
  },
  {
    waveNumber: 2,
    title: 'Đợt 2: Dông Sét Cục Bộ',
    spawns: [
      { faultType: 'rodent', count: 4, interval: 1.5 },
      { faultType: 'lightning', count: 3, interval: 2.0 }
    ],
    rewardWatts: 100
  },
  {
    waveNumber: 3,
    title: 'Đợt 3: Đỉnh Điểm Giờ Cao Điểm',
    spawns: [
      { faultType: 'overload', count: 2, interval: 3.5 },
      { faultType: 'rodent', count: 6, interval: 1.2 }
    ],
    rewardWatts: 120
  },
  {
    waveNumber: 4,
    title: 'Đợt 4: Hồ Quang Đoản Mạch Rò Rỉ',
    spawns: [
      { faultType: 'short_circuit', count: 4, interval: 2.2 },
      { faultType: 'lightning', count: 4, interval: 1.6 }
    ],
    rewardWatts: 140
  },
  {
    waveNumber: 5,
    title: 'Đợt 5: Sự Cố Liên Hoàn',
    spawns: [
      { faultType: 'overload', count: 3, interval: 3.0 },
      { faultType: 'short_circuit', count: 4, interval: 1.8 },
      { faultType: 'lightning', count: 5, interval: 1.2 }
    ],
    rewardWatts: 170
  },
  {
    waveNumber: 6,
    title: 'Đợt 6: Đàn Chuột Phá Hoại Cao Cấp',
    spawns: [
      { faultType: 'rodent', count: 12, interval: 0.8 },
      { faultType: 'overload', count: 2, interval: 4.0 }
    ],
    rewardWatts: 180
  },
  {
    waveNumber: 7,
    title: 'Đợt 7: Siêu Bão Sét Đánh Ngang',
    spawns: [
      { faultType: 'lightning', count: 9, interval: 1.1 },
      { faultType: 'short_circuit', count: 5, interval: 1.7 }
    ],
    rewardWatts: 200
  },
  {
    waveNumber: 8,
    title: 'Đợt 8: Quá Tải Cực Hạn Toàn Tuyến',
    spawns: [
      { faultType: 'overload', count: 6, interval: 2.2 },
      { faultType: 'rodent', count: 8, interval: 1.0 }
    ],
    rewardWatts: 230
  },
  {
    waveNumber: 9,
    title: 'Đợt 9: Tổng Hợp Mất Cân Bằng Pha',
    spawns: [
      { faultType: 'lightning', count: 8, interval: 1.0 },
      { faultType: 'short_circuit', count: 6, interval: 1.4 },
      { faultType: 'overload', count: 4, interval: 2.5 }
    ],
    rewardWatts: 270
  },
  {
    waveNumber: 10,
    title: 'Đợt 10: BÃO TỪ MẶT TRỜI ĐỔ BỘ (CUỐI)',
    spawns: [
      { faultType: 'solar_storm', count: 1, interval: 0 },
      { faultType: 'lightning', count: 6, interval: 1.8 },
      { faultType: 'overload', count: 4, interval: 2.5 }
    ],
    rewardWatts: 400
  }
];

// Web Audio API Synthesizer sound generator
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playZap(freq = 440, duration = 0.08) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio failure
    }
  }

  playGroundingWave() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }

  playLaser() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  playPlaceTower() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.setValueAtTime(600, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  playExplode() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Ignore
    }
  }

  playAlarm() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.setValueAtTime(450, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }

  playVictory() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.12, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.25);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundFX();
