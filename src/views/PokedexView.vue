<script setup lang='ts'>
import PokemonCard from '@/components/PokemonCard.vue'
import Pagination from '@/components/Pagination.vue'

const pokes = new Array(20).fill(null)
console.log(pokes)
</script>

<template>
  <main class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
    <PokemonCard
      v-for="poke of pokes"
    />
  </main>
  <Pagination />
</template>

<style scoped>

</style>

