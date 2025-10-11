<script setup lang='ts'>
import { ref } from 'vue'
import { usePokedex } from '@/composables/usePokedex'

defineProps({})
const selectedType = ref()

const {} = usePokedex()

const handleSelectType = (e: Event) => {
  const selectElement = e.target as HTMLSelectElement
  selectedType.value = selectElement.value
  console.log(selectedType.value)
}
</script>

<template>
  <section>
    <select id="countries"
      class="bg-white border border-b rounded-lg outline-none block w-full p-2.5 dark:bg-bg-2 dark:border-b/60 dark:placeholder-gray-400 dark:text-text cursor-pointer"
      @change="handleSelectType"
    >
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
  </section>
</template>

<style scoped></style>
