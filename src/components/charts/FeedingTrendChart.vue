<template>
  <BasicEChart :option="option" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import BasicEChart from './BasicEChart.vue';
import type { TrendPoint } from '@/types/dashboard';

const props = defineProps<{
  feeding: TrendPoint[];
  water: TrendPoint[];
}>();

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  legend: {
    textStyle: { color: '#cbd5f5' },
  },
  grid: { top: 40, left: 30, right: 20, bottom: 20 },
  xAxis: {
    type: 'category',
    data: props.feeding.map((point) => point.time),
    axisLabel: { color: '#94a3b8' },
  },
  yAxis: [
    {
      type: 'value',
      name: '饲料 (吨)',
      axisLabel: { color: '#94a3b8' },
      nameTextStyle: { color: '#cbd5f5' },
      splitLine: { lineStyle: { color: '#1f2937' } },
    },
    {
      type: 'value',
      name: '用水 (吨)',
      axisLabel: { color: '#94a3b8' },
      nameTextStyle: { color: '#cbd5f5' },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '饲料下发',
      type: 'bar',
      data: props.feeding.map((point) => point.value ?? 0),
      itemStyle: {
        color: '#38bdf8',
        borderRadius: [6, 6, 0, 0],
      },
    },
    {
      name: '用水量',
      type: 'line',
      yAxisIndex: 1,
      data: props.water.map((point) => point.value ?? 0),
      smooth: true,
      lineStyle: { color: '#facc15', width: 2 },
      showSymbol: false,
    },
  ],
}));
</script>
