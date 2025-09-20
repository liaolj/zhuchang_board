<template>
  <div class="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)] p-6">
    <div class="mx-auto flex max-w-[1920px] flex-col gap-6">
      <OverviewHeader :config="store.config" />
      <section class="grid gap-6 xl:grid-cols-3">
        <div class="xl:col-span-2 space-y-6">
          <KpiGrid :kpis="store.kpis" />
          <div class="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/40 p-5">
            <h2 class="text-lg font-semibold text-white">环境摘要</h2>
            <EnvironmentSummary :environment="store.environment" />
            <EnvironmentTrendChart :data="store.environmentTrends" />
          </div>
          <div class="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/40 p-5">
            <h2 class="text-lg font-semibold text-white">饲喂与用水</h2>
            <FeedingWaterSummary
              :feeding="store.feedingToday"
              :water-today="store.waterToday"
              :water-trend="store.waterTrend"
            />
            <FeedingTrendChart :feeding="store.feedingTrend" :water="store.waterTrend" />
            <div class="grid gap-3 md:grid-cols-2">
              <MetricCard title="平均日增重 ADG" :value="store.performance.adg" unit="kg" />
              <MetricCard title="料肉比 FCR" :value="store.performance.fcr" />
            </div>
          </div>
          <div class="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/40 p-5">
            <h2 class="text-lg font-semibold text-white">分区概览</h2>
            <ZoneOverview :zones="store.zones" />
          </div>
        </div>
        <div class="flex flex-col gap-6">
          <AlertTicker :alerts="store.alerts" :refresh-interval="store.config.refresh.alerts" />
          <div class="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/40 p-5">
            <h2 class="text-lg font-semibold text-white">生产与繁殖</h2>
            <PopulationBarChart :stages="store.populations" />
            <ReproductionFunnelChart :stages="store.reproductionFunnel" />
            <FertilityIndicatorGrid :indicators="store.fertilityIndicators" />
          </div>
          <div class="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/40 p-5">
            <h2 class="text-lg font-semibold text-white">设备与能耗</h2>
            <EquipmentStatusBoard :equipment="store.equipment" :summary="store.equipmentHealth" />
            <EnergySummary :energy="store.energy" />
          </div>
        </div>
      </section>
      <footer class="rounded-3xl border border-slate-700/60 bg-slate-900/40 p-4 text-xs text-slate-500">
        数据示例用于前端联调，实际项目请接入后端 API。
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AlertTicker from '@/components/AlertTicker.vue';
import EnvironmentSummary from '@/components/EnvironmentSummary.vue';
import EquipmentStatusBoard from '@/components/EquipmentStatusBoard.vue';
import EnergySummary from '@/components/EnergySummary.vue';
import FertilityIndicatorGrid from '@/components/FertilityIndicatorGrid.vue';
import FeedingTrendChart from '@/components/charts/FeedingTrendChart.vue';
import FeedingWaterSummary from '@/components/FeedingWaterSummary.vue';
import KpiGrid from '@/components/KpiGrid.vue';
import MetricCard from '@/components/cards/MetricCard.vue';
import OverviewHeader from '@/components/OverviewHeader.vue';
import PopulationBarChart from '@/components/charts/PopulationBarChart.vue';
import ReproductionFunnelChart from '@/components/charts/ReproductionFunnelChart.vue';
import ZoneOverview from '@/components/ZoneOverview.vue';
import EnvironmentTrendChart from '@/components/charts/EnvironmentTrendChart.vue';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();
</script>
