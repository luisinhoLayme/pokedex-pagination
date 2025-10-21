<script setup lang='ts'>
import type { Stat } from '@/interfaces/pokeon.response';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

interface Props {
  stat: Stat
  description: string
  color?: string
  icon?: string
}

const {stat} = defineProps<Props>()

//console.log(stat)

</script>

<template>
  <div>
    <div class="flex justify-between font-medium">
      <span>{{icon}} {{capitalizeFirstLetter(stat.stat.name)}}</span>
      <span>{{stat.base_stat}}</span>
    </div>
    <div class="h-4 bg-dark-20/30 rounded-2xl">
      <div :style="{width: `${stat.base_stat}%`, backgroundColor: color}" class="rounded-2xl h-full"></div>
    </div>
    <p class="text-xs text-dark-30 dark:text-light-40">{{ description }}</p>
  </div>
</template>

<style scoped>

</style>
