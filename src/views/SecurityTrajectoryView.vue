<template>
  <div class="security-traj">
    <div class="security-traj__bg" />
    <TrajectoryMap
      class="security-traj__map-overlay"
      :waypoints="waypoints"
      :play-state="playState"
      @play-end="handlePlayEnd"
    />
    <img class="security-traj__frame security-traj__frame--left"  src="@/assets/images/left-左.png" alt="" />
    <img class="security-traj__frame security-traj__frame--right" src="@/assets/images/left-右.png" alt="" />

    <AppHeader class="security-traj__header" />

    <main class="security-traj__body">
      <aside class="security-traj__left">
        <TrajectoryQueryPanel v-model:selected-id="selectedId" />
      </aside>

      <!-- 返回 -->
      <button class="security-traj__back" type="button" @click="goBack">
        <span class="security-traj__back-icon" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="traj-back-stroke" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0C84FF" />
                <stop offset="1" stop-color="#1DEAFF" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="19.5" fill="rgba(2,37,79,0.6)" stroke="url(#traj-back-stroke)" />
            <path d="M22.5 13L15.5 20L22.5 27" stroke="#4DF2FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="security-traj__back-text">返回</span>
      </button>

      <!-- 轨迹播放控制 -->
      <div class="security-traj__controls">
        <button
          class="security-traj__ctrl-btn"
          :class="{ 'security-traj__ctrl-btn--active': playState === 'playing' }"
          type="button"
          :disabled="!canPlay"
          @click="onPlay"
        >
          <span class="security-traj__ctrl-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="ctrl-stroke-play" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0C84FF" /><stop offset="1" stop-color="#1DEAFF" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="19.5" fill="rgba(2,37,79,0.6)" stroke="url(#ctrl-stroke-play)" />
              <path d="M16 13L28 20L16 27V13Z" fill="#4DF2FF" />
            </svg>
          </span>
          <span class="security-traj__ctrl-text">轨迹播放</span>
        </button>

        <button
          class="security-traj__ctrl-btn"
          :class="{ 'security-traj__ctrl-btn--active': playState === 'paused' }"
          type="button"
          :disabled="!canPlay"
          @click="onPause"
        >
          <span class="security-traj__ctrl-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="ctrl-stroke-pause" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0C84FF" /><stop offset="1" stop-color="#1DEAFF" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="19.5" fill="rgba(2,37,79,0.6)" stroke="url(#ctrl-stroke-pause)" />
              <rect x="13" y="13" width="5" height="14" rx="1" fill="#4DF2FF" />
              <rect x="22" y="13" width="5" height="14" rx="1" fill="#4DF2FF" />
            </svg>
          </span>
          <span class="security-traj__ctrl-text">暂停</span>
        </button>

        <button
          class="security-traj__ctrl-btn"
          :class="{ 'security-traj__ctrl-btn--active': playState === 'idle' }"
          type="button"
          :disabled="!canPlay"
          @click="onStop"
        >
          <span class="security-traj__ctrl-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="ctrl-stroke-stop" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0C84FF" /><stop offset="1" stop-color="#1DEAFF" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="19.5" fill="rgba(2,37,79,0.6)" stroke="url(#ctrl-stroke-stop)" />
              <rect x="13" y="13" width="14" height="14" rx="1.5" fill="#4DF2FF" />
            </svg>
          </span>
          <span class="security-traj__ctrl-text">结束</span>
        </button>
      </div>

      <section class="security-traj__center">
        <!-- 楼栋聚合点位：复用指南针 + 楼层选择器 -->
        <div class="security-traj__map-controls">
          <Compass />
          <FloorSelector
            :selected-floor="selectedFloor"
            @floor-change="onFloorChange"
          />
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import Compass from '@/components/common/Compass.vue'
import FloorSelector from '@/components/common/FloorSelector.vue'
import TrajectoryQueryPanel from '@/components/panels/TrajectoryQueryPanel.vue'
import TrajectoryMap, { type Waypoint } from '@/components/panels/TrajectoryMap.vue'
import {
  getActivitiesForPerson,
  LOCATION_COORDS,
} from '@/data/trajectoryMockData'

const router = useRouter()
function goBack() {
  router.push({ name: 'security' })
}

type PlayState = 'idle' | 'playing' | 'paused'
const playState = ref<PlayState>('idle')
const selectedId = ref<number>(1)

