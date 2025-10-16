<script setup lang='ts'>
import PokemonCard from '@/components/PokemonCard.vue'
import Pagination from '@/components/Pagination.vue'
import { usePokedex } from '@/composables/usePokedex';

const skeleton = new Array(12).fill(null)
const { pokemons, isLoading, isPending, results } = usePokedex()

</script>

<template>
  <main class="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
    <div
      v-if="isPending"
      v-for="ske of skeleton"
      class="min-h-56 bg-light-40/30 dark:bg-light-40/10 rounded-lg p-5 grid gap-5 animate-pulse"
    >
      <header class="grid gap-2 grid-cols-2">
        <div class="min-h-9 bg-light-40/40 dark:bg-light-40/15"></div>
        <div class="min-h-9 bg-light-40/40 dark:bg-light-40/15"></div>
      </header>
      <div class="min-h-1 bg-light-40/40 dark:bg-light-40/15 w-50"></div>
      <div class="min-h-2 bg-light-40/40 dark:bg-light-40/15"></div>
    </div>

    <div v-else-if="!pokemons || pokemons.length === 0" class="text-center p-8 col-span-full">
        <p class="text-xl lg:text-2xl font-medium dark:text-text">No Pokémon found!</p>
        <p class="mt-2 text-sm dark:text-gray-400">
            Adjust your filters or your search.
        </p>
    </div>

    <PokemonCard
      v-else-if="pokemons"
      v-for="poke of pokemons"
      :pokemon="poke"
      :key="poke.id"
    />
  </main>
  <footer class="grid gap-4 my-6 md:grid-cols-[2fr_1fr] md:items-center">
    <Pagination  />
    <div>
      <p class="text-center text-dark-10 dark:text-light-10 md:text-right font-light text-sm">
        Showing {{ pokemons.length }} / {{ results }} results
      </p>
    </div>
  </footer>
</template>

<style scoped>

</style>

