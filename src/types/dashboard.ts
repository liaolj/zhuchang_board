export interface KpiMetric {
  label: string;
  unit?: string;
  value: number | null;
  trend?: 'up' | 'down' | 'flat';
  delta?: number;
}

export interface ThresholdValue {
  label: string;
  value: number | null;
  unit?: string;
  status: 'normal' | 'warning' | 'danger';
  threshold: {
    min?: number;
    max?: number;
  };
}

export interface AlertItem {
  id: string;
  timestamp: string;
  module: string;
  level: 'critical' | 'warning' | 'info';
  location: string;
  message: string;
}

export interface PopulationStage {
  name: string;
  count: number;
}

export interface FunnelStage {
  name: string;
  value: number;
}

export interface TrendPoint {
  time: string;
  value: number | null;
}

export interface EquipmentStatus {
  name: string;
  status: 'online' | 'offline' | 'fault';
  location?: string;
}

export interface EnergyMetric {
  label: string;
  value: number | null;
  unit: string;
}

export interface ZoneSummary {
  id: string;
  name: string;
  healthIndex: number;
  alerts: number;
  environment: Pick<ThresholdValue, 'value' | 'status'> & { label: string };
  equipment: { online: number; fault: number };
  livestock: number;
}

export interface DashboardConfig {
  refresh: {
    realtime: number;
    statistics: number;
    alerts: number;
  };
}
