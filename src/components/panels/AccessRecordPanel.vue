<template>
  <BasePanel class="access-record" title="通行记录">
    <template #actions>
      <div class="access-record__tabs">
        <button
          v-for="t in tabs"
          :key="t.value"
          class="access-record__tab"
          :class="{ 'access-record__tab--active': tab === t.value }"
          type="button"
          @click="tab = t.value"
        >{{ t.label }}</button>
      </div>
    </template>

    <div class="access-record__toolbar">
      <label class="access-record__search">
        <input
          v-model="keyword"
          class="access-record__search-input"
          placeholder="请输入关键词搜索"
        />
        <svg class="access-record__search-icon" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="#00AEFF" stroke-width="1.4"/>
          <path d="M12.5 12.5L16 16" stroke="#00AEFF" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </label>

      <div class="access-record__date">
        <span class="access-record__date-text">{{ date }}</span>
        <svg class="access-record__date-icon" viewBox="0 0 13 13" fill="none">
          <path
            fill="#00AEFF"
            d="M1.625 2.16694C1.32681 2.16694 1.08306 2.40987 1.08306 2.70806L1.08306 11.375C1.08306 11.674 1.32681 11.9169 1.625 11.9169L11.375 11.9169C11.6743 11.9169 11.9169 11.6743 11.9169 11.375L11.9169 2.70806C11.9165 2.40908 11.674 2.16694 11.375 2.16694L1.625 2.16694ZM11.375 13L1.625 13C0.728813 13 0 12.2712 0 11.375L0 2.70806C0 1.81269 0.728813 1.08306 1.625 1.08306L11.375 1.08306C12.2712 1.08306 13 1.81269 13 2.70806L13 11.375C13 12.2712 12.2712 13 11.375 13ZM3.82525 3.25L3.75781 3.25C3.47754 3.24955 3.25045 3.02246 3.25 2.74219L3.25 0.507812C3.25 0.228313 3.47831 0 3.75781 0L3.82525 0C4.10475 0 4.33306 0.228313 4.33306 0.507812L4.33306 2.74219C4.33262 3.02214 4.10602 3.24911 3.82606 3.25M9.24219 3.25L9.17475 3.25C8.89448 3.24955 8.66738 3.02246 8.66694 2.74219L8.66694 0.507812C8.66694 0.228312 8.89444 0 9.17475 0L9.24219 0C9.52169 0 9.75 0.228313 9.75 0.507812L9.75 2.74219C9.74955 3.02246 9.52246 3.24955 9.24219 3.25ZM3.79194 9.20806L2.70806 9.20806C2.40976 9.20673 2.16827 8.96524 2.16694 8.66694C2.16694 8.36875 2.41069 8.125 2.70806 8.125L3.79194 8.125C4.08931 8.125 4.33306 8.36875 4.33306 8.66694C4.33306 8.96431 4.08931 9.20806 3.79194 9.20806ZM7.04194 9.20806L5.95806 9.20806C5.65976 9.20673 5.41827 8.96524 5.41694 8.66694C5.41694 8.36875 5.66069 8.125 5.95806 8.125L7.04194 8.125C7.33931 8.125 7.58306 8.36875 7.58306 8.66694C7.58306 8.96431 7.33931 9.20806 7.04194 9.20806ZM3.79194 6.5L2.70806 6.5C2.40945 6.49866 2.16783 6.25668 2.16694 5.95806C2.16694 5.66069 2.41069 5.41694 2.70806 5.41694L3.79194 5.41694C4.08931 5.41694 4.33306 5.66069 4.33306 5.95806C4.33306 6.25625 4.08931 6.5 3.79194 6.5ZM10.2919 6.5L9.20806 6.5C8.90945 6.49866 8.66783 6.25668 8.66694 5.95806C8.66694 5.66069 8.91069 5.41694 9.20806 5.41694L10.2919 5.41694C10.5893 5.41694 10.8331 5.66069 10.8331 5.95806C10.8331 6.25625 10.5893 6.5 10.2919 6.5ZM7.04194 6.5L5.95806 6.5C5.65945 6.49866 5.41783 6.25668 5.41694 5.95806C5.41694 5.66069 5.66069 5.41694 5.95806 5.41694L7.04194 5.41694C7.33931 5.41694 7.58306 5.66069 7.58306 5.95806C7.58306 6.25625 7.33931 6.5 7.04194 6.5Z"/>
        </svg>
      </div>
    </div>

    <div v-if="tab === 'person'" class="access-record__person-table">
      <div class="access-record__person-row access-record__person-row--head">
        <span class="access-record__person-name">姓名</span>
        <span class="access-record__person-gender">性别</span>
        <span class="access-record__person-role">身份</span>
        <span class="access-record__person-time">通行时间</span>
        <span class="access-record__person-status-head">状态</span>
      </div>

      <div
        v-for="r in filteredPersonRecords"
        :key="r.id"
        class="access-record__person-row"
      >
        <span class="access-record__person-name">{{ r.name }}</span>
        <span class="access-record__person-gender">{{ r.gender }}</span>
        <span class="access-record__person-role">{{ r.role }}</span>
        <span class="access-record__person-time">{{ r.time }}</span>
        <span
          class="access-record__person-status"
          :class="`access-record__person-status--${r.direction}`"
        >{{ r.direction === 'in' ? '进' : '出' }}</span>
      </div>
    </div>

    <div v-else class="access-record__list">
      <div
        v-for="r in filteredVehicleRecords"
        :key="r.id"
        class="access-record__item"
        :class="`access-record__item--${r.direction}`"
      >
        <!-- 左：抓拍图 -->
        <div class="access-record__photo" aria-hidden="true">
          <span class="access-record__plate">{{ r.plate }}</span>
        </div>

        <!-- 中：信息（两列：标签 / 值）-->
        <div class="access-record__info">
          <div class="access-record__info-labels">
            <span>车牌号：</span>
            <span>通过设备：</span>
            <span>通行时间：</span>
          </div>
          <div class="access-record__info-values">
            <span>{{ r.plate }}</span>
            <span>{{ r.device }}</span>
            <span>{{ r.time }}</span>
          </div>
        </div>

        <!-- 右：光效层（绝对定位，59x127） -->
        <div class="access-record__glow" aria-hidden="true">
          <div class="access-record__glow-fill" />
          <div class="access-record__glow-bar" />
          <div class="access-record__glow-stripe" />
        </div>

        <!-- 状态徽章 + 上下三角（垂直居中聚合） -->
        <div class="access-record__indicator" aria-hidden="true">
          <span class="access-record__triangle access-record__triangle--top" />
          <div class="access-record__status">
            <span class="access-record__status-ring access-record__status-ring--outer" />
            <span class="access-record__status-ring access-record__status-ring--mid" />
            <span class="access-record__status-ring access-record__status-ring--inner" />
            <span class="access-record__status-text">{{ r.direction === 'in' ? '进' : '出' }}</span>
          </div>
          <span class="access-record__triangle access-record__triangle--bottom" />
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BasePanel from '@/components/common/BasePanel.vue'

