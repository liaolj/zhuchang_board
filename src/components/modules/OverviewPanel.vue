<template>
  <ModuleCard title="全场运营总览" subtitle="今日关键指标" :active="active">
    <div class="grid gap-4 xl:grid-cols-2">
      <div class="grid grid-cols-3 gap-3 text-center text-white">
        <div class="rounded-xl bg-white/5 p-4">
          <p class="text-xs text-white/60">当前存栏</p>
          <p class="mt-2 text-2xl font-semibold">{{ kpiSummary.livestock.toLocaleString() }}</p>
        </div>
        <div class="rounded-xl bg-white/5 p-4">
          <p class="text-xs text-white/60">死亡率</p>
          <p class="mt-2 text-2xl font-semibold">{{ (kpiSummary.mortalityRate * 100).toFixed(2) }}%</p>
        </div>
        <div class="rounded-xl bg-white/5 p-4">
          <p class="text-xs text-white/60">今日出栏</p>
          <p class="mt-2 text-2xl font-semibold">{{ kpiSummary.marketable }}</p>
        </div>
        <div class="rounded-xl bg-white/5 p-4">
          <p class="text-xs text-white/60">ADG</p>
          <p
            class="mt-2 text-2xl font-semibold"
            :class="metricClass(kpiSummary.adg, thresholds.adg.target)"
          >
            {{ kpiSummary.adg.toFixed(2) }} kg
          </p>
        </div>
        <div class="rounded-xl bg-white/5 p-4">
          <p class="text-xs text-white/60">FCR</p>
          <p
            class="mt-2 text-2xl font-semibold"
            :class="metricClass(kpiSummary.fcr, thresholds.fcr.target, true)"
          >
            {{ kpiSummary.fcr.toFixed(2) }}
          </p>
        </div>
        <div class="rounded-xl bg-white/5 p-4">
          <p class="text-xs text-white/60">繁殖进度</p>
          <p class="mt-2 text-sm leading-6 text-white/80">
            配种 {{ kpiSummary.breeding.mating }} | 分娩 {{ kpiSummary.breeding.farrowing }} | 断奶
            {{ kpiSummary.breeding.weaning }}
          </p>
        </div>
      </div>
      <div>
        <h3 class="mb-3 text-sm font-semibold uppercase tracking-widest text-white/60">环境摘要</h3>
        <div class="grid grid-cols-5 gap-3 text-center">
          <div v-for="item in envItems" :key="item.key" class="rounded-xl bg-white/5 p-3">
            <p class="text-xs text-white/60">{{ item.label }}</p>
            <p :class="['mt-2 text-xl font-semibold', item.class]">{{ item.display }}</p>
          </div>
        </div>
        <h3 class="mt-6 mb-2 text-sm font-semibold uppercase tracking-widest text-white/60">告警播报</h3>
        <div class="relative h-20 overflow-hidden rounded-xl bg-white/5">
          <ul class="absolute inset-0 animate-marquee space-y-2 p-3 text-xs" role="list">
            <li v-for="alert in alerts" :key="alert.id" class="flex items-center gap-3">
              <span :class="levelClass(alert.level)">{{ alertLabel(alert.level) }}</span>
              <span class="text-white/60">{{ alert.time }}</span>
              <span>{{ alert.location }} · {{ alert.message }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <h3 class="text-sm font-semibold uppercase tracking-widest text-white/60">分区健康热力</h3>
      <div ref="heatmapRef" class="mt-3 h-60 w-full rounded-xl bg-white/5"></div>
    </div>
  </ModuleCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import ModuleCard from '../common/ModuleCard.vue';
import { alerts, environmentSnapshot, heatmapCells, kpiSummary } from '../../data/mock';
import type { ThresholdConfig } from '../../types/config';

const props = defineProps<{ active?: boolean; thresholds: ThresholdConfig }>();

const heatmapRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

const envItems = computed(() => [
  {
    key: 'temperature',
    label: '温度(°C)',
    value: environmentSnapshot.temperature,
    display: `${environmentSnapshot.temperature.toFixed(1)}`,
    class: rangeClass(environmentSnapshot.temperature, props.thresholds.temperature)
  },
  {
    key: 'humidity',
    label: '湿度(%)',
    value: environmentSnapshot.humidity,
    display: `${environmentSnapshot.humidity.toFixed(0)}`,
    class: rangeClass(environmentSnapshot.humidity, props.thresholds.humidity)
  },
  {
    key: 'ammonia',
    label: '氨气(ppm)',
    value: environmentSnapshot.ammonia,
    display: `${environmentSnapshot.ammonia.toFixed(0)}`,
    class: rangeClass(environmentSnapshot.ammonia, props.thresholds.ammonia)
  },
  {
    key: 'co2',
    label: 'CO₂(ppm)',
    value: environmentSnapshot.co2,
    display: `${environmentSnapshot.co2.toFixed(0)}`,
    class: rangeClass(environmentSnapshot.co2, props.thresholds.co2)
  },
  {
    key: 'wind',
    label: '风速(m/s)',
    value: environmentSnapshot.wind,
    display: `${environmentSnapshot.wind.toFixed(1)}`,
    class: 'text-white'
  }
]);

onMounted(() => {
  if (heatmapRef.value) {
    chart = echarts.init(heatmapRef.value);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: heatmapCells.map((cell) => cell.zone),
        axisLabel: {
          color: '#94A3B8',
          interval: 0
        },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { color: '#94A3B8' },
        splitLine: {
          lineStyle: { color: 'rgba(255,255,255,0.1)' }
        }
      },
      grid: {
        left: '3%',
        right: '3%',
        top: 30,
        bottom: 50,
        containLabel: true
      },
      series: [
        {
          type: 'bar',
          data: heatmapCells.map((cell) => ({
            value: cell.score,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#34D399' },
                { offset: 1, color: '#22D3EE' }
              ])
            }
          })),
          barWidth: 24,
          label: {
            show: true,
            position: 'top',
            color: '#E2E8F0'
          }
        }
      ]
    });
  }
});

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
});

function metricClass(value: number, target?: [number, number], inverse = false) {
  if (!target) return 'text-white';
  const [min, max] = target;
  if (inverse) {
    if (value > max) return 'text-danger';
    if (value < min) return 'text-warning';
    return 'text-success';
  }
  if (value < min) return 'text-warning';
  if (value > max) return 'text-danger';
  return 'text-success';
}

function rangeClass(value: number, range: { min?: number; max?: number }) {
  if (range.min != null && value < range.min) {
    return 'text-warning';
  }
  if (range.max != null && value > range.max) {
    return 'text-danger';
  }
  return 'text-success';
}

function levelClass(level: string) {
  if (level === 'critical') return 'rounded-full bg-danger/20 px-3 py-1 text-xs font-semibold text-danger';
  if (level === 'warning') return 'rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning';
  return 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80';
}

function alertLabel(level: string) {
  if (level === 'critical') return '红色告警';
  if (level === 'warning') return '黄色告警';
  return '提示';
}
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.animate-marquee {
  animation: marquee 12s linear infinite;
}
</style>
