<template>
  <BasicEChart :option="option" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import BasicEChart from './BasicEChart.vue';
import type { TrendPoint } from '@/types/dashboard';

const props = defineProps<{
  data: Record<string, TrendPoint[]>;
}>();

const palette = ['#38bdf8', '#22d3ee', '#f472b6', '#a78bfa', '#facc15'];

const option = computed(() => ({
  backgroundColor: 'transparent',
  legend: {
    textStyle: { color: '#cbd5f5' },
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: { top: 40, left: 30, right: 10, bottom: 30 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.temperature?.map((point) => point.time) ?? [],
    axisLabel: { color: '#94a3b8' },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#1f2937' } },
  },
  series: Object.entries(props.data).map(([name, values], index) => ({
    name: labelMap[name] ?? name,
    type: 'line',
    smooth: true,
    showSymbol: false,
    data: values.map((point) => point.value ?? null),
    lineStyle: { width: 2, color: palette[index % palette.length] },
    areaStyle: {
      opacity: 0.08,
      color: palette[index % palette.length],
    },
  })),
}));

const labelMap: Record<string, string> = {
  temperature: '温度',
  humidity: '湿度',
  ammonia: '氨气',
  co2: '二氧化碳',
  airflow: '风速',
};
</script>
