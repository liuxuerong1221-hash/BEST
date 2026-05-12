<template>
  <BasePanel class="building-device" title="楼宇设备监测">
    <div class="building-device__grid">
      <div
        v-for="device in devices"
        :key="device.type"
        class="building-device__item"
      >
        <div class="building-device__icon-wrapper">
          <component :is="device.icon" class="building-device__icon" />
        </div>
        <div class="building-device__content">
          <p class="building-device__label">{{ device.label }}</p>
          <div class="building-device__stats">
            <div class="building-device__stat">
              <span class="building-device__stat-label">总数</span>
              <span class="building-device__stat-value">{{ device.total }}</span>
            </div>
            <div class="building-device__stat">
              <span class="building-device__stat-label">在线</span>
              <span class="building-device__stat-value building-device__stat-value--online">
                {{ device.online }}
              </span>
            </div>
            <div class="building-device__stat">
              <span class="building-device__stat-label">故障</span>
              <span class="building-device__stat-value building-device__stat-value--fault">
                {{ device.fault }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import BasePanel from '@/components/common/BasePanel.vue'
import IconAirConditioner from '@/components/icons/IconAirConditioner.vue'
import IconFreshAir from '@/components/icons/IconFreshAir.vue'
import IconSupplyAir from '@/components/icons/IconSupplyAir.vue'
import IconExhaustAir from '@/components/icons/IconExhaustAir.vue'

const devices = [
  {
    type: 'air-conditioner',
    label: '空调',
    icon: IconAirConditioner,
    total: 120,
    online: 115,
    fault: 5,
  },
  {
    type: 'fresh-air',
    label: '新风',
    icon: IconFreshAir,
    total: 64,
    online: 60,
    fault: 4,
  },
  {
    type: 'supply-air',
    label: '送风',
    icon: IconSupplyAir,
    total: 48,
    online: 45,
    fault: 3,
  },
  {
    type: 'exhaust-air',
    label: '排风',
    icon: IconExhaustAir,
    total: 40,
    online: 37,
    fault: 3,
  },
]
</script>

<style lang="scss" scoped>
.building-device {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  &__icon-wrapper {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 32px;
    height: 32px;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 8px;
  }

  &__stats {
    display: flex;
    gap: 12px;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__stat-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__stat-value {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);

    &--online {
      color: #00d4aa;
    }

    &--fault {
      color: #ff6b6b;
    }
  }
}
</style>
