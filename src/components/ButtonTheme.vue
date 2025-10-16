<script setup lang='ts'>
import {ref} from 'vue'
import ThemeIcon from './icons/IconArrowDownLight.vue'
import SunIcon from './icons/IconSun.vue'
import MoonIcon from './icons/IconMoon.vue'
import { useTheme } from '@/composables/useTheme'

const toggleOpen = ref(false)

const { toggleTheme } = useTheme()

</script>

<template>
  <div @click="toggleOpen = !toggleOpen"
    class="flex items-center justify-between gap-1 px-1.5 py-0.5 text-xs bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 shadow-xss dark:shadow-xsd h-max rounded-md relative cursor-pointer">
    theme <i>
      <ThemeIcon />
    </i>
    <div v-if="toggleOpen" class="absolute w-full left-0 top-full grid gap-1 border border-light-40 bg-light-10 text-light-50 dark:bg-light-40 dark:text-dark-10 rounded-md">
      <button @click="toggleTheme('light')" class="hover:bg-light-30 hover:dark:bg-gray-50/20 flex justify-start items-center gap-2 p-1 cursor-pointer">
        <SunIcon/>
        <span>light</span>
      </button>
      <button @click="toggleTheme('dark')" class="hover:bg-light-30 hover:dark:bg-gray-50/20 flex justify-start items-center gap-2 p-1 cursor-pointer">
        <MoonIcon/>
        <span>dark</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
