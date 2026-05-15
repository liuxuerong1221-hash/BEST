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

    <!-- 空态文案 -->
    <div v-if="!waypoints.length" class="trajectory-map__empty-text">
      请从左侧选择人员查看轨迹
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Waypoint {
  location: string
  /** 归一化 0–1 横向坐标 */
  x: number
  /** 归一化 0–1 纵向坐标 */
  y: number
  /** 合并后的序号范围，单点为 '1' 形式 */
  seqRange: string
  /** 第一条记录的 'HH:mm' */
  firstTime: string
}

defineProps<{
  waypoints: Waypoint[]
  playState: 'idle' | 'playing' | 'paused'
}>()

defineEmits<{
  'play-end': []
}>()
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
</style>
