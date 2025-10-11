<script setup lang='ts'>
import type { PokemonResponse } from '@/interfaces/pokeon.response';
import img from './../assets/bulbbasaur.png'
import HeartIcon from './icons/IconHeart.vue'
import type { Pokemon } from '@/interfaces/pokemon';

type Props = {
  pokemon: Pokemon
}

const { pokemon } = defineProps<Props>()

</script>

<template>
  <article class="shadow-poke dark:shadow-poke-v2 rounded-2xl grid gap-3 p-5">
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
