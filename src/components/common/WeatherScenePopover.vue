<template>
  <div class="weather-scene" @click.stop>
    <button
      ref="trigger"
      class="weather-scene__trigger"
      :class="{ 'weather-scene__trigger--active': open }"
      type="button"
      @click="toggle"
    >
      <img class="weather-scene__icon" :src="activeIcon" alt="" />
      <span class="weather-scene__text">{{ activeLabel }}</span>
      <svg class="weather-scene__caret" :class="{ 'weather-scene__caret--open': open }"
           viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        class="weather-scene-panel"
        :style="panelStyle"
        @click.stop
      >
        <div class="weather-scene-panel__header">
          <div class="weather-scene-panel__title">
            <span class="weather-scene-panel__title-bar" />
            场景设置
          </div>
          <label class="weather-scene-panel__auto">
            <span class="weather-scene-panel__auto-text">自动</span>
            <span
              class="weather-scene-panel__switch"
              :class="{ 'weather-scene-panel__switch--on': auto }"
              role="switch"
              :aria-checked="auto"
              tabindex="0"
              @click="toggleAuto"
              @keydown.space.prevent="toggleAuto"
              @keydown.enter.prevent="toggleAuto"
            >
              <span class="weather-scene-panel__switch-dot" />
            </span>
          </label>
        </div>

        <div class="weather-scene-panel__group">
          <div
            v-for="item in timeScenes"
            :key="item.key"
            class="weather-scene-panel__cell"
            :class="{
              'weather-scene-panel__cell--active': !auto && current === item.key,
              'weather-scene-panel__cell--disabled': auto,
            }"
            @click="selectScene(item.key)"
          >
            <img class="weather-scene-panel__cell-icon" :src="item.icon" alt="" />
            <span class="weather-scene-panel__cell-label">{{ item.label }}</span>
          </div>
        </div>

        <span class="weather-scene-panel__divider" />

        <div class="weather-scene-panel__group">
          <div
            v-for="item in weatherScenes"
            :key="item.key"
            class="weather-scene-panel__cell"
            :class="{
              'weather-scene-panel__cell--active': !auto && current === item.key,
              'weather-scene-panel__cell--disabled': auto,
            }"
            @click="selectScene(item.key)"
          >
            <img class="weather-scene-panel__cell-icon" :src="item.icon" alt="" />
            <span class="weather-scene-panel__cell-label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import iconMorningUrl from '@/assets/images/icon/weather/早晨.svg'
import iconNoonUrl    from '@/assets/images/icon/weather/中午.svg'
import iconSunsetUrl  from '@/assets/images/icon/weather/日落.svg'
import iconNightUrl   from '@/assets/images/icon/weather/夜晚.svg'
import iconSunnyUrl   from '@/assets/images/icon/weather/晴.svg'
import iconCloudyUrl  from '@/assets/images/icon/weather/多云.svg'
import iconRainUrl    from '@/assets/images/icon/weather/下雨.svg'
import iconSnowUrl    from '@/assets/images/icon/weather/雪.svg'

type SceneKey =
  | 'morning' | 'noon' | 'sunset' | 'night'
  | 'sunny' | 'cloudy' | 'rainy' | 'snowy'

interface SceneItem {
  key: SceneKey
  label: string
  icon: string
}

const emit = defineEmits<{
  change: [payload: { auto: boolean; scene: SceneKey }]
}>()

const timeScenes: SceneItem[] = [
  { key: 'morning', label: '早晨', icon: iconMorningUrl },
  { key: 'noon',    label: '中午', icon: iconNoonUrl },
  { key: 'sunset',  label: '日落', icon: iconSunsetUrl },
  { key: 'night',   label: '夜晚', icon: iconNightUrl },
]
const weatherScenes: SceneItem[] = [
  { key: 'sunny',  label: '晴',   icon: iconSunnyUrl },
  { key: 'cloudy', label: '多云', icon: iconCloudyUrl },
  { key: 'rainy',  label: '下雨', icon: iconRainUrl },
  { key: 'snowy',  label: '雪',   icon: iconSnowUrl },
]
const allScenes = [...timeScenes, ...weatherScenes]

function detectAutoScene(): SceneKey {
  const h = new Date().getHours()
  if (h >= 5 && h < 10) return 'morning'
  if (h >= 10 && h < 16) return 'noon'
  if (h >= 16 && h < 19) return 'sunset'
  return 'night'
}

const open = ref(false)
const auto = ref(true)
const current = ref<SceneKey>(detectAutoScene())

const activeLabel = computed(() => allScenes.find(s => s.key === current.value)?.label ?? '自动')
const activeIcon = computed(() => allScenes.find(s => s.key === current.value)?.icon ?? iconSun)

