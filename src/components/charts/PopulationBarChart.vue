<template>
  <BasicEChart :option="option" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import * as echarts from 'echarts';

import BasicEChart from './BasicEChart.vue';
import type { PopulationStage } from '@/types/dashboard';

const props = defineProps<{ stages: PopulationStage[] }>();

const option = computed(() => ({
  backgroundColor: 'transparent',
  grid: { top: 20, left: 10, right: 10, bottom: 0, containLabel: true },
  xAxis: {
    type: 'value',
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#1f2937' } },
  },
  yAxis: {
    type: 'category',
    data: props.stages.map((stage) => stage.name),
    axisLabel: { color: '#e2e8f0' },
  },
  series: [
    {
      type: 'bar',
      data: props.stages.map((stage) => stage.count),
      barWidth: 12,
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#38bdf8' },
          { offset: 1, color: '#6366f1' },
        ]),
      },
      label: {
        show: true,
        position: 'right',
        color: '#e2e8f0',
        formatter: (params: { value: number }) => params.value.toLocaleString('zh-CN'),
      },
    },
  ],
}));
</script>
