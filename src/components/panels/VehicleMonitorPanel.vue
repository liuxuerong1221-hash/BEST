<template>
  <BasePanel class="vehicle-monitor" title="车辆出入监控">
    <div class="vehicle-monitor__body">
      <!-- 缩略图列 -->
      <ul class="vehicle-monitor__thumbs">
        <li
          v-for="cam in cameras"
          :key="cam.id"
          class="vehicle-monitor__thumb"
          :class="{ 'vehicle-monitor__thumb--active': cam.id === activeId }"
          role="button"
          tabindex="0"
          @click="activeId = cam.id"
          @keydown.enter.prevent="activeId = cam.id"
          @keydown.space.prevent="activeId = cam.id"
        >
          <span class="vehicle-monitor__thumb-frame">
            <span class="vehicle-monitor__thumb-name">{{ cam.name }}</span>
          </span>
        </li>
      </ul>

      <!-- 主视图 -->
      <div class="vehicle-monitor__main">
        <header class="vehicle-monitor__head">
          <span class="vehicle-monitor__head-title">{{ activeCamera.name }}</span>
          <span class="vehicle-monitor__head-status">
            <span class="vehicle-monitor__live-dot" />
            LIVE
          </span>
        </header>

        <div class="vehicle-monitor__feed">
          <div class="vehicle-monitor__feed-grid" />
          <div class="vehicle-monitor__feed-scan" />
          <button class="vehicle-monitor__play" type="button" aria-label="播放">
            <svg viewBox="0 0 39 38" fill="none">
              <circle cx="19.5" cy="19" r="18.5" fill="rgba(2,37,79,0.6)" stroke="#4DF2FF"/>
              <path d="M16 12L26 19L16 26V12Z" fill="#4DF2FF"/>
            </svg>
          </button>
          <button class="vehicle-monitor__expand" type="button" aria-label="放大">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M3 7V3H7M13 3H17V7M17 13V17H13M7 17H3V13"
                    stroke="#4DF2FF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <footer class="vehicle-monitor__controls">
          <span class="vehicle-monitor__time">14:12</span>
          <div class="vehicle-monitor__progress">
            <div class="vehicle-monitor__progress-fill" :style="{ width: progress + '%' }" />
          </div>
          <span class="vehicle-monitor__time">23:59</span>
        </footer>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BasePanel from '@/components/common/BasePanel.vue'

interface Camera {
  id: number
  name: string
}

const cameras: Camera[] = [
  { id: 1, name: '正门-A' },
  { id: 2, name: '北门-B' },
  { id: 3, name: '地库1' },
  { id: 4, name: '地库2' },
]

const activeId = ref<number>(cameras[0].id)
const activeCamera = computed(
  () => cameras.find(c => c.id === activeId.value) ?? cameras[0],
)
const progress = ref(58)
</script>

<style lang="scss" scoped>
.vehicle-monitor {
  flex: 0 0 auto;
  height: 283px;
  gap: $spacing-xs;

  &__body {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: 86px 1fr;
    gap: 0;
  }

  // thumbs
  &__thumbs {
    list-style: none;
    margin: 0;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;

    &::-webkit-scrollbar { width: 0; }
  }

  &__thumb {
    width: 80px;
    height: 46px;
    cursor: pointer;
    flex-shrink: 0;
    outline: none;
    transition: transform 0.18s ease;

    &:hover { transform: translateX(2px); }
  }

  &__thumb-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 174, 255, 0.35);
    border-radius: $radius-sm;
    background:
      linear-gradient(135deg, rgba(0, 174, 255, 0.12) 0%, rgba(0, 60, 110, 0.35) 100%),
      repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0 4px, transparent 4px 8px);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      right: 4px;
      width: 4px;
      height: 4px;
      background: #2ED0B0;
      border-radius: 50%;
      box-shadow: 0 0 4px #2ED0B0;
    }
  }

  &__thumb-name {
    font-size: 10px;
    color: $color-text-2;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  }

  &__thumb--active &__thumb-frame {
    border-color: $color-primary-bright;
    box-shadow: 0 0 8px rgba(77, 242, 255, 0.5), inset 0 0 6px rgba(77, 242, 255, 0.3);
  }

  &__thumb--active &__thumb-name {
    color: $color-text-1;
  }

  // main view
  &__main {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 0;
  }

  &__head {
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    background: linear-gradient(90deg, rgba(0, 174, 255, 0.18) 0%, rgba(0, 174, 255, 0) 100%);
    border-bottom: 1px solid rgba(0, 174, 255, 0.25);
    flex-shrink: 0;
  }

  &__head-title {
    font-size: $font-size-xs;
    color: $color-text-1;
    font-weight: 500;
  }

  &__head-status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: #FF4D4D;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  &__live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #FF4D4D;
    box-shadow: 0 0 6px #FF4D4D;
    animation: live-pulse 1.4s ease-in-out infinite;
  }

  &__feed {
    flex: 1;
    min-height: 0;
    position: relative;
    background:
      radial-gradient(circle at 50% 60%, rgba(0, 60, 120, 0.55) 0%, rgba(2, 12, 28, 0.85) 70%),
      #02101e;
    overflow: hidden;
  }

  &__feed-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(77, 242, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(77, 242, 255, 0.06) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  &__feed-scan {
    position: absolute;
    left: 0;
    right: 0;
    top: -2px;
    height: 60px;
    background: linear-gradient(180deg, rgba(77, 242, 255, 0) 0%, rgba(77, 242, 255, 0.18) 50%, rgba(77, 242, 255, 0) 100%);
    animation: feed-scan 4s linear infinite;
    pointer-events: none;
  }

  &__play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 39px;
    height: 38px;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;

    svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 8px rgba(77, 242, 255, 0.55));
    }

    &:hover svg { filter: drop-shadow(0 0 12px rgba(77, 242, 255, 0.85)); }
  }

  &__expand {
    position: absolute;
    right: 6px;
    bottom: 6px;
    width: 22px;
    height: 22px;
    background: rgba(2, 37, 79, 0.6);
    border: 1px solid rgba(77, 242, 255, 0.4);
    border-radius: 3px;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg { width: 14px; height: 14px; }

    &:hover {
      border-color: $color-primary-bright;
      box-shadow: 0 0 6px rgba(77, 242, 255, 0.5);
    }
  }

  &__controls {
    height: 25px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    background: rgba(0, 30, 58, 0.5);
    flex-shrink: 0;
  }

  &__time {
    font-family: $font-number;
    font-size: 10px;
    color: $color-text-2;
    flex-shrink: 0;
  }

  &__progress {
    flex: 1;
    height: 3px;
    background: rgba(0, 174, 255, 0.18);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  &__progress-fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: linear-gradient(90deg, #00AEFF 0%, #4DF2FF 100%);
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(77, 242, 255, 0.6);

    &::after {
      content: '';
      position: absolute;
      right: -3px;
      top: 50%;
      width: 8px;
      height: 8px;
      background: $color-primary-bright;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 6px $color-primary-bright;
    }
  }
}

@keyframes live-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}

@keyframes feed-scan {
  0%   { transform: translateY(0); }
  100% { transform: translateY(260px); }
}

@media (prefers-reduced-motion: reduce) {
  .vehicle-monitor__live-dot,
  .vehicle-monitor__feed-scan { animation: none; }
}
</style>
