export const kpiSummary = {
  livestock: 12850,
  mortalityRate: 0.18,
  marketable: 620,
  adg: 0.72,
  fcr: 2.55,
  breeding: { mating: 180, farrowing: 65, weaning: 520 }
};

export const environmentSnapshot = {
  temperature: 27.1,
  humidity: 68,
  ammonia: 12,
  co2: 1850,
  wind: 1.8
};

export const productionInventory = [
  { stage: '公猪', value: 180 },
  { stage: '后备母猪', value: 420 },
  { stage: '空怀母猪', value: 610 },
  { stage: '妊娠母猪', value: 1380 },
  { stage: '哺乳母猪', value: 520 },
  { stage: '保育仔猪', value: 3150 },
  { stage: '二期育肥', value: 4120 },
  { stage: '出栏待运', value: 430 }
];

export const reproductionFunnel = [
  { step: '配种', value: 820 },
  { step: '妊检', value: 760 },
  { step: '分娩', value: 690 },
  { step: '断奶', value: 655 },
  { step: '转群', value: 640 }
];

export const reproductionIndicators = {
  farrowingRate: 87.4,
  litterLive: 12.6,
  litterWeaned: 11.1,
  returnRate: 6.1,
  stillbornRate: 1.9
};

export const feedingToday = {
  feed: { actual: 56.8, plan: 60.0 },
  water: { actual: 112.5 }
};

export const trend7Days = {
  feed: [51, 49, 54, 55, 56, 58, 59],
  water: [100, 105, 108, 110, 109, 113, 112]
};

export const equipmentStatus = [
  { name: '料塔监控', status: 'online' },
  { name: '通风控制器', status: 'warning' },
  { name: '环控主机', status: 'online' },
  { name: '备用发电机', status: 'offline' },
  { name: '饮水监控', status: 'online' }
];

export const energyUsage = {
  power: 1890,
  water: 112.5,
  gas: 86
};

export const deviceHealth = {
  normal: 42,
  attention: 5,
  abnormal: 2
};

export const alerts = [
  {
    id: 1,
    level: 'critical',
    module: '环境',
    location: '7#育肥舍',
    message: '氨气浓度 19 ppm 超阈值 15 ppm',
    time: '11:26'
  },
  {
    id: 2,
    level: 'warning',
    module: '设备',
    location: '备用发电机',
    message: '例行自检未完成',
    time: '11:18'
  },
  {
    id: 3,
    level: 'info',
    module: '生产',
    location: '4#妊娠舍',
    message: '配种转群 35 头待确认',
    time: '11:05'
  },
  {
    id: 4,
    level: 'warning',
    module: '饲喂',
    location: '2#料塔',
    message: '剩余料位 18% 低于阈值 20%',
    time: '10:58'
  }
];

export const zoneList = [
  {
    name: '1# 妊娠舍',
    healthIndex: 92,
    alerts: 0,
    environment: { temperature: 26.8, humidity: 66 },
    livestock: 420
  },
  {
    name: '2# 妊娠舍',
    healthIndex: 88,
    alerts: 1,
    environment: { temperature: 27.5, humidity: 70 },
    livestock: 405
  },
  {
    name: '5# 产房',
    healthIndex: 85,
    alerts: 2,
    environment: { temperature: 28.3, humidity: 74 },
    livestock: 360
  },
  {
    name: '7# 育肥舍',
    healthIndex: 77,
    alerts: 3,
    environment: { temperature: 29.6, humidity: 78 },
    livestock: 860
  }
];

export const heatmapCells = [
  { zone: '1# 妊娠舍', score: 92 },
  { zone: '2# 妊娠舍', score: 88 },
  { zone: '3# 妊娠舍', score: 90 },
  { zone: '5# 产房', score: 85 },
  { zone: '6# 保育舍', score: 81 },
  { zone: '7# 育肥舍', score: 77 },
  { zone: '8# 育肥舍', score: 80 },
  { zone: '10# 公猪舍', score: 89 }
];

export const environmentTrend = {
  timestamps: Array.from({ length: 24 }, (_, index) => `${index}:00`),
  temperature: [26.2, 26.5, 26.7, 26.9, 27.1, 27.4, 27.8, 28.1, 28.5, 28.4, 28.0, 27.6, 27.3, 27.0, 26.8, 26.6, 26.4, 26.2, 26.0, 25.9, 25.8, 25.7, 25.6, 25.5],
  humidity: [65, 65, 64, 64, 63, 62, 61, 60, 59, 60, 62, 63, 64, 66, 68, 70, 72, 73, 74, 74, 73, 72, 70, 68]
};
