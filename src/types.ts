export type Point = {
  x: number;
  y: number;
};

export type GridCoord = {
  row: number;
  col: number;
};

export type CellType = 'empty' | 'wire' | 'substation' | 'entry';

export type WireSegment = {
  from: GridCoord;
  to: GridCoord;
};

export type GameMap = {
  id: string;
  name: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó' | 'Chuyên gia';
  description: string;
  gridSize: number; // usually 5
  // Path as an ordered sequence of grid coords or multi-path
  paths: GridCoord[][];
  substation: GridCoord;
  entries: GridCoord[];
};

export type TowerType = 'circuit_breaker' | 'grounding_rod' | 'surge_protector' | 'thermal_relay';

export type TowerConfig = {
  type: TowerType;
  name: string;
  nameVi: string;
  symbol: string; // Electrical schematic symbol code or short name
  description: string;
  baseCost: number;
  baseDamage: number;
  baseRange: number; // In grid units
  baseFireRate: number; // attacks per second
  attackType: 'single_pulse' | 'area_discharge' | 'laser_beam' | 'dot_burn';
  color: string;
  accentColor: string;
  upgrades: {
    level: number;
    cost: number;
    damageMultiplier: number;
    rangeMultiplier: number;
    fireRateMultiplier: number;
    description: string;
  }[];
};

export type PlacedTower = {
  id: string;
  type: TowerType;
  row: number;
  col: number;
  level: number;
  lastFiredAt: number;
  targetId: string | null;
  totalDamageDealt: number;
  kills: number;
};

export type FaultType = 'lightning' | 'overload' | 'rodent' | 'short_circuit' | 'solar_storm';

export type FaultConfig = {
  type: FaultType;
  name: string;
  nameVi: string;
  description: string;
  baseHp: number;
  speed: number; // grid cells per second
  reward: number; // Watts
  damageToGrid: number; // % damage to substation
  color: string;
  radius: number;
  specialTrait: string;
};

export type ActiveFault = {
  id: string;
  type: FaultType;
  hp: number;
  maxHp: number;
  pathIndex: number; // which path index
  currentSegment: number; // current segment index
  progressInSegment: number; // 0 to 1
  x: number; // calculated world x
  y: number; // calculated world y
  speed: number;
  slowTimer: number; // duration of slow effect
  burnTimer: number; // duration of burn
  burnDamagePerSec: number;
  isDead: boolean;
  reachedEnd: boolean;
};

export type Projectile = {
  id: string;
  towerId: string;
  targetId: string;
  sourceX: number;
  sourceY: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  speed: number;
  damage: number;
  color: string;
  type: 'pulse' | 'beam' | 'wave' | 'spark';
  duration?: number;
  createdAt: number;
};

export type Particle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  alpha: number;
};

export type DamageIndicator = {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
};

export type WaveData = {
  waveNumber: number;
  spawns: {
    faultType: FaultType;
    count: number;
    interval: number; // seconds between spawns
    pathIndex?: number;
  }[];
  rewardWatts: number;
  title: string;
};

export type GameStatus = 'idle' | 'playing' | 'paused' | 'wave_cleared' | 'victory' | 'game_over';
