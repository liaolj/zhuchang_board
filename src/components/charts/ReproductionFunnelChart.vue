<template>
  <BasicEChart :option="option" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import BasicEChart from './BasicEChart.vue';
import type { FunnelStage } from '@/types/dashboard';

const props = defineProps<{ stages: FunnelStage[] }>();

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    formatter: (params: { name: string; value: number }) => `${params.name}: ${params.value} 窝`,
  },
  series: [
    {
      type: 'funnel',
      left: '5%',
      top: 10,
      bottom: 10,
      width: '90%',
      minSize: '20%',
      maxSize: '100%',
      sort: 'descending',
      gap: 4,
      itemStyle: {
        borderColor: '#0f172a',
        borderWidth: 1,
      },
      label: {
        show: true,
        color: '#e2e8f0',
      },
      labelLine: {
        length: 14,
        lineStyle: {
          color: '#475569',
        },
      },
      data: props.stages.map((stage, index) => ({
        name: stage.name,
        value: stage.value,
        itemStyle: {
          color: ['#38bdf8', '#22d3ee', '#60a5fa', '#818cf8', '#a855f7'][index % 5],
        },
      })),
    },
  ],
}));
</script>