type Direction = 'in' | 'out'

interface Record {
  id: number
  plate: string
  device: string
  time: string
  direction: Direction
}

interface PersonRecord {
  id: number
  name: string
  gender: string
  role: string
  time: string
  direction: Direction
}

const tabs = [
  { value: 'person',  label: '人员' },
  { value: 'vehicle', label: '车辆' },
] as const
type Tab = typeof tabs[number]['value']
const tab = ref<Tab>('vehicle')

const keyword = ref('')
const date = ref('2026-4-20')

const records: Record[] = [
  { id: 1, plate: '皖A1***45', device: '门禁1', time: '2025.1.1 15:12:11', direction: 'in' },
  { id: 2, plate: '皖A1***45', device: '门禁1', time: '2025.1.1 15:12:11', direction: 'out' },
  { id: 3, plate: '皖A2***86', device: '道闸2', time: '2025.1.1 15:08:34', direction: 'in' },
  { id: 4, plate: '皖A3***12', device: '摆闸1', time: '2025.1.1 14:55:02', direction: 'out' },
  { id: 5, plate: '皖A4***78', device: '门禁2', time: '2025.1.1 14:42:18', direction: 'in' },
  { id: 6, plate: '皖A5***99', device: '道闸1', time: '2025.1.1 14:30:51', direction: 'out' },
]

const personRecords: PersonRecord[] = [
  { id: 1, name: '张某', gender: '女', role: '员工', time: '2025-11-1 18:09:23', direction: 'out' },
  { id: 2, name: '张某', gender: '女', role: '员工', time: '2025-11-1 18:09:23', direction: 'in' },
  { id: 3, name: '张某', gender: '女', role: '员工', time: '2025-11-1 18:09:23', direction: 'out' },
  { id: 4, name: '张某', gender: '女', role: '员工', time: '2025-11-1 18:09:23', direction: 'out' },
  { id: 5, name: '张某', gender: '女', role: '员工', time: '2025-11-1 18:09:23', direction: 'out' },
  { id: 6, name: '张某', gender: '女', role: '员工', time: '2025-11-1 18:09:23', direction: 'out' },
]

const filteredVehicleRecords = computed(() => {
  if (!keyword.value.trim()) return records
  const k = keyword.value.trim()
  return records.filter(r => r.plate.includes(k) || r.device.includes(k))
})

