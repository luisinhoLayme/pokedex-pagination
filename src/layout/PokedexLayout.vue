<script setup lang='ts'>
import ButtonTheme from '@/components/ButtonTheme.vue'

defineProps({})

</script>

<template>
  <header class="grid gap-3 xl:flex xl:gap-3 xl:items-center bg-white dark:bg-bg-2 dark:text-text">
    <section class="flex flex-col items-center justify-center xl:items-start">
      <div class="flex gap-4 items-center">
        <h1 class="text-4xl font-bold">Pokedex GO!</h1>
        <ButtonTheme />
      </div>
      <p class="text-sm xl:whitespace-nowrap">The essential encyclopedia for the modern coarch.</p>
    </section>
    <section class="grid gap-2 md:grid-cols-4 lg:grid-cols-7 xl:items-center">
      <div class="md:col-span-full lg:col-start-1 lg:col-end-3 xl:col-start-2 xl:col-end-4">
        <input
          class="border border-b dark:border-b/60 outline-none w-full p-2.5 rounded-md"
          type="text"
          placeholder="Search for name..."
        />
      </div>
      <button
        class="text-center h-max bg-bg dark:bg-text text-white dark:text-bg p-2.5 cursor-pointer border border-b rounded-md lg:col-start-4 xl:col-start-auto"
      >Pokedex</button>
      <button
        class="text-center h-max p-2.5 cursor-pointer dark:bg-bg-2 border border-b dark:border-b/60 rounded-md"
      >Favorites</button>
      <div>
        <select id="countries" class="bg-white border border-b rounded-lg outline-none block w-full p-2.5 dark:bg-bg-2 dark:border-b/60 dark:placeholder-gray-400 dark:text-text cursor-pointer">
          <option selected>All types</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
          <option value="dark">Dark</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>
      </div>
      <p class="flex justify-center md:justify-end items-center font-light dark:text-b">Page 4 / 45</p>
    </section>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
