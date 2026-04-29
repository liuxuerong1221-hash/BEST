<template>
  <header class="app-header">
    <!-- 头部装饰图 -->
    <img class="app-header__deco" src="@/assets/images/头部@2x.png" alt="" />

    <!-- 中间标题 -->
    <div class="app-header__center">
      <div class="app-header__title-row">
        <!-- 左侧装饰 -->
        <svg class="app-header__deco-line" viewBox="0 0 140 14" fill="none" preserveAspectRatio="none">
          <line x1="0" y1="7" x2="118" y2="7" stroke="url(#lg-l)" stroke-width="1"/>
          <polygon points="122,7 130,3 138,7 130,11" fill="#00AEFF" opacity="0.85"/>
          <defs>
            <linearGradient id="lg-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#00AEFF" stop-opacity="0"/>
              <stop offset="100%" stop-color="#00AEFF"/>
            </linearGradient>
          </defs>
        </svg>

        <h1 class="app-header__title">BEST园区可视化集成平台</h1>

        <!-- 右侧装饰 -->
        <svg class="app-header__deco-line" viewBox="0 0 140 14" fill="none" preserveAspectRatio="none" style="transform:scaleX(-1)">
          <line x1="0" y1="7" x2="118" y2="7" stroke="url(#lg-r)" stroke-width="1"/>
          <polygon points="122,7 130,3 138,7 130,11" fill="#00AEFF" opacity="0.85"/>
          <defs>
            <linearGradient id="lg-r" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#00AEFF" stop-opacity="0"/>
              <stop offset="100%" stop-color="#00AEFF"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- 副标题 -->
      <p class="app-header__subtitle">BEST PARK VISUALIZATION INTEGRATION PLATFORM</p>

    </div>

    <!-- 左侧：天气 -->
    <div class="app-header__weather">
      <svg class="app-header__icon" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="6" stroke="#4DF2FF" stroke-width="1.5"/>
        <path d="M14 2V4M14 24V26M2 14H4M24 14H26M5.5 5.5L7 7M21 21L22.5 22.5M5.5 22.5L7 21M21 7L22.5 5.5"
              stroke="#4DF2FF" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span class="app-header__weather-text">{{ weather.condition }}</span>
      <div class="app-header__divider" />
      <span class="app-header__weather-temp">{{ weather.temp }}</span>
    </div>

    <!-- 右侧：日期时间 -->
    <div class="app-header__datetime">
      <svg class="app-header__icon" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="19" rx="2" stroke="#4DF2FF" stroke-width="1.5"/>
        <path d="M3 11H25" stroke="#4DF2FF" stroke-width="1.5"/>
        <path d="M9 2V6M19 2V6" stroke="#4DF2FF" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span class="app-header__date">{{ datetime.weekday }} {{ datetime.date }}</span>
      <div class="app-header__divider" />
      <span class="app-header__time">{{ datetime.time }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const weather = ref({ condition: '晴天', temp: '4°C-20°C' })

const datetime = ref({ weekday: '周四', date: '2025.09.11', time: '18:30' })

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  const update = () => {
    const now = new Date()
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    datetime.value = {
      weekday: weekdays[now.getDay()],
      date: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    }
  }
  update()
  timer = setInterval(update, 30000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: $header-h;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: relative;

  &__center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    z-index: 1;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__deco-line {
    width: 140px;
    height: 14px;
    flex-shrink: 0;
  }

  &__title {
    font-family: $font-title;
    font-size: $font-size-xxl;
    font-weight: 400;
    letter-spacing: 6px;
    white-space: nowrap;
    background: linear-gradient(180deg, #FFFFFF 0%, #52C0FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 10px rgba(0, 174, 255, 0.8)) drop-shadow(0 0 24px rgba(0, 174, 255, 0.4));
  }

  &__subtitle {
    font-size: 11px;
    letter-spacing: 3px;
    color: rgba(77, 242, 255, 0.55);
    white-space: nowrap;
    font-family: $font-body;
    margin-top: -8px;
  }


  &__deco {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: auto;
    pointer-events: none;
    z-index: 0;
  }

  &__weather {
    position: absolute;
    left: 40px;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    z-index: 1;
  }

  &__datetime {
    position: absolute;
    right: 40px;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    z-index: 1;
  }

  &__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &__weather-text,
  &__date {
    font-family: $font-body;
    font-size: $font-size-sm;
    color: $color-text-2;
  }

  &__weather-temp,
  &__time {
    font-family: $font-number;
    font-size: $font-size-sm;
    color: $color-primary;
    font-weight: bold;
  }

  &__divider {
    width: 1px;
    height: 16px;
    background: $color-border;
    flex-shrink: 0;
  }
}
</style>
