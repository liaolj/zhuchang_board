import { defineStore } from 'pinia';

import type {
  AlertItem,
  DashboardConfig,
  EnergyMetric,
  FunnelStage,
  KpiMetric,
  PopulationStage,
  ThresholdValue,
  TrendPoint,
  ZoneSummary,
  EquipmentStatus,
} from '@/types/dashboard';

interface DashboardState {
  kpis: KpiMetric[];
  environment: ThresholdValue[];
  alerts: AlertItem[];
  populations: PopulationStage[];
  reproductionFunnel: FunnelStage[];
  fertilityIndicators: KpiMetric[];
  environmentTrends: Record<string, TrendPoint[]>;
  feedingToday: { planned: number; issued: number };
  feedingTrend: TrendPoint[];
  waterToday: number;
  waterTrend: TrendPoint[];
  performance: { adg: number | null; fcr: number | null };
  equipment: EquipmentStatus[];
  energy: EnergyMetric[];
  equipmentHealth: { normal: number; warning: number; critical: number };
  zones: ZoneSummary[];
  config: DashboardConfig;
}

const mockTimeSeries = (base: number, variance: number): TrendPoint[] =>
  Array.from({ length: 24 }, (_, index) => ({
    time: `${index.toString().padStart(2, '0')}:00`,
    value: Math.max(0, Number((base + (Math.random() - 0.5) * variance).toFixed(1))),
  }));

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    kpis: [
      { label: '存栏头数', value: 12850, unit: '头', trend: 'up', delta: 120 },
      { label: '死亡率', value: 1.2, unit: '%', trend: 'down', delta: -0.2 },
      { label: '今日出栏', value: 460, unit: '头', trend: 'up', delta: 45 },
      { label: '平均日增重 ADG', value: 0.78, unit: 'kg', trend: 'flat' },
      { label: '料肉比 FCR', value: 2.45, trend: 'down', delta: -0.05 },
      { label: '今日分娩', value: 38, unit: '窝', trend: 'up', delta: 3 },
    ],
    environment: [
      {
        label: '温度',
        value: 24.5,
        unit: '°C',
        status: 'normal',
        threshold: { min: 18, max: 28 },
      },
      {
        label: '湿度',
        value: 69,
        unit: '%',
        status: 'warning',
        threshold: { min: 55, max: 65 },
      },
      {
        label: '氨气',
        value: 18,
        unit: 'ppm',
        status: 'normal',
        threshold: { max: 25 },
      },
      {
        label: '二氧化碳',
        value: 1600,
        unit: 'ppm',
        status: 'danger',
        threshold: { max: 1500 },
      },
      {
        label: '风速',
        value: 1.8,
        unit: 'm/s',
        status: 'normal',
        threshold: { min: 1.2, max: 2.8 },
      },
    ],
    alerts: [
      {
        id: 'AL-001',
        timestamp: '2025-03-01 09:25',
        module: '环境监控',
        level: 'critical',
        location: '育肥二栋',
        message: '二氧化碳 1600ppm 超出阈值 1500ppm',
      },
      {
        id: 'AL-002',
        timestamp: '2025-03-01 09:12',
        module: '设备监控',
        level: 'warning',
        location: '产房一栋',
        message: '加热灯离线 8 分钟，请排查',
      },
      {
        id: 'AL-003',
        timestamp: '2025-03-01 08:56',
        module: '生产管理',
        level: 'info',
        location: '配怀区',
        message: '计划配种 40 窝，已完成 36 窝',
      },
    ],
    populations: [
      { name: '公猪', count: 220 },
      { name: '后备母猪', count: 880 },
      { name: '妊娠母猪', count: 1320 },
      { name: '哺乳母猪', count: 450 },
      { name: '仔猪', count: 4800 },
      { name: '保育猪', count: 3200 },
      { name: '育肥猪', count: 3980 },
    ],
    reproductionFunnel: [
      { name: '配种', value: 520 },
      { name: '妊检', value: 480 },
      { name: '分娩', value: 420 },
      { name: '断奶', value: 390 },
      { name: '转群', value: 360 },
    ],
    fertilityIndicators: [
      { label: '分娩率', value: 88.5, unit: '%', trend: 'up', delta: 1.5 },
      { label: '窝均活产', value: 11.6, unit: '头', trend: 'flat' },
      { label: '窝均断奶', value: 10.8, unit: '头', trend: 'up', delta: 0.2 },
      { label: '返情率', value: 12.1, unit: '%', trend: 'down', delta: -0.6 },
      { label: '死胎率', value: 4.3, unit: '%', trend: 'down', delta: -0.4 },
    ],
    environmentTrends: {
      temperature: mockTimeSeries(24, 2),
      humidity: mockTimeSeries(70, 4),
      ammonia: mockTimeSeries(16, 6),
      co2: mockTimeSeries(1500, 200),
      airflow: mockTimeSeries(1.5, 0.6),
    },
    feedingToday: { planned: 12.5, issued: 11.2 },
    feedingTrend: mockTimeSeries(10, 3),
    waterToday: 168,
    waterTrend: mockTimeSeries(160, 20),
    performance: { adg: 0.78, fcr: 2.45 },
    equipment: [
      { name: '自动饲喂器 A1', status: 'online', location: '育肥一栋' },
      { name: '通风机 B3', status: 'fault', location: '育肥二栋' },
      { name: '污水泵 C2', status: 'online', location: '后勤区' },
      { name: '温控面板 D1', status: 'offline', location: '产房二栋' },
      { name: '备用发电机 E1', status: 'online', location: '能源中心' },
    ],
    energy: [
      { label: '用电量', value: 3250, unit: 'kWh' },
      { label: '用水量', value: 180, unit: 'm³' },
      { label: '用气量', value: 920, unit: 'Nm³' },
    ],
    equipmentHealth: { normal: 42, warning: 6, critical: 2 },
    zones: [
      {
        id: 'zone-1',
        name: '配怀区',
        healthIndex: 86,
        alerts: 2,
        environment: { label: '温度', value: 23.8, status: 'normal' },
        equipment: { online: 12, fault: 1 },
        livestock: 860,
      },
      {
        id: 'zone-2',
        name: '产房区',
        healthIndex: 74,
        alerts: 3,
        environment: { label: '湿度', value: 71, status: 'warning' },
        equipment: { online: 18, fault: 2 },
        livestock: 620,
      },
      {
        id: 'zone-3',
        name: '保育区',
        healthIndex: 81,
        alerts: 1,
        environment: { label: '氨气', value: 17, status: 'normal' },
        equipment: { online: 22, fault: 0 },
        livestock: 1980,
      },
      {
        id: 'zone-4',
        name: '育肥区',
        healthIndex: 69,
        alerts: 4,
        environment: { label: '二氧化碳', value: 1600, status: 'danger' },
        equipment: { online: 20, fault: 3 },
        livestock: 3200,
      },
    ],
    config: {
      refresh: {
        realtime: 45,
        statistics: 600,
        alerts: 30,
      },
    },
  }),
});
