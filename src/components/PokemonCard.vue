<script setup lang='ts'>
import { ref } from 'vue'
import HeartIcon from './icons/IconHeart.vue'
import type { Pokemon } from '@/interfaces/pokemon';
import { typeColors } from '@/utils/typeColors'
import { getTypeColorClasses } from '@/utils/getTypeColorClasses'
import { useFavorites } from '../composables/useFavorites'

type Props = {
  pokemon: Pokemon
}

const { pokemon } = defineProps<Props>()
const color = ref('#A8A77A')

const type = pokemon.types[0]?.type.name as string
color.value = typeColors[type] || '#A8A77A'

const { isPokemonFavorite, toggleFavoriteStatus } = useFavorites()

</script>

<template>
  <article class="shadow-poke dark:shadow-poke-v2 rounded-xs grid gap-3 p-5 relative">
    <div
      :class="`w-14 h-14 blur-2xl absolute right-15 top-15 ${color}`"
    ></div>
    <header class="flex justify-between items-center relative">
      <i
        @click="toggleFavoriteStatus(pokemon.id)"
        class="absolute -left-2 top-0 cursor-pointer"
        :class="[isPokemonFavorite(pokemon.id) ? 'text-light-10' : 'text-light-10/30']"
      >
        <HeartIcon />
      </i>
      <div>
        <h2 class="text-md font-medium dark:text-light-10">{{pokemon.name}}</h2>
        <span class="text-light-20">#{{pokemon.id}}</span>
      </div>
      <div class="w-24">
        <img :src="pokemon.frontSprite" alt="Bulbasaur image">
      </div>
    </header>
    <section class="flex gap-2">

      <span
        class="max-h-[29px] rounded-xs py-1 px-2.5 text-xs font-light"
        v-for="type of pokemon.types"
        :class="[
          getTypeColorClasses(type.type.name).bg as string,
          getTypeColorClasses(type.type.name).text as string,
          'dark:bg-opacity-50'
        ]"
        :key="type.type.name"
      >
        {{type.type.name}}
      </span>
      <!-- <span class="bg-b/20 dark:bg-b/15 rounded-xl py-1 px-2.5 text-xs font-light dark:text-text leading-5">Poison</span> -->
    </section>
    <footer class="flex justify-between items-center dark:text-text">
      <p class="text-sm">HP {{ pokemon.hp }}</p>
      <button class="border border-bg hover:bg-b/20 dark:border-text/20 font-light px-4 py-1.5 rounded-2xl cursor-pointer">
        See
      </button>
    </footer>
  </article>
</template>

<style scoped></style>
