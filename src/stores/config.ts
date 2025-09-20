import { defineStore } from 'pinia';
import type { CarouselConfig, DashboardConfig, ModuleFlags, ThresholdConfig } from '../types/config';

const defaultModules: ModuleFlags = {
  overview: true,
  production: true,
  environment: true,
  feeding: true,
  equipment: true,
  alerts: true,
  zones: true
};

const defaultCarousel: CarouselConfig = {
  enabled: false,
  interval: 20000,
  order: ['overview', 'production', 'environment', 'feeding', 'equipment', 'alerts', 'zones']
};

const defaultThresholds: ThresholdConfig = {
  temperature: { min: 18, max: 28 },
  humidity: { min: 50, max: 75 },
  ammonia: { max: 15 },
  co2: { max: 2000 },
  fcr: { target: [2.3, 2.8] },
  adg: { target: [0.65, 0.8] }
};

export const useConfigStore = defineStore('config', {
  state: () => ({
    loading: false,
    modules: defaultModules as ModuleFlags,
    carousel: defaultCarousel as CarouselConfig,
    thresholds: defaultThresholds as ThresholdConfig,
    lastUpdated: null as Date | null,
    error: ''
  }),
  actions: {
    async loadConfig(force = false) {
      if (this.loading && !force) return;
      this.loading = true;
      try {
        const response = await fetch(`/config.json?ts=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`加载配置失败: ${response.status}`);
        }
        const data = (await response.json()) as DashboardConfig;
        this.modules = { ...defaultModules, ...data.modules };
        this.carousel = { ...defaultCarousel, ...data.carousel };
        this.thresholds = { ...defaultThresholds, ...data.thresholds };
        this.lastUpdated = new Date();
        this.error = '';
      } catch (error) {
        console.error(error);
        this.error = error instanceof Error ? error.message : '未知错误';
      } finally {
        this.loading = false;
      }
    }
  }
});
