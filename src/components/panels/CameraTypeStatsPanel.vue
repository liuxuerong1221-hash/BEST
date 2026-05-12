<template>
  <BasePanel class="camera-stats" title="监控设备类型统计">
    <!-- 在线 / 离线 统计条 -->
    <div class="camera-stats__status">
      <div class="camera-stats__status-block camera-stats__status-block--online">
        <span class="camera-stats__status-label">在线</span>
        <span class="camera-stats__status-value">{{ onlineCount }}</span>
      </div>
      <div class="camera-stats__status-block camera-stats__status-block--offline">
        <span class="camera-stats__status-label">离线</span>
        <span class="camera-stats__status-value">{{ offlineCount }}</span>
      </div>
    </div>

    <!-- 设备类型电池 -->
    <div class="camera-stats__types">
      <div
        v-for="device in devices"
        :key="device.name"
        class="camera-stats__type"
      >
        <div class="camera-stats__battery">
          <div class="camera-stats__battery-top" />
          <div class="camera-stats__battery-body">
            <div
              class="camera-stats__battery-fill"
              :style="{ height: device.percent + '%' }"
            >
              <div class="camera-stats__battery-fill-cap" />
            </div>
            <div class="camera-stats__battery-lines" aria-hidden="true">
              <span v-for="n in 4" :key="n" />
            </div>
            <span class="camera-stats__battery-text">{{ device.percent }}%</span>
          </div>
          <div class="camera-stats__battery-base" />
          <div class="camera-stats__battery-shadow" aria-hidden="true" />
        </div>
        <div class="camera-stats__type-caption">
          <span class="camera-stats__type-name">{{ device.name }}</span>
          <span class="camera-stats__type-count">{{ device.count }}台</span>
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import BasePanel from '@/components/common/BasePanel.vue'

interface CameraType {
  name: string
  count: number
  percent: number
}

const onlineCount = 3567
const offlineCount = 3567

const devices: CameraType[] = [
  { name: '半球',   count: 60, percent: 30 },
  { name: '枪机',   count: 60, percent: 30 },
  { name: '球机',   count: 60, percent: 30 },
  { name: '云台枪机', count: 60, percent: 30 },
]
</script>

<style lang="scss" scoped>
.camera-stats {
  flex: 0 0 auto;
  gap: $spacing-sm;

  &__status {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  &__status-block {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    border-radius: $radius-md;
    padding: 0 $spacing-md;

    &--online {
      background: rgba(40, 220, 185, 0.1);

      .camera-stats__status-label {
        background: #28DCB9;
        color: $color-text-1;
        padding: 8px 36px;
        border-radius: $radius-md;
        font-size: $font-size-sm;
        font-weight: 800;
      }

      .camera-stats__status-value {
        color: $color-text-1;
      }
    }

    &--offline {
      background: rgba(255, 20, 20, 0.1);

      .camera-stats__status-label {
        background: rgba(255, 20, 20, 0.5);
        color: $color-text-1;
        padding: 8px 36px;
        border-radius: $radius-md;
        font-size: $font-size-sm;
        font-weight: 800;
      }

      .camera-stats__status-value {
        color: $color-text-1;
      }
    }
  }

  &__status-value {
    font-family: $font-number;
    font-size: $font-size-md;
    font-weight: 800;
  }

  &__types {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-md;
    padding-top: 4px;
  }

  &__type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 11px;
  }

  // 电池主体
  &__battery {
    position: relative;
    width: 49px;
    height: 95px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__battery-top {
    width: 28px;
    height: 10px;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(0deg, #2CC3EA 0%, #3D81E5 100%);
    position: relative;
    z-index: 2;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -1px;
      transform: translateX(-50%);
      width: 22px;
      height: 3px;
      background: linear-gradient(89deg, #0063C9 0%, #16A4FF 49%, #0063C9 99%);
      border-radius: 2px;
    }
  }

  &__battery-body {
    position: relative;
    width: 49px;
    flex: 1;
    background: rgba(11, 146, 255, 0.3);
    border: 1px solid #11D4F0;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__battery-fill {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(22, 151, 96, 0.7) 0%, rgba(17, 213, 180, 0.7) 100%);
    transition: height 0.4s ease;

    &-cap {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 4px;
      background: rgba(0, 252, 204, 0.7);
    }
  }

  &__battery-lines {
    position: absolute;
    left: 4px;
    right: 4px;
    top: 6px;
    bottom: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;

    span {
      height: 1px;
      background: linear-gradient(180deg, rgba(238, 238, 238, 0) 13%, rgba(167, 226, 255, 0.2) 59%, rgba(216, 216, 216, 0) 83%);
    }
  }

  &__battery-text {
    position: relative;
    z-index: 1;
    font-family: $font-body;
    font-size: $font-size-md;
    font-weight: 600;
    color: $color-text-1;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  }

  &__battery-base {
    width: 49px;
    height: 6px;
    border-radius: 0 0 4px 4px;
    background: linear-gradient(180deg, #194374 0%, #3D81E5 100%);
    position: relative;
    z-index: 2;
  }

  &__battery-shadow {
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    width: 54px;
    height: 10px;
    border-radius: 50%;
    background: rgba(11, 30, 53, 0.59);
    box-shadow: inset 0 0 4px rgba(17, 212, 240, 0.3);
  }

  &__type-caption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  &__type-name,
  &__type-count {
    font-size: $font-size-xs;
    color: $color-text-1;
    line-height: 1.3;
    white-space: nowrap;
  }
}
</style>
