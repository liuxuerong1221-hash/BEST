<template>
  <section class="camera-detail">
    <!-- 头部 -->
    <header class="camera-detail__header">
      <div class="camera-detail__title">
        <span class="camera-detail__dot">
          <svg viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="8" stroke="#00AEFF" stroke-width="1"/>
            <circle cx="8.5" cy="8.5" r="5.5" fill="#00AEFF"/>
          </svg>
        </span>
        <h3 class="camera-detail__title-text">实时监控</h3>
      </div>
      <button class="camera-detail__close" type="button" aria-label="关闭" @click="emit('close')">
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
    </header>

    <!-- 监控画面 -->
    <div class="camera-detail__feed">
      <div class="camera-detail__feed-bg">
        <span class="camera-detail__feed-scan" />
      </div>
      <button class="camera-detail__expand" type="button" aria-label="放大" @click="openExpand">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M1.67 1.67L6.67 1.67M1.67 1.67L1.67 6.67M1.67 1.67L7 7"
                stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M18.33 1.67L13.33 1.67M18.33 1.67L18.33 6.67M18.33 1.67L13 7"
                stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M1.67 18.33L6.67 18.33M1.67 18.33L1.67 13.33M1.67 18.33L7 13"
                stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M18.33 18.33L13.33 18.33M18.33 18.33L18.33 13.33M18.33 18.33L13 13"
                stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- 基础信息 -->
    <div class="camera-detail__info">
      <span class="camera-detail__info-label">基础信息</span>

      <div class="camera-detail__info-row">
        <span class="camera-detail__info-text">名称：{{ device.name }}</span>
        <span class="camera-detail__status" :class="`camera-detail__status--${device.status}`">
          {{ device.status === 'online' ? '在线' : '离线' }}
        </span>
      </div>

      <div class="camera-detail__info-row">
        <span class="camera-detail__info-text">设备位置：{{ device.location }}</span>
      </div>

      <div class="camera-detail__info-row">
        <span class="camera-detail__info-text">类型：{{ device.type }}</span>
      </div>
    </div>

    <!-- 关闭按钮 -->
    <div class="camera-detail__footer">
      <button class="camera-detail__close-btn" type="button" @click="emit('close')">关闭</button>
    </div>
  </section>

  <!-- 放大弹窗 -->
  <Teleport to="body">
    <div
      v-if="expanded"
      class="camera-modal"
      role="dialog"
      aria-modal="true"
      aria-label="监控画面"
      tabindex="-1"
      @click.self="closeExpand"
      @keydown.esc="closeExpand"
    >
      <section class="camera-modal__panel">
        <header class="camera-modal__header">
          <div class="camera-modal__title">
            <span class="camera-modal__dot" />
            <span class="camera-modal__title-text">{{ device.name }}</span>
            <span class="camera-modal__status" :class="`camera-modal__status--${device.status}`">
              {{ device.status === 'online' ? '在线' : '离线' }}
            </span>
          </div>
          <button class="camera-modal__close" type="button" aria-label="关闭" @click="closeExpand">
            <svg viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </header>
        <div class="camera-modal__feed">
          <div class="camera-modal__feed-bg">
            <span class="camera-modal__feed-scan" />
          </div>
          <div class="camera-modal__meta">
            <span>{{ device.location }}</span>
            <span>{{ device.type }}</span>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type DeviceStatus = 'online' | 'offline'

interface DeviceInfo {
  name: string
  location: string
  ip: string
  type: string
  status: DeviceStatus
}

const props = withDefaults(defineProps<{
  device?: DeviceInfo
}>(), {
  device: () => ({
    name: '北大门摄像头',
    location: '北大门',
    ip: '192.168.1.100',
    type: '枪机',
    status: 'online',
  }),
})

const emit = defineEmits<{
  close: []
}>()

const device = computed(() => props.device)
const expanded = ref(false)

function openExpand() { expanded.value = true }
function closeExpand() { expanded.value = false }
</script>

