export interface ThresholdRange {
  min?: number;
  max?: number;
  target?: [number, number];
}

export interface ThresholdConfig {
  temperature: ThresholdRange;
  humidity: ThresholdRange;
  ammonia: ThresholdRange;
  co2: ThresholdRange;
  fcr: ThresholdRange;
  adg: ThresholdRange;
}

export interface ModuleFlags {
  overview: boolean;
  production: boolean;
  environment: boolean;
  feeding: boolean;
  equipment: boolean;
  alerts: boolean;
  zones: boolean;
}

export interface CarouselConfig {
  enabled: boolean;
  interval: number;
  order: Array<keyof ModuleFlags>;
}

export interface DashboardConfig {
  modules: ModuleFlags;
  carousel: CarouselConfig;
  thresholds: ThresholdConfig;
}
