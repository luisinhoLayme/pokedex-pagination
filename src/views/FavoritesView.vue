<script setup lang='ts'>
import PokemonCard from '@/components/PokemonCard.vue';
import { useFavorites } from '@/composables/useFavorites';

defineProps({})

const skeleton = new Array(10).fill(null)
const { favoritePokemons, isLoading } = useFavorites()

</script>

<template>
  <main class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
    <div
      v-if="isLoading"
      v-for="ske of skeleton"
      class="min-h-56 bg-b/10 rounded-lg p-5 grid gap-5 animate-pulse"
    >
      <header class="grid gap-2 grid-cols-2">
        <div class="min-h-9 bg-b/15"></div>
        <div class="min-h-9 bg-b/15"></div>
      </header>
      <div class="min-h-1 bg-b/15 w-50"></div>
      <div class="min-h-2 bg-b/15"></div>
    </div>
    <PokemonCard
      v-else-if="favoritePokemons"
      v-for="poke of favoritePokemons"
      :pokemon="poke"
      :key="poke.id"
    />
  </main>
</template>

<style scoped>

</style>
