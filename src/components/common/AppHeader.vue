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

    <!-- 左侧：时间日期 + 天气 -->
    <div class="app-header__left">
      <div class="app-header__time-group">
        <span class="app-header__time">{{ datetime.time }}</span>
        <span class="app-header__weekday">{{ datetime.weekday }}</span>
        <span class="app-header__date">{{ datetime.date }}</span>
      </div>
      <div class="app-header__divider" />
      <WeatherScenePopover class="app-header__weather" />
    </div>

    <!-- 右侧：用户信息 + 退出登录 -->
    <div class="app-header__right">
      <div class="app-header__user">
        <svg class="app-header__avatar" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="10" fill="#254D85" />
          <path d="M9.94 3.5a3.01 3.01 0 1 1 0 6.03 3.01 3.01 0 0 1 0-6.03Zm-5.27 11.96c-.03-3.09 1.48-5.01 3.37-5.76l1.94 3.24 2.05-3.17c1.83.8 3.28 2.7 3.3 5.69-3.35 1.33-6.89 1.43-10.66 0Z" fill="#DEF8FF" />
        </svg>
        <span class="app-header__username">{{ user.name }}</span>
      </div>
      <button class="app-header__logout" type="button" aria-label="退出登录">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10.62 5.75a.7.7 0 0 0-1.4 0v1.84a.7.7 0 0 0 1.4 0V5.75Zm2.63.36a.7.7 0 1 0-.84 1.12 3.85 3.85 0 1 1-4.98 0 .7.7 0 1 0-.84-1.12 5.25 5.25 0 1 0 6.66 0Z" />
          <path d="M4.58 1.25h10.84a3.33 3.33 0 0 1 3.33 3.33v10.84a3.33 3.33 0 0 1-3.33 3.33H4.58a3.33 3.33 0 0 1-3.33-3.33V4.58a3.33 3.33 0 0 1 3.33-3.33Zm0 1.4a1.93 1.93 0 0 0-1.93 1.93v10.84c0 1.07.86 1.93 1.93 1.93h10.84c1.07 0 1.93-.86 1.93-1.93V4.58a1.93 1.93 0 0 0-1.93-1.93H4.58Z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import WeatherScenePopover from '@/components/common/WeatherScenePopover.vue'

const user = ref({ name: 'admin' })

const datetime = ref({ weekday: '星期三', date: '2026年05月06日', time: '13:38' })

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  const update = () => {
    const now = new Date()
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    datetime.value = {
      weekday: weekdays[now.getDay()].replace('周', '星期'),
      date: `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日`,
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

  &__left {
    position: absolute;
    left: 40px;
    top: 35px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 1;
    height: 35px;
  }

  &__right {
    position: absolute;
    right: 40px;
    top: 35px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 1;
    height: 44px;
    padding: 6px 0;
  }

  &__time-group,
  &__weather,
  &__user {
    display: flex;
    align-items: center;
  }

  &__time-group {
    gap: 8px;
  }

  &__weather {
    gap: 8px;
  }

  &__weather-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    fill: $color-warning;
  }

  &__time {
    font-family: $font-body;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    background: linear-gradient(180deg, #E6F4FB 0%, #248FCC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__weekday,
  &__weather-text,
  &__date {
    font-family: $font-body;
    font-size: $font-size-sm;
    line-height: 16px;
    font-weight: 600;
    background: linear-gradient(180deg, #E6F4FB 0%, #248FCC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__divider {
    width: 1px;
    height: 19px;
    background: $color-primary;
    opacity: 0.4;
    flex-shrink: 0;
  }

  &__user {
    gap: 8px;
  }

  &__avatar,
  &__logout svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &__username {
    width: 53px;
    font-family: $font-body;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    background: linear-gradient(180deg, #E6F4FB 0%, #248FCC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
  }

  &__logout {
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    color: $color-primary;
    cursor: pointer;

    svg {
      fill: currentColor;
    }
  }
}
</style>