const filteredPersonRecords = computed(() => {
  if (!keyword.value.trim()) return personRecords
  const k = keyword.value.trim()
  return personRecords.filter(r =>
    r.name.includes(k) ||
    r.gender.includes(k) ||
    r.role.includes(k) ||
    r.time.includes(k),
  )
})
</script>

<style lang="scss" scoped>
$record-bg: linear-gradient(255deg, rgba(5, 25, 49, 0.35) 9%, rgba(10, 44, 83, 0.6) 96%);
$record-border: #0B2C52;
$ctrl-bg: rgba(8, 39, 76, 0.6);
$ctrl-border: rgba(0, 174, 255, 0.4);
$tab-inactive: rgba(0, 174, 255, 0.2);
$tab-active: #00AEFF;
$enter-color: #0CF92C;
$exit-color: #FF1414;
$enter-glow: linear-gradient(90deg, rgba(156, 255, 169, 0) 14%, rgba(53, 255, 80, 0.55) 88%);
$exit-glow:  linear-gradient(90deg, rgba(255, 72, 72, 0) 15%, rgba(255, 72, 72, 0.55) 88%);

.access-record {
  flex: 0 0 auto;
  height: 367px;
  gap: 10px;
  min-height: 0;

  // 复写 BasePanel 背景到设计稿一致
  :deep(.base-panel),
  &.base-panel {
    background: rgba(5, 25, 49, 0.64);
    border-color: $record-border;
  }

  // 顶部 tabs
  &__tabs {
    display: flex;
    gap: 0;
  }

  &__tab {
    width: 46px;
    height: 24px;
    border: 1px solid rgba(0, 174, 255, 0.4);
    background: rgba(0, 174, 255, 0.06);
    color: $color-text-2;
    font-size: $font-size-xxs;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;
    padding: 0;

    &:first-child { border-radius: $radius-sm 0 0 $radius-sm; }
    &:last-child  { border-radius: 0 $radius-sm $radius-sm 0; border-left: none; }

    &--active {
      background: rgba(0, 174, 255, 0.28);
      color: $color-text-1;
      box-shadow: inset 0 0 6px rgba(77, 242, 255, 0.45);
    }

    &:hover:not(&--active) {
      color: $color-text-1;
      background: rgba(0, 174, 255, 0.18);
    }
  }

  // 工具栏
  &__toolbar {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  &__search {
    flex: 1;
    height: 34px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    background: $ctrl-bg;
    border: 1px solid $ctrl-border;
    border-radius: 4px;
  }

  &__search-input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: 0;
    color: $color-text-1;
    font-size: $font-size-xs;
    font-family: inherit;

    &::placeholder { color: rgba(255, 255, 255, 0.85); }
  }

  &__search-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &__date {
    width: 132px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: $ctrl-bg;
    border: 1px solid $ctrl-border;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }

  &__date-text {
    font-size: $font-size-xs;
    color: $color-text-1;
  }

  &__date-icon {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  &__person-table {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    padding-right: 2px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 174, 255, 0.4);
      border-radius: 2px;
    }
  }

  &__person-row {
    flex-shrink: 0;
    min-height: 38px;
    display: grid;
    grid-template-columns: 58px 60px 60px minmax(116px, 1fr) 30px;
    align-items: center;
    padding: 0 8px 0 12px;
    background: $ctrl-bg;
    border: 1px solid rgba(0, 174, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    line-height: 20px;

    & + & {
      margin-top: -1px;
    }

    &--head {
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, rgba(0, 174, 255, 0) 0%, rgba(0, 174, 255, 0.58) 100%);
      font-weight: 800;

      &::before {
        content: '';
        position: absolute;
        inset: 1px 0;
        pointer-events: none;
        opacity: 0.13;
        background: repeating-linear-gradient(122deg, transparent 0 16px, #2BA7EA 16px 18px, transparent 18px 20px);
      }

      > span {
        position: relative;
        z-index: 1;
      }
    }
  }

  &__person-name,
  &__person-gender,
  &__person-role,
  &__person-time,
  &__person-status-head {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__person-status {
    width: 26px;
    height: 23px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    line-height: 17px;

    &--in {
      color: $enter-color;
      background: rgba(12, 249, 44, 0.3);
    }

    &--out {
      color: $exit-color;
      background: rgba(255, 72, 72, 0.3);
    }
  }

  // 列表：默认显示 2 行（127×2 + 10 间距 = 264px），超出滚动
  &__list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 2px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 174, 255, 0.4);
      border-radius: 2px;
    }
  }

  // 单卡 392 宽，高度按内容自适应（最小 127）
  &__item {
    position: relative;
    flex: 0 0 auto;
    min-height: 127px;
    padding: 14px 0;
    background: $record-bg;
    border: 1px solid $record-border;
    border-radius: 4px;
    overflow: hidden;
  }

  // 抓拍图：保持 3:2 比例（设计稿 149:99），随容器宽度等比缩放
  &__photo {
    position: relative;
    margin-left: 14px;
    width: 130px;
    aspect-ratio: 149 / 99;
    height: auto;
    border-radius: 4px;
    background:
      linear-gradient(135deg, rgba(0, 174, 255, 0.18) 0%, rgba(0, 60, 110, 0.5) 100%),
      repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0 6px, transparent 6px 12px);
    border: 1px solid rgba(0, 174, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow:
      5px 5px 5px 0 rgba(0, 0, 0, 0.349),
      inset 0 5px 5px 0 rgba(0, 0, 0, 0.349);

    &::before {
      content: '';
      position: absolute;
      inset: 14px 18px;
      border: 1px dashed rgba(0, 174, 255, 0.28);
      border-radius: 4px;
    }
  }

  &__plate {
    position: relative;
    z-index: 1;
    font-family: $font-number;
    font-size: $font-size-sm;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
  }

  // 信息：紧跟图片右侧，垂直居中；让出右侧 65px 给徽章 + 光效
  &__info {
    position: absolute;
    left: 154px;
    right: 65px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 4px;
    font-size: $font-size-xxs;
    line-height: 30px;
  }

  &__info-labels,
  &__info-values {
    display: flex;
    flex-direction: column;
  }

  &__info-labels {
    width: 60px;
    color: #FFFFFF;
    opacity: 0.8;
    flex-shrink: 0;
  }

  &__info-values {
    width: 89px;
    color: #00AEFF;
    font-family: $font-number;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  // 右侧光效底层 59px，跟随卡片高度
  &__glow {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 59px;
    pointer-events: none;
  }

  // 90deg 渐变填充矩形（圆角右侧）
  &__glow-fill {
    position: absolute;
    inset: 0;
    border-radius: 0 3px 3px 0;
    opacity: 0.2;
  }

  &__item--in &__glow-fill {
    background: $enter-glow;
  }

  &__item--out &__glow-fill {
    background: $exit-glow;
  }

  // 右侧 2px 竖条（跟随卡片高度，上下留 1px）
  &__glow-bar {
    position: absolute;
    left: 56px;
    top: 1px;
    bottom: 1px;
    width: 2px;
    background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.65) 50%, transparent 100%);
    opacity: 0.65;
  }

  &__item--in &__glow-bar {
    background: linear-gradient(180deg, transparent 0%, #35FF50 50%, transparent 100%);
  }

  &__item--out &__glow-bar {
    background: linear-gradient(180deg, transparent 0%, #FF4848 50%, transparent 100%);
  }

  // 装饰性高光（跟随卡片高度，仅上下各留 3px）
  &__glow-stripe {
    position: absolute;
    left: 35px;
    top: 3px;
    bottom: 3px;
    width: 46px;
    background: linear-gradient(120deg,
      transparent 30%,
      rgba(255, 255, 255, 0.18) 50%,
      transparent 70%);
    mix-blend-mode: screen;
    opacity: 0.6;
  }

  // 状态指示器整体（上三角 + 圆 + 下三角）：右锚定，垂直居中，确保完整显示
  &__indicator {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5.45px;
  }

  // 上下小三角 5x4.55
  &__triangle {
    width: 0;
    height: 0;
    border-left: 2.5px solid transparent;
    border-right: 2.5px solid transparent;
    opacity: 0.5;
  }

  &__item--in &__triangle {
    &--top    { border-bottom: 4.55px solid $enter-color; }
    &--bottom { border-top:    4.55px solid $enter-color; }
  }

  &__item--out &__triangle {
    &--top    { border-bottom: 4.55px solid $exit-color; }
    &--bottom { border-top:    4.55px solid $exit-color; }
  }

  // 状态圈 36x36
  &__status {
    position: relative;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__status-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid currentColor;

    &--outer { inset: 0; }
    &--mid   { inset: 2px; }
    &--inner { inset: 3px; opacity: 0.3; }
  }

  &__item--in &__status  { color: $enter-color; }
  &__item--out &__status { color: $exit-color; }

  &__status::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: radial-gradient(circle, currentColor 0%, transparent 70%);
    opacity: 0.18;
  }

  &__status-text {
    position: relative;
    z-index: 1;
    font-size: $font-size-xs;
    font-weight: bold;
    color: currentColor;
    text-shadow: 0 0 6px currentColor;
  }
}
</style>
