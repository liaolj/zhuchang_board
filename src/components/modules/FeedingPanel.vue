<template>
  <ModuleCard title="饲喂与用水" subtitle="投入产出对比" :active="active">
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="rounded-2xl bg-white/5 p-4">
          <p class="text-xs text-white/60">今日饲料下发 vs 计划</p>
          <div class="mt-3 flex items-end justify-between">
            <div>
              <p class="text-sm text-white/60">计划</p>
              <p class="text-2xl font-semibold text-white">{{ feeding.plan }} 吨</p>
            </div>
            <div>
              <p class="text-sm text-white/60">实际</p>
              <p :class="['text-2xl font-semibold', feedVarianceClass]">{{ feeding.actual }} 吨</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-white/60">完成率</p>
              <p class="text-2xl font-semibold text-success">{{ completionRate }}%</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-white/5 p-4">
          <p class="text-xs text-white/60">今日用水量</p>
          <p class="mt-3 text-3xl font-semibold text-white">{{ water.actual }} m³</p>
        </div>
        <div class="rounded-2xl bg-white/5 p-4">
          <p class="text-xs text-white/60">效率指标</p>
          <div class="mt-3 grid grid-cols-2 gap-3 text-center">
            <div class="rounded-xl bg-white/10 p-3">
              <p class="text-xs text-white/60">FCR</p>
              <p class="text-xl font-semibold" :class="rangeClass(fcr, thresholds.fcr.target, true)">{{ fcr.toFixed(2) }}</p>
            </div>
            <div class="rounded-xl bg-white/10 p-3">
              <p class="text-xs text-white/60">ADG</p>
              <p class="text-xl font-semibold" :class="rangeClass(adg, thresholds.adg.target)">{{ adg.toFixed(2) }} kg</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-white/60">近7天趋势</h3>
        <div ref="trendRef" class="mt-3 h-72 w-full rounded-2xl bg-white/5"></div>
      </div>
    </div>
  </ModuleCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import ModuleCard from '../common/ModuleCard.vue';
import { feedingToday, trend7Days, kpiSummary } from '../../data/mock';
import type { ThresholdConfig } from '../../types/config';

const props = defineProps<{ active?: boolean; thresholds: ThresholdConfig }>();
const thresholds = computed(() => props.thresholds);

const feeding = computed(() => ({
  plan: feedingToday.feed.plan.toFixed(1),
  actual: feedingToday.feed.actual.toFixed(1)
}));

const water = computed(() => ({ actual: feedingToday.water.actual.toFixed(1) }));
const fcr = computed(() => kpiSummary.fcr);
const adg = computed(() => kpiSummary.adg);

const completionRate = computed(() => ((feedingToday.feed.actual / feedingToday.feed.plan) * 100).toFixed(1));
const feedVarianceClass = computed(() => {
  const variance = feedingToday.feed.actual - feedingToday.feed.plan;
  if (Math.abs(variance) <= 1) return 'text-success';
  return variance > 0 ? 'text-warning' : 'text-danger';
});

const trendRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

onMounted(() => {
  if (trendRef.value) {
    chart = echarts.init(trendRef.value);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['饲料(吨)', '用水(m³)'],
        textStyle: { color: '#CBD5F5' }
      },
      grid: { left: '5%', right: '5%', top: 40, bottom: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['-6', '-5', '-4', '-3', '-2', '-1', '今日'],
        axisLabel: { color: '#94A3B8' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
      },
      yAxis: [
        {
          type: 'value',
          name: '饲料(吨)',
          axisLabel: { color: '#94A3B8' },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
        },
        {
          type: 'value',
          name: '用水(m³)',
          position: 'right',
          axisLabel: { color: '#94A3B8' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '饲料(吨)',
          type: 'bar',
          data: trend7Days.feed,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#60A5FA' },
              { offset: 1, color: '#2563EB' }
            ])
          }
        },
        {
          name: '用水(m³)',
          type: 'line',
          yAxisIndex: 1,
          data: trend7Days.water,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#34D399', width: 3 }
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

function rangeClass(value: number, range?: [number, number], inverse = false) {
  if (!range) return 'text-white';
  const [min, max] = range;
  if (inverse) {
    if (value > max) return 'text-danger';
    if (value < min) return 'text-warning';
    return 'text-success';
  }
  if (value < min) return 'text-warning';
  if (value > max) return 'text-danger';
  return 'text-success';
}
</script>
