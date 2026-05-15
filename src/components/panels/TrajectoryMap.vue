<template>
  <div class="trajectory-map">
    <!-- 轨迹层（折线 + 端点圆 + 光点） -->
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
        v-if="lightPoint"
        :cx="lightPoint.cx"
        :cy="lightPoint.cy"
        r="9"
        fill="#FFFFFF"
        stroke="#1DEAFF"
        stroke-width="2"
        class="trajectory-map__light"
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
        :active="idx === 0 || idx === points.length - 1"
        @select="emit('pin-click', p)"
        @mouseenter="hoveredIdx = idx"
        @mouseleave="hoveredIdx = -1"
      >
        <template #icon="{ gradientId }">
          <defs>
            <linearGradient :id="gradientId" x1="20" y1="12" x2="20" y2="28" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFFFFF" />
              <stop offset="1" stop-color="#0083CC" />
            </linearGradient>
          </defs>
          <!-- 摄像头 -->
          <g v-if="p.device === '监控'" :fill="`url(#${gradientId})`">
            <path d="M12 17h11v6H12z" />
            <path d="M23 18.5l4-2v5l-4-2z" />
            <circle cx="14" cy="15.5" r="1.2" />
          </g>
          <!-- 门禁设备 -->
          <g v-else-if="p.device === '门禁设备'" :stroke="`url(#${gradientId})`" :fill="`url(#${gradientId})`">
            <path d="M14 13h12v14H14z" fill="none" stroke-width="1.5" />
            <circle cx="23" cy="20" r="1.3" stroke="none" />
            <path d="M22 21h2v3h-2z" stroke="none" />
          </g>
          <!-- 摆闸/道闸 -->
          <g v-else :fill="`url(#${gradientId})`">
            <rect x="13" y="22" width="14" height="2.4" rx="1" />
            <rect x="14" y="14" width="2.4" height="9" rx="1" />
            <rect x="23.6" y="14" width="2.4" height="9" rx="1" />
            <rect x="13" y="13" width="14" height="2" rx="1" />
          </g>
        </template>
      </MapPinMarker>

      <!-- hover 多行 tooltip：作为 siblings 单独定位 -->
      <div
        v-for="(p, idx) in points"
        :key="`tip-${idx}`"
        class="trajectory-map__tooltip"
        :class="{ 'trajectory-map__tooltip--visible': hoveredIdx === idx }"
        :style="{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }"
        role="tooltip"
      >
        <p class="trajectory-map__tooltip-row trajectory-map__tooltip-row--title">{{ p.location }}</p>
        <p class="trajectory-map__tooltip-row">时间：{{ p.firstTime }}</p>
        <p class="trajectory-map__tooltip-row">设备：{{ p.device }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import MapPinMarker from '@/components/common/MapPinMarker.vue'

export interface Waypoint {
  location: string
  x: number
  y: number
  seqRange: string
  firstTime: string
  device: string
}

const props = defineProps<{
  waypoints: Waypoint[]
  playState: 'idle' | 'playing' | 'paused'
}>()

const emit = defineEmits<{
  'play-end': []
  'pin-click': [waypoint: Waypoint]
}>()

const hoveredIdx = ref(-1)

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

const segLengths = computed(() => {
  const arr: number[] = []
  for (let i = 1; i < points.value.length; i++) {
    const a = points.value[i - 1]
    const b = points.value[i]
    arr.push(Math.hypot(b.px - a.px, b.py - a.py))
  }
  return arr
})

const totalLength = computed(() =>
  segLengths.value.reduce((s, v) => s + v, 0)
)

const DURATION_MS = 7000
const progress = ref(0)
let rafId = 0
let lastTs = 0

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lightPoint = computed<{ cx: number; cy: number } | null>(() => {
  if (props.playState === 'idle') return null
  if (points.value.length < 2) {
    const p = points.value[0]
    return p ? { cx: p.px, cy: p.py } : null
  }
  const target = progress.value * totalLength.value
  let acc = 0
  for (let i = 0; i < segLengths.value.length; i++) {
    const segLen = segLengths.value[i]
    if (target <= acc + segLen || i === segLengths.value.length - 1) {
      const ratio = segLen === 0 ? 0 : Math.min(1, (target - acc) / segLen)
      const a = points.value[i]
      const b = points.value[i + 1]
      return { cx: a.px + (b.px - a.px) * ratio, cy: a.py + (b.py - a.py) * ratio }
    }
    acc += segLen
  }
  return null
})

function step(ts: number) {
  const dt = ts - lastTs
  lastTs = ts
  progress.value = Math.min(1, progress.value + dt / DURATION_MS)
  if (progress.value >= 1) {
    cancelRaf()
    emit('play-end')
    return
  }
  rafId = requestAnimationFrame(step)
}

function cancelRaf() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

watch(() => props.playState, (s, prev) => {
  if (s === 'playing') {
    if (points.value.length < 2 || prefersReduced) {
      progress.value = 1
      emit('play-end')
      return
    }
    if (prev === 'idle' || progress.value >= 1) progress.value = 0
    lastTs = performance.now()
    rafId = requestAnimationFrame(step)
  } else if (s === 'paused') {
    cancelRaf()
  } else {
    cancelRaf()
    progress.value = 0
  }
})

watch(() => props.waypoints, () => {
  const wasRunning = rafId !== 0 || props.playState !== 'idle'
  cancelRaf()
  progress.value = 0
  if (wasRunning && props.playState !== 'idle') emit('play-end')
})

onUnmounted(() => cancelRaf())
</script>

<style lang="scss" scoped>
.trajectory-map {
  position: relative;
  width: 100%;
  height: 100%;
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

.trajectory-map__tooltip {
  position: absolute;
  transform: translate(-50%, calc(-100% - 80px));
  min-width: 140px;
  padding: 8px 12px;
  border: 1px solid rgba(77, 242, 255, 0.55);
  border-radius: 8px;
  background: rgba(5, 25, 49, 0.92);
  box-shadow: 0 0 12px rgba(0, 174, 255, 0.32);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
  z-index: 5;

  &--visible {
    opacity: 1;
    transform: translate(-50%, calc(-100% - 84px));
  }
}

.trajectory-map__tooltip-row {
  margin: 0;
  padding: 2px 0;
  color: $color-text-2;
  font-size: $font-size-xxs;
  line-height: 1.4;

  &--title {
    color: $color-text-1;
    font-weight: 600;
    font-size: $font-size-xs;
  }
}

.trajectory-map__light {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))
          drop-shadow(0 0 14px rgba(29, 234, 255, 0.8));
}
</style>
