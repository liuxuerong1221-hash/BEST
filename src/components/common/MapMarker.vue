<template>
  <div
    class="map-marker"
    :class="{ 'map-marker--active': active }"
    :style="positionStyle"
    role="button"
    tabindex="0"
    @click="emit('select')"
    @keydown.enter.prevent="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <span v-if="label" class="map-marker__label">{{ label }}</span>

    <!-- 主体：圆形 + 三角指针 -->
    <div class="map-marker__body">
      <svg class="map-marker__pin" viewBox="0 0 40 52.5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient :id="`mm-stroke-${uid}`" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0"   stop-color="#0C84FF"/>
            <stop offset="1"   stop-color="#1DEAFF"/>
          </linearGradient>
          <linearGradient :id="`mm-icon-${uid}`" x1="11" y1="11" x2="11" y2="29" gradientUnits="userSpaceOnUse">
            <stop offset="0"   stop-color="#FFFFFF"/>
            <stop offset="1"   stop-color="#0083CC"/>
          </linearGradient>
          <linearGradient :id="`mm-tri-${uid}`" x1="7.25" y1="42" x2="7.25" y2="52.5" gradientUnits="userSpaceOnUse">
            <stop offset="0"   stop-color="#0C84FF"/>
            <stop offset="1"   stop-color="#1DEAFF"/>
          </linearGradient>
        </defs>

        <!-- 圆形气泡 -->
        <circle cx="20" cy="20" r="19.5"
          fill="rgba(2, 37, 79, 0.6)"
          :stroke="`url(#mm-stroke-${uid})`" stroke-width="1"/>

        <!-- 会议室图标 -->
        <g transform="translate(11 11)">
          <path :fill="`url(#mm-icon-${uid})`"
            d="M17.9621 15.3606C17.7941 14.6243 17.1491 14.132 16.3467 14.1272C16.1272 14.1258 15.9072 14.1272 15.6872 14.1272C16.5931 13.7616 17.1809 12.9183 17.1801 11.9851C17.1821 10.7006 16.0887 9.65633 14.7392 9.65491C13.3927 9.65302 12.2927 10.6978 12.2902 11.9804C12.288 12.915 12.8768 13.7599 13.7847 14.1249C13.5487 14.1244 13.3132 14.1249 13.0772 14.1301C12.3157 14.1467 11.6858 14.6257 11.5223 15.3284C11.4708 15.5506 11.4833 15.7529 11.4728 15.9832C11.4663 16.1267 11.4713 16.3869 11.4713 16.3869L11.3308 16.3869C11.3308 16.0651 11.3328 15.9249 11.3303 15.6813C11.3213 14.7683 10.6143 14.1135 9.6573 14.1111C9.4528 14.1107 9.24831 14.113 9.04431 14.1135C9.93541 13.7423 10.5108 12.9071 10.5108 11.9847C10.5113 10.7011 9.4148 9.65586 8.06733 9.65444C6.71836 9.65349 5.62488 10.694 5.62188 11.9809C5.61816 12.9109 6.20087 13.7531 7.10235 14.1206C6.89336 14.122 6.68436 14.1211 6.47486 14.123C6.28287 14.1244 6.08187 14.1561 5.90038 14.2149C5.22889 14.4314 4.8099 15.0066 4.8014 15.6904C4.7984 15.9415 4.8009 16.1935 4.8009 16.4376L4.8174 16.6612C2.86194 16.3812 1.35647 14.7802 1.35647 12.847L1.35647 12.2036C1.35647 10.0975 3.14243 8.38225 5.35239 8.34481C9.6988 8.34718 13.4582 8.3415 17.8461 8.3415L17.9951 8.3415C17.9971 8.3415 17.9991 8.29222 17.9991 8.27185C17.9991 7.52085 18.0006 6.77317 17.9976 6.02218C17.9971 5.91594 17.9851 5.81003 17.9616 5.70614C17.7936 4.96984 17.1486 4.47754 16.3462 4.47281C16.1267 4.47138 15.9067 4.47281 15.6867 4.47281C16.5926 4.10714 17.1804 3.26386 17.1796 2.33069C17.1816 1.04618 16.0882 0.0018955 14.7387 0.000474073C13.3922 -0.00142118 12.2922 1.04334 12.2897 2.32595C12.2875 3.26055 12.8763 4.10548 13.7842 4.47044C13.5482 4.46996 13.3127 4.47044 13.0767 4.47565C12.3152 4.49223 11.6853 4.97126 11.5218 5.67392C11.4703 5.89614 11.4828 6.09893 11.4723 6.32873C11.4658 6.4723 11.4708 6.73242 11.4708 6.73242L11.3303 6.73242C11.3303 6.41071 11.3323 6.27093 11.3298 6.02692C11.3208 5.11388 10.6138 4.45906 9.6568 4.4567C9.4523 4.45622 9.24781 4.45906 9.04381 4.45906C9.93492 4.08787 10.5103 3.25265 10.5103 2.33022C10.5108 1.04666 9.41431 0.00142204 8.06683 6.55203e-07C6.71786 -0.000946972 5.62438 1.03955 5.62138 2.32595C5.61766 3.25594 6.20037 4.09815 7.10185 4.4657C6.89286 4.46712 6.68386 4.46665 6.47437 4.46807C6.28237 4.46949 6.08137 4.50123 5.89988 4.55999C5.22839 4.77652 4.8094 5.35173 4.8009 6.03544C4.7979 6.28657 4.8004 6.53863 4.8004 6.78265L4.8229 7.08779C2.11446 7.37302 0 9.55778 0 12.2036L0 12.847C0 15.4691 2.07696 17.6358 4.7504 17.9523L4.7474 17.9959L4.7474 17.9992C9.4938 18.0021 13.3102 17.9959 17.8466 17.9959L17.9956 17.9959C17.9976 17.9959 17.9996 17.9467 17.9996 17.9263C17.9996 17.1753 18.0011 16.4276 17.9981 15.6761C17.9976 15.5701 17.9856 15.4643 17.9621 15.3606Z"/>
        </g>

        <!-- 三角指针 -->
        <path d="M12.75 42 L19.75 52.5 L27.25 42 Q19.75 46 12.75 42 Z"
          :fill="`url(#mm-tri-${uid})`"/>
      </svg>
    </div>

    <!-- 地面光圈：双层椭圆 -->
    <svg class="map-marker__base" viewBox="0 0 49 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24.5" cy="12" rx="24.2" ry="11.7"
        fill="rgba(10, 15, 21, 0.502)" fill-opacity="0.8"
        stroke="#00AEFF" stroke-width="0.6"/>
      <ellipse cx="24.5" cy="12" rx="18.2" ry="7.7"
        fill="rgba(10, 15, 21, 0.502)"
        stroke="#00AEFF" stroke-width="0.6"/>
    </svg>

    <!-- 涟漪扩散（active 时增强） -->
    <span class="map-marker__ripple" />
    <span class="map-marker__ripple map-marker__ripple--delayed" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 地图区域内的横向位置（百分比，0-100，相对父容器） */
  x?: number
  /** 地图区域内的纵向位置（百分比，0-100，相对父容器） */
  y?: number
  /** 是否为当前激活点 */
  active?: boolean
  /** hover 时显示在点位顶部的会议室名称 */
  label?: string
}>(), {
  x: 50,
  y: 50,
  active: false,
  label: '',
})