<style lang="scss" scoped>
.camera-detail {
  width: 100%;
  background: rgba(5, 25, 49, 0.64);
  border: 1px solid #0B2C52;
  border-radius: 8px;
  padding: 16px $spacing-lg 10px;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  overflow: hidden;
  box-sizing: border-box;

  // 头部
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__dot {
    width: 17px;
    height: 17px;
    display: inline-flex;
    flex-shrink: 0;
    svg { width: 100%; height: 100%; }
  }

  &__title-text {
    margin: 0;
    font-size: $font-size-sm;
    font-weight: bold;
    color: $color-text-1;
    line-height: 20px;
  }

  &__close {
    width: 28px;
    height: 28px;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &:hover { opacity: 0.75; }
    svg { width: 14px; height: 14px; display: block; }
  }

  // 视频区
  &__feed {
    position: relative;
    width: 100%;
    height: 240px;
    border-radius: $radius-sm;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__feed-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, rgba(0, 174, 255, 0.18) 0%, rgba(2, 16, 36, 0) 70%),
      linear-gradient(135deg, #0E2647 0%, #061328 100%);

    &::before, &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    &::before {
      background:
        repeating-linear-gradient(0deg, transparent 0 23px, rgba(0, 174, 255, 0.08) 23px 24px),
        repeating-linear-gradient(90deg, transparent 0 23px, rgba(0, 174, 255, 0.08) 23px 24px);
      mix-blend-mode: screen;
    }

    &::after {
      background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%);
    }
  }

  &__feed-scan {
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 60px;
    background: linear-gradient(180deg, rgba(0, 174, 255, 0) 0%, rgba(0, 174, 255, 0.28) 50%, rgba(0, 174, 255, 0) 100%);
    animation: feed-scan 4s linear infinite;
    pointer-events: none;
  }

  &__expand {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    z-index: 1;

    &:hover { opacity: 0.75; }
    svg { width: 100%; height: 100%; }
  }

  // 基础信息
  &__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__info-label {
    font-size: $font-size-sm;
    color: #00AEFF;
    line-height: 20px;
    font-weight: 500;
  }

  &__info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__info-text {
    font-size: $font-size-sm;
    font-weight: bold;
    color: $color-text-1;
    line-height: 22px;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    height: 33px;
    padding: 4px 9px;
    font-size: 18px;
    font-weight: bold;
    border-radius: $radius-md;

    &--online {
      color: $color-success;
      background: rgba(12, 249, 44, 0.2);
    }

    &--offline {
      color: #FF1414;
      background: rgba(255, 72, 72, 0.2);
    }
  }

  // 底部关闭
  &__footer {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 22px;
  }

  &__close-btn {
    width: 160px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 174, 255, 0.5);
    background: linear-gradient(0deg, rgba(1, 158, 244, 0.5) -19%, rgba(14, 33, 56, 0) 100%);
    color: $color-text-1;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $radius-sm;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(1, 158, 244, 0.5) -19%, rgba(14, 33, 56, 0) 100%);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover::before { opacity: 1; }
  }
}

@keyframes feed-scan {
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(240px); opacity: 0; }
}

// 放大弹窗
.camera-modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: rgba(0, 8, 18, 0.72);
  backdrop-filter: blur(6px);

  &__panel {
    width: min(1120px, calc(100vw - 96px));
    height: min(680px, calc(100vh - 96px));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(77, 242, 255, 0.35);
    border-radius: $radius-md;
    background: rgba(5, 25, 49, 0.92);
    box-shadow: 0 0 32px rgba(0, 174, 255, 0.24), inset 0 0 24px rgba(0, 174, 255, 0.08);
  }

  &__header {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-lg;
    border-bottom: 1px solid rgba(0, 174, 255, 0.24);
    flex-shrink: 0;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    min-width: 0;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $color-primary;
    box-shadow: 0 0 10px rgba(0, 174, 255, 0.75);
    flex-shrink: 0;
  }

  &__title-text {
    font-size: $font-size-sm;
    font-weight: bold;
    color: $color-text-1;
    white-space: nowrap;
  }

  &__status {
    height: 24px;
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    border-radius: $radius-sm;
    font-size: $font-size-xxs;
    font-weight: bold;

    &--online { color: $color-success; background: rgba(12, 249, 44, 0.2); }
    &--offline { color: #FF1414; background: rgba(255, 72, 72, 0.2); }
  }

  &__close {
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 8px;
    background: transparent;
    cursor: pointer;

    &:hover { opacity: 0.75; }
    svg { width: 14px; height: 14px; }
  }

  &__feed {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  &__feed-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, rgba(0, 174, 255, 0.2) 0%, rgba(2, 16, 36, 0) 72%),
      linear-gradient(135deg, #0E2647 0%, #061328 100%);

    &::before, &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    &::before {
      background:
        repeating-linear-gradient(0deg, transparent 0 31px, rgba(0, 174, 255, 0.08) 31px 32px),
        repeating-linear-gradient(90deg, transparent 0 31px, rgba(0, 174, 255, 0.08) 31px 32px);
      mix-blend-mode: screen;
    }

    &::after {
      background: linear-gradient(180deg, rgba(0,0,0,0.42) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.52) 100%);
    }
  }

  &__feed-scan {
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 96px;
    background: linear-gradient(180deg, rgba(0, 174, 255, 0) 0%, rgba(0, 174, 255, 0.26) 50%, rgba(0, 174, 255, 0) 100%);
    animation: modal-feed-scan 4.6s linear infinite;
    pointer-events: none;
  }

  &__meta {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 18px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    color: $color-text-2;
    font-size: $font-size-xs;
  }
}

@keyframes modal-feed-scan {
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(680px); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .camera-detail__feed-scan,
  .camera-modal__feed-scan {
    animation: none;
  }
}
</style>
