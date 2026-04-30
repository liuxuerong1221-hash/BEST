<template>
  <BasePanel class="parking-overview" title="车位概况">
    <div class="parking-overview__body">
      <!-- 数据行：图标 + 三组指标 -->
      <div class="parking-overview__row">
        <img class="parking-overview__icon" :src="iconCar" alt="" />

        <div class="parking-overview__metrics">
          <div
            v-for="m in metrics"
            :key="m.label + m.value"
            class="parking-overview__metric"
          >
            <div class="parking-overview__metric-value">
              <span class="parking-overview__num" :style="{ color: m.color }">{{ m.value }}</span>
              <span class="parking-overview__unit">{{ m.unit }}</span>
            </div>
            <span class="parking-overview__metric-label">{{ m.label }}</span>
          </div>
        </div>
      </div>

      <!-- 停车场胶囊 -->
      <div class="parking-overview__lots">
        <div
          v-for="lot in lots"
          :key="lot.name"
          class="parking-overview__lot"
        >
          <span class="parking-overview__lot-tag" :style="{ background: lot.tagBg }">{{ lot.name }}</span>
          <span class="parking-overview__lot-free">
            余位<span class="parking-overview__lot-free-num">{{ lot.free }}</span>
          </span>
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import BasePanel from '@/components/common/BasePanel.vue'
import iconCar from '@/assets/images/icon/icon_车.svg'

interface Metric {
  label: string
  value: string
  unit: string
  color: string
}

const metrics: Metric[] = [
  { label: '车位总数', value: '276', unit: '位', color: '#EDD505' }, // 黄
  { label: '已使用',   value: '345', unit: '位', color: '#00AEFF' }, // 蓝
  { label: '使用率',   value: '65',  unit: '%', color: '#29F3D9' }, // 青绿
]

const lots = [
  { name: '地下负二层', free: 86, tagBg: '#0081FF' },
  { name: '地下停车场', free: 86, tagBg: '#00AEFF' },
]
</script>

<style lang="scss" scoped>
.parking-overview {
  flex: 0 0 auto;
  height: 198px;

  // body：垂直 flex
  &__body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 10px 0;
  }

  // 数据行：icon + 指标，gap 22
  &__row {
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 0 8px;
  }

  &__icon {
    width: 56px;
    height: 46px;
    flex-shrink: 0;
    object-fit: contain;
    display: block;
  }

  &__metrics {
    flex: 1;
    display: flex;
    gap: 48px;
  }

  &__metric {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  &__metric-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    height: 34px;
  }

  &__num {
    font-family: 'PingFang SC', $font-body;
    font-size: 24px;
    font-weight: 800;     // 特粗
    line-height: 1.4;
    text-shadow: 0 0 10px currentColor;
    filter: brightness(1.05);
  }

  &__unit {
    font-size: $font-size-xs;
    color: #FFFFFF;
    line-height: 20px;
  }

  &__metric-label {
    font-size: $font-size-xs;
    color: #FFFFFF;
    line-height: 20px;
    white-space: nowrap;
  }

  // 停车场胶囊
  &__lots {
    display: flex;
    gap: 10px;
  }

  &__lot {
    flex: 1;
    min-width: 0;
    height: 40px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    background: rgba(0, 174, 255, 0.1);
    border-radius: $radius-md;
    overflow: hidden;
  }

  &__lot-tag {
    width: 88px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-xs;
    font-weight: 800;
    color: #FFFFFF;
    border-radius: $radius-md;
    flex-shrink: 0;
  }

  &__lot-free {
    flex: 1;
    margin-left: 10px;
    font-size: $font-size-xs;
    color: #FFFFFF;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

  &__lot-free-num {
    font-size: $font-size-xs;
    font-weight: 800;
    margin: 0 2px;
  }
}
</style>
