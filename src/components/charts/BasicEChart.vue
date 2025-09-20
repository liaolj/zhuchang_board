<template>
  <div ref="chartRef" class="h-full w-full"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

const props = defineProps<{ option: EChartsOption; theme?: string }>();

const chartRef = ref<HTMLDivElement | null>(null);
let instance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;
  instance = echarts.init(chartRef.value, props.theme ?? 'dark');
  instance.setOption(props.option);
};

const resizeHandler = () => {
  instance?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  instance?.dispose();
  instance = null;
});

watch(
  () => props.option,
  (option) => {
    if (!instance) {
      initChart();
      return;
    }
    instance.setOption(option, true);
  },
  { deep: true }
);
</script>

<style scoped>
div {
  min-height: 220px;
}
</style>