const emit = defineEmits<{
  select: []
}>()

// 让每个实例的 SVG defs id 唯一
const uid = Math.random().toString(36).slice(2, 8)

const positionStyle = computed(() => ({
  left: `${props.x}%`,
  top:  `${props.y}%`,
}))
</script>

<style lang="scss" scoped>
.map-marker {
  position: absolute;
  width: 49px;
  height: 71px;
  // 锚点：地面椭圆的中心（marker 的底部中心）
  transform: translate(-50%, calc(-100% + 12px));
  pointer-events: auto;
  cursor: pointer;
  z-index: 3;
  outline: none;

  &__label {
    position: absolute;
    left: 50%;
    top: -25px;
    transform: translateX(-50%) translateY(4px);
    min-width: 96px;
    height: 24px;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(77, 242, 255, 0.55);
    border-radius: 12px;
    background: rgba(5, 25, 49, 0.86);
    box-shadow: 0 0 12px rgba(0, 174, 255, 0.28);
    color: $color-text-1;
    font-size: $font-size-xxs;
    line-height: 1;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  &__body {
    position: absolute;
    top: 5px;
    left: 4px;
    width: 40px;
    height: 52.5px;
    filter: drop-shadow(0 0 8px rgba(0, 174, 255, 0.45));
    animation: marker-float 3s ease-in-out infinite;
  }

  &__pin {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__base {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 49px;
    height: 24px;
  }

  &__ripple {
    position: absolute;
    bottom: 6px;
    left: 50%;
    width: 49px;
    height: 24px;
    transform: translate(-50%, 0);
    border: 1px solid rgba(0, 174, 255, 0.55);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    animation: marker-ripple 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;

    &--delayed {
      animation-delay: 1.2s;
    }
  }

  &--active &__body {
    filter: drop-shadow(0 0 14px rgba(77, 242, 255, 0.85));
    animation-duration: 1.6s;
  }

  &--active &__ripple {
    border-color: rgba(77, 242, 255, 0.9);
  }

  &:hover &__body {
    transform: translateY(-2px);
    transition: transform 0.18s ease;
  }

  &:hover &__label,
  &:focus-visible &__label {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  &:focus-visible &__body {
    filter: drop-shadow(0 0 14px rgba(77, 242, 255, 0.85));
  }
}

@keyframes marker-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}

@keyframes marker-ripple {
  0%   { opacity: 0; transform: translate(-50%, 0) scale(0.6); }
  20%  { opacity: 0.7; }
  100% { opacity: 0; transform: translate(-50%, 0) scale(1.8); }
}

@media (prefers-reduced-motion: reduce) {
  .map-marker__body,
  .map-marker__ripple {
    animation: none;
  }

  .map-marker__label {
    transition: none;
  }
}
</style>
