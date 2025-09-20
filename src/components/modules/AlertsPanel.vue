<template>
  <ModuleCard title="告警中心" subtitle="最近事件" :active="active">
    <div class="flex flex-wrap gap-3">
      <button
        v-for="item in filters"
        :key="item.value"
        type="button"
        class="rounded-full border border-white/20 px-4 py-1 text-xs font-semibold transition"
        :class="activeFilter === item.value ? 'bg-primary/40 text-white' : 'text-white/60 hover:border-primary/60'
        "
        @click="activeFilter = item.value"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <article
        v-for="alert in filteredAlerts"
        :key="alert.id"
        class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4"
      >
        <div class="flex items-center justify-between">
          <span :class="['rounded-full px-3 py-1 text-xs font-semibold', levelClass(alert.level)]">
            {{ alertLabel(alert.level) }}
          </span>
          <span class="text-xs text-white/60">{{ alert.time }}</span>
        </div>
        <p class="text-sm font-semibold text-white/80">{{ alert.location }}</p>
        <p class="text-xs text-white/60">来源：{{ alert.module }}</p>
        <p class="text-sm text-white">{{ alert.message }}</p>
      </article>
    </div>
    <p v-if="!filteredAlerts.length" class="mt-6 text-center text-sm text-white/60">暂无匹配告警</p>
  </ModuleCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ModuleCard from '../common/ModuleCard.vue';
import { alerts } from '../../data/mock';

defineProps<{ active?: boolean }>();

const filters = [
  { label: '全部', value: 'all' },
  { label: '红色告警', value: 'critical' },
  { label: '黄色告警', value: 'warning' },
  { label: '提示', value: 'info' }
];

const activeFilter = ref('all');

const filteredAlerts = computed(() => {
  if (activeFilter.value === 'all') return alerts;
  return alerts.filter((alert) => alert.level === activeFilter.value);
});

function levelClass(level: string) {
  if (level === 'critical') return 'bg-danger/30 text-danger';
  if (level === 'warning') return 'bg-warning/30 text-warning';
  return 'bg-white/20 text-white';
}

function alertLabel(level: string) {
  if (level === 'critical') return '红色告警';
  if (level === 'warning') return '黄色告警';
  return '提示';
}
</script>