const PANEL_WIDTH = 412
const PANEL_OFFSET = 12
const panelPos = ref({ top: 0, left: 0 })
const panelStyle = computed(() => ({
  top: `${panelPos.value.top}px`,
  left: `${panelPos.value.left}px`,
  width: `${PANEL_WIDTH}px`,
}))

function updatePanelPos() {
  const el = trigger.value
  if (!el) return
  const r = el.getBoundingClientRect()
  let left = r.left + r.width / 2 - PANEL_WIDTH / 2
  const maxLeft = window.innerWidth - PANEL_WIDTH - 8
  if (left < 8) left = 8
  if (left > maxLeft) left = maxLeft
  panelPos.value = { top: r.bottom + PANEL_OFFSET, left }
}

function toggle() {
  open.value = !open.value
  if (open.value) requestAnimationFrame(updatePanelPos)
}
function close() { open.value = false }

function toggleAuto() {
  auto.value = !auto.value
  if (auto.value) current.value = detectAutoScene()
  emit('change', { auto: auto.value, scene: current.value })
}

function selectScene(key: SceneKey) {
  if (auto.value) return
  current.value = key
  emit('change', { auto: auto.value, scene: key })
}

const trigger = ref<HTMLElement | null>(null)
function onDocClick(e: MouseEvent) {
  if (!open.value) return
  const root = (trigger.value?.closest('.weather-scene')) as HTMLElement | null
  const panel = document.querySelector('.weather-scene-panel')
  const target = e.target as Node
  if (root && root.contains(target)) return
  if (panel && panel.contains(target)) return
  close()
}
function onViewport() {
  if (open.value) updatePanelPos()
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  window.addEventListener('resize', onViewport)
  window.addEventListener('scroll', onViewport, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  window.removeEventListener('resize', onViewport)
  window.removeEventListener('scroll', onViewport, true)
})
</script>

<style lang="scss" scoped>
.weather-scene {
  position: relative;
  display: inline-flex;
  align-items: center;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 6px;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: $color-primary;
    font-family: $font-body;
  }

  &__trigger--active {
    color: $color-primary-bright;
  }

  &__icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  &__text {
    font-size: $font-size-sm;
    font-weight: 600;
    line-height: 16px;
    background: linear-gradient(180deg, #E6F4FB 0%, #248FCC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__caret {
    width: 12px;
    height: 12px;
    color: $color-primary-bright;
    transition: transform 0.18s ease;

    &--open { transform: rotate(180deg); }
  }

  &__panel {
    display: none;
  }
}

.weather-scene-panel {
  position: fixed;
  padding: 16px 16px 18px;
  background: rgba(5, 25, 49, 0.92);
  border: 1px solid $color-border;
  border-radius: 8px;
  box-shadow: $shadow-panel;
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transform-origin: top center;
  transform: scale(var(--app-scale, 1));

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 6px;
    background: linear-gradient(89deg, #09284D 2%, rgba(5, 25, 49, 0) 98%);
  }

  &__title {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 2px 10px;
    font-size: $font-size-sm;
    font-weight: 500;
    line-height: 22px;
    color: #FFFFFF;
    background: linear-gradient(180deg, #FFFFFF 57%, #66BCFF 86%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__title-bar {
    width: 2px;
    height: 14px;
    background: $color-primary-bright;
    border-radius: 2px;
  }

  &__auto {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  &__auto-text {
    font-size: $font-size-xs;
    color: $color-text-2;
  }

  &__switch {
    position: relative;
    width: 32px;
    height: 18px;
    border-radius: 999px;
    background: rgba(0, 174, 255, 0.18);
    border: 1px solid $color-border;
    cursor: pointer;
    outline: none;
    transition: background 0.2s ease, border-color 0.2s ease;

    &--on {
      background: rgba(77, 242, 255, 0.35);
      border-color: $color-primary-bright;
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(77, 242, 255, 0.5);
    }
  }

  &__switch-dot {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #D1EDFF;
    transition: transform 0.2s ease, background 0.2s ease;

    .weather-scene-panel__switch--on & {
      transform: translateX(14px);
      background: #FFFFFF;
    }
  }

  &__group {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  &__divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 174, 255, 0) 0%, rgba(0, 174, 255, 0.5) 50%, rgba(0, 174, 255, 0) 100%);
  }

  &__cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid transparent;

    &:hover {
      background: rgba(0, 174, 255, 0.1);
    }

    &--active {
      background: rgba(77, 242, 255, 0.12);
      border-color: rgba(77, 242, 255, 0.55);
      box-shadow: inset 0 0 10px rgba(77, 242, 255, 0.2);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.55;

      &:hover { background: transparent; }
    }
  }

  &__cell-icon {
    display: block;
    width: 56px;
    height: 56px;
    object-fit: contain;
  }

  &__cell-label {
    font-size: $font-size-xs;
    color: $color-text-2;
    line-height: 22px;
  }

  &__cell--active &__cell-label {
    color: $color-primary-bright;
  }
}
</style>
