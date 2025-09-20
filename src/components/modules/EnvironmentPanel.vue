<template>
  <ModuleCard title="环境与舒适度" subtitle="实时监测与趋势" :active="active">
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-widest text-white/60">实时指标</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in metrics" :key="item.label" class="rounded-2xl bg-white/5 p-4">
            <p class="text-xs text-white/60">{{ item.label }}</p>
            <p :class="['mt-2 text-2xl font-semibold', item.statusClass]">{{ item.display }}</p>
            <p class="text-xs text-white/50">阈值 {{ item.threshold }}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-white/60">24小时趋势</h3>
        <div ref="trendRef" class="mt-3 h-64 w-full rounded-2xl bg-white/5"></div>
      </div>
    </div>
  </ModuleCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import ModuleCard from '../common/ModuleCard.vue';
import { environmentSnapshot, environmentTrend } from '../../data/mock';
import type { ThresholdConfig } from '../../types/config';

const props = defineProps<{ active?: boolean; thresholds: ThresholdConfig }>();
const trendRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

const metrics = computed(() => [
  {
    label: '温度',
    display: `${environmentSnapshot.temperature.toFixed(1)} °C`,
    statusClass: rangeClass(environmentSnapshot.temperature, props.thresholds.temperature),
    threshold: `${props.thresholds.temperature.min ?? 'N/A'}-${props.thresholds.temperature.max ?? 'N/A'} °C`
  },
  {
    label: '湿度',
    display: `${environmentSnapshot.humidity.toFixed(0)} %`,
    statusClass: rangeClass(environmentSnapshot.humidity, props.thresholds.humidity),
    threshold: `${props.thresholds.humidity.min ?? 'N/A'}-${props.thresholds.humidity.max ?? 'N/A'} %`
  },
  {
    label: '氨气',
    display: `${environmentSnapshot.ammonia.toFixed(0)} ppm`,
    statusClass: rangeClass(environmentSnapshot.ammonia, props.thresholds.ammonia),
    threshold: `≤ ${props.thresholds.ammonia.max ?? 'N/A'} ppm`
  },
  {
    label: 'CO₂',
    display: `${environmentSnapshot.co2.toFixed(0)} ppm`,
    statusClass: rangeClass(environmentSnapshot.co2, props.thresholds.co2),
    threshold: `≤ ${props.thresholds.co2.max ?? 'N/A'} ppm`
  },
  {
    label: '风速',
    display: `${environmentSnapshot.wind.toFixed(1)} m/s`,
    statusClass: 'text-white',
    threshold: 'N/A'
  }
]);

onMounted(() => {
  if (trendRef.value) {
    chart = echarts.init(trendRef.value);
    chart.setOption({
      backgroundColor: 'transparent',
      legend: {
        data: ['温度', '湿度'],
        textStyle: { color: '#CBD5F5' }
      },
      tooltip: { trigger: 'axis' },
      grid: { left: '5%', right: '5%', top: 40, bottom: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: environmentTrend.timestamps,
        boundaryGap: false,
        axisLabel: { color: '#94A3B8' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
      },
      yAxis: [
        {
          type: 'value',
          name: '温度',
          nameTextStyle: { color: '#94A3B8' },
          axisLabel: { color: '#94A3B8' },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
        },
        {
          type: 'value',
          name: '湿度',
          position: 'right',
          nameTextStyle: { color: '#94A3B8' },
          axisLabel: { color: '#94A3B8' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '温度',
          type: 'line',
          data: environmentTrend.temperature,
          smooth: true,
          symbol: 'none',
          lineStyle: { color: '#F97316', width: 3 }
        },
        {
          name: '湿度',
          type: 'line',
          yAxisIndex: 1,
          data: environmentTrend.humidity,
          smooth: true,
          symbol: 'none',
          lineStyle: { color: '#38BDF8', width: 3 }
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

function rangeClass(value: number, range: { min?: number; max?: number }) {
  if (range.min != null && value < range.min) return 'text-warning';
  if (range.max != null && value > range.max) return 'text-danger';
  return 'text-success';
}
</script>
