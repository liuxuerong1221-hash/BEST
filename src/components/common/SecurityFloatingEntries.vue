<template>
  <div class="security-floating-entries" aria-label="安防二级入口">
    <button
      v-for="entry in entries"
      :key="entry.kind"
      class="security-floating-entries__item"
      type="button"
      :aria-label="entry.label"
      @click="handleClick(entry)"
    >
      <span class="security-floating-entries__icon" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient :id="`sec-entry-stroke-${entry.kind}`" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0C84FF" />
              <stop offset="1" stop-color="#1DEAFF" />
            </linearGradient>
            <linearGradient :id="`sec-entry-icon-${entry.kind}`" x1="20" y1="11" x2="20" y2="29" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFFFFF" />
              <stop offset="1" stop-color="#0083CC" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="19.5" fill="rgba(2,37,79,0.6)" :stroke="`url(#sec-entry-stroke-${entry.kind})`" />
          <path :d="entry.path" fill-rule="evenodd" :fill="`url(#sec-entry-icon-${entry.kind})`" />
        </svg>
      </span>
      <span class="security-floating-entries__text">{{ entry.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface EntryItem {
  kind: string
  label: string
  path: string
  route?: string
}

function handleClick(entry: EntryItem) {
  if (entry.route) router.push({ name: entry.route })
}

const entries: EntryItem[] = [
  {
    kind: 'camera',
    label: '摄像头',
    route: 'security-camera',
    path: 'M16 26C17.2 26.67 18.55 27 20 27C21.45 27 22.77 26.67 24 26C25.22 25.33 26.21 24.44 26.92 23.3C27.64 22.16 28 20.92 28 19.56C28 18.2 27.64 16.96 26.92 15.81C26.2 14.66 25.22 13.76 24 13.1C22.77 12.43 21.45 12 20 12C18.55 12 17.2 12.43 15.98 13.1C14.76 13.76 13.79 14.66 13.08 15.81C12.36 16.96 12 18.2 12 19.56C12 20.92 12.36 22.16 13.08 23.3C13.79 24.44 14.75 25.34 16 26ZM15.97 17.3C16.39 16.63 16.93 16.13 17.67 15.73C18.36 15.33 19.13 15.15 20 15.15C20.86 15.15 21.61 15.34 22.32 15.73C23.07 16.13 23.62 16.65 24.03 17.3C24.45 17.99 24.65 18.68 24.65 19.47C24.65 20.26 24.45 20.94 24.03 21.63C23.62 22.28 23.07 22.8 22.32 23.21C21.61 23.59 20.86 23.78 20 23.78C19.13 23.78 18.36 23.59 17.67 23.21C16.93 22.8 16.39 22.29 15.97 21.63C15.55 20.94 15.35 20.26 15.35 19.47C15.35 18.68 15.55 17.99 15.97 17.3ZM21.81 21.49C21.29 21.97 20.68 22.21 19.96 22.21C19.24 22.21 18.63 21.97 18.11 21.49C17.63 21.01 17.33 20.41 17.33 19.71C17.33 19.02 17.58 18.43 18.11 17.94C18.63 17.44 19.24 17.19 19.96 17.19C20.68 17.19 21.29 17.43 21.81 17.94C22.34 18.46 22.59 19.06 22.59 19.71C22.59 20.41 22.34 21 21.81 21.49ZM20.06 28.22C22.16 28.22 24.19 27.42 25.75 25.99C26.13 25.64 26.74 25.66 27.09 26.05C27.44 26.44 27.41 27.05 27.02 27.41C25.1 29.17 22.64 30.13 20.05 30.13C17.4 30.13 14.89 29.12 12.96 27.3C12.58 26.93 12.57 26.32 12.93 25.93C13.29 25.55 13.9 25.54 14.28 25.9C15.85 27.4 17.9 28.22 20.06 28.22Z',
  },
  {
    kind: 'building',
    label: '楼宇设备',
    path: 'M20.95 10.18C20.81 10.06 20.63 10 20.45 10C20.27 10 20.09 10.06 19.95 10.18L10.24 18.21C9.77 18.59 10.04 19.35 10.65 19.35H12.33V28.25C12.33 28.8 12.78 29.25 13.33 29.25H18.12V22.46C18.12 22.08 18.43 21.77 18.81 21.77H28.57V19.35H30.25C30.86 19.35 31.13 18.59 30.66 18.21L20.95 10.18ZM28.3 24.22V23.25H27.35V24.22H20.27C19.99 24.22 19.76 24.44 19.76 24.72V29.47C19.76 29.75 19.99 29.98 20.27 29.98H30.63C30.91 29.98 31.14 29.75 31.14 29.47V24.72C31.14 24.44 30.91 24.22 30.63 24.22H28.3ZM21.67 28.06V26.14H23.56V28.06H21.67ZM24.49 28.06V26.14H26.39V28.06H24.49Z',
  },
]
</script>

<style lang="scss" scoped>
.security-floating-entries {
  width: 105px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  &__item {
    width: 105px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px 0 0;
    border: 0;
    border-radius: 20px;
    background: rgba(10, 15, 21, 0.5);
    color: $color-text-1;
    cursor: pointer;
    outline: none;
    transition: transform 0.18s ease, filter 0.18s ease;

    &:hover {
      transform: translateY(-1px);
      filter: drop-shadow(0 0 10px rgba(29, 234, 255, 0.34));
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(77, 242, 255, 0.45);
    }
  }

  &__icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  &__icon svg {
    width: 40px;
    height: 40px;
    display: block;
  }

  &__text {
    font-size: $font-size-xs;
    font-weight: 600;
    line-height: 20px;
    color: $color-text-1;
    white-space: nowrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .security-floating-entries__item {
    transition: none;
  }
}
</style>
