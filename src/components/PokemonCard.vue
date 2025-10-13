<script setup lang='ts'>
import type { PokemonResponse } from '@/interfaces/pokeon.response';
import img from './../assets/bulbbasaur.png'
import HeartIcon from './icons/IconHeart.vue'
import type { Pokemon } from '@/interfaces/pokemon';
import { ref } from 'vue'

type Props = {
  pokemon: Pokemon
}
const { pokemon } = defineProps<Props>()
const color = ref('#A8A77A')

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

const type = pokemon.types[0]?.type.name as string

color.value = typeColors[type] || '#A8A77A'

</script>

<template>
  <article class="shadow-poke dark:shadow-poke-v2 rounded-2xl grid gap-3 p-5 relative">
    <div
      :class="`w-14 h-14 blur-2xl absolute right-15 top-15`"
      :style="{backgroundColor: `${color}cc`}"
    ></div>
    <header class="flex justify-between items-center relative">
      <i class="absolute -left-2 top-0 text-b/50">
        <HeartIcon />
      </i>
      <div>
        <h2 class="text-md font-medium dark:text-text">{{pokemon.name}}</h2>
        <span class="text-b">#{{pokemon.id}}</span>
      </div>
      <div class="w-24">
        <img :src="pokemon.frontSprite" alt="Bulbasaur image">
      </div>
    </header>
    <section class="flex gap-2">

      <span
        class="bg-b/20 dark:bg-b/15 max-h-[29px] rounded-xl py-1 px-2.5 text-xs font-light dark:text-text leading-5"
        v-for="type of pokemon.types"
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