const selectedFloor = ref('1F')
function onFloorChange(floor: string) {
  selectedFloor.value = floor
}

const activities = computed(() => getActivitiesForPerson(selectedId.value))

const waypoints = computed<Waypoint[]>(() => {
  const groups = new Map<string, ReturnType<typeof getActivitiesForPerson>>()
  for (const a of activities.value) {
    const list = groups.get(a.location) ?? []
    list.push(a)
    groups.set(a.location, list)
  }
  return [...groups.entries()].map(([location, rows]) => {
    const coord = LOCATION_COORDS[location] ?? { x: 0.5, y: 0.5 }
    const seqs = rows.map(r => r.seq)
    const min = Math.min(...seqs)
    const max = Math.max(...seqs)
    return {
      location,
      x: coord.x,
      y: coord.y,
      seqRange: min === max ? String(min) : `${min}-${max}`,
      firstTime: rows[0].time.slice(11, 16),
    }
  })
})

const canPlay = computed(() => waypoints.value.length >= 1)

function onPlay()  { if (canPlay.value) playState.value = 'playing' }
function onPause() { if (playState.value === 'playing') playState.value = 'paused' }
function onStop()  { playState.value = 'idle' }

function handlePlayEnd() {
  playState.value = 'idle'
}
</script>

<style lang="scss" scoped>
.security-traj {
  width: $screen-width;
  height: $screen-height;
  position: relative;
  overflow: hidden;
  background-color: $color-bg;
  font-family: $font-body;

  &__bg {
    position: absolute;
    inset: 0;
    background-image: url('@/assets/images/bg图@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 0;
  }

  &__frame {
    position: absolute;
    top: 8px;
    bottom: 8px;
    height: calc(100% - 16px);
    width: auto;
    pointer-events: none;
    z-index: 30;

    &--left  { left: 0; }
    &--right { right: 0; }
  }

  &__header {
    position: relative;
    z-index: 10;
    height: $header-h;
  }

  &__body {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: $panel-left-w 1fr;
    height: calc($screen-height - $header-h);
    padding: 0 40px;
    gap: 8px;
  }

  &__left {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 24px 0 8px;
  }

  &__center {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &__map-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;

    :deep(*) {
      pointer-events: auto;
    }
  }

  &__map-controls {
    position: absolute;
    right: 8px;
    bottom: 8px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__back {
    position: absolute;
    left: calc(40px + #{$panel-left-w} + 24px);
    top: 24px;
    z-index: 12;
    width: 105px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px 0 0;
    border: 0;
    border-radius: 20px;
    background: rgba(10, 15, 21, 0.5);
    color: $color-text-1;
    cursor: pointer;
    outline: none;
    transition: transform 0.18s ease, filter 0.18s ease;

    &:hover {
      transform: translateY(-1px);
      filter: drop-shadow(0 0 10px rgba(29, 234, 255, 0.34));
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(77, 242, 255, 0.45);
    }
  }

  &__back-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;

    svg { width: 40px; height: 40px; display: block; }
  }

  &__back-text {
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-text-1;
    white-space: nowrap;
  }

  // 轨迹控制按钮组
  &__controls {
    position: absolute;
    left: calc(40px + #{$panel-left-w} + 24px);
    bottom: 80px;
    z-index: 12;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__ctrl-btn {
    width: 120px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px 0 0;
    border: 0;
    border-radius: 20px;
    background: rgba(10, 15, 21, 0.5);
    cursor: pointer;
    outline: none;
    transition: transform 0.18s ease, filter 0.18s ease;

    &:hover {
      transform: translateY(-1px);
      filter: drop-shadow(0 0 10px rgba(29, 234, 255, 0.34));
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(77, 242, 255, 0.45);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:disabled:hover {
      transform: none;
      filter: none;
    }

    &--active {
      filter: drop-shadow(0 0 8px rgba(77, 242, 255, 0.5));

      .security-traj__ctrl-text {
        color: $color-primary-bright;
      }
    }
  }

  &__ctrl-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;

    svg { width: 40px; height: 40px; display: block; }
  }

  &__ctrl-text {
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-text-1;
    white-space: nowrap;
  }


}

@media (prefers-reduced-motion: reduce) {
  .security-traj__back { transition: none; }
}
</style>
