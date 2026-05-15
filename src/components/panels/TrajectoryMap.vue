<template>
  <div class="trajectory-map" :class="{ 'trajectory-map--empty': !waypoints.length }">
    <!-- 背景网格 -->
    <svg class="trajectory-map__grid" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="traj-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0V60" fill="none" stroke="rgba(0,174,255,0.08)" stroke-width="0.5" />
        </pattern>
      </defs>
      <rect width="1200" height="720" fill="url(#traj-grid)" />
    </svg>

    <!-- 轨迹层（折线 + 端点圆） -->
    <svg
      v-if="points.length"
      class="trajectory-map__lines"
      :viewBox="`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <polyline
        v-if="points.length > 1"
        :points="polylinePoints"
        fill="none"
        stroke="#1DEAFF"
        stroke-width="2"
        stroke-dasharray="6 4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        v-for="(p, idx) in points"
        :key="`pt-${idx}`"
        :cx="p.px"
        :cy="p.py"
        r="6"
        fill="rgba(29,234,255,0.85)"
        stroke="#0C84FF"
        stroke-width="1.5"
      />
    </svg>

    <!-- 点位层（HTML 绝对定位，复用 MapPinMarker） -->
    <div class="trajectory-map__pins">
      <MapPinMarker
        v-for="(p, idx) in points"
        :key="`pin-${idx}`"
        :x="p.x * 100"
        :y="p.y * 100"
        unit="%"
        :label="`${p.location} · ${p.seqRange}  ${p.firstTime}`"
        :active="idx === 0 || idx === points.length - 1"
      />
    </div>

    <!-- 空态文案 -->
    <div v-if="!waypoints.length" class="trajectory-map__empty-text">
      请从左侧选择人员查看轨迹
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MapPinMarker from '@/components/common/MapPinMarker.vue'

export interface Waypoint {
  location: string
  x: number
  y: number
  seqRange: string
  firstTime: string
}

const props = defineProps<{
  waypoints: Waypoint[]
  playState: 'idle' | 'playing' | 'paused'
}>()

defineEmits<{
  'play-end': []
}>()

const VIEWBOX_W = 1200
const VIEWBOX_H = 720

const points = computed(() =>
  props.waypoints.map(w => ({
    ...w,
    px: w.x * VIEWBOX_W,
    py: w.y * VIEWBOX_H,
  }))
)

const polylinePoints = computed(() =>
  points.value.map(p => `${p.px},${p.py}`).join(' ')
)
</script>

<style lang="scss" scoped>
.trajectory-map {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(10, 40, 80, 0.9), rgba(2, 15, 30, 1));
  border: 1px solid $color-border;
  border-radius: $radius-md;
  overflow: hidden;
}

.trajectory-map__grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.trajectory-map__empty-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-text-2;
  font-size: $font-size-sm;
  letter-spacing: 1px;
  pointer-events: none;
}

.trajectory-map__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  filter: drop-shadow(0 0 6px rgba(29, 234, 255, 0.6));
}

.trajectory-map__pins {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}
</style>
