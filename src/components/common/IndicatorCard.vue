<template>
  <div class="rounded-2xl bg-white/5 p-4 text-center">
    <p class="text-xs text-white/60">{{ label }}</p>
    <p :class="['mt-2 text-xl font-semibold', statusClass]">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Status = 'good' | 'warning' | 'alert';

const props = defineProps<{
  label: string;
  value: string;
  status?: Status;
}>();

const statusClass = computed(() => {
  if (props.status === 'warning') return 'text-warning';
  if (props.status === 'alert') return 'text-danger';
  return 'text-success';
});
</script>
