<script setup lang='ts'>
import { ref } from 'vue'
import { usePokedex } from '@/composables/usePokedex'

type Props = {
  disabledArrt: boolean
}

defineProps<Props>()

const selectedType = ref()

const { setFilter } = usePokedex()

const handleSelectType = (e: Event) => {
  const selectElement = e.target as HTMLSelectElement
  selectedType.value = selectElement.value
  setFilter(selectedType.value)
}
</script>

<template>
  <section>
    <select id="countries" :disabled="disabledArrt"
      class="bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 shadow-xss dark:shadow-xsd rounded-lg outline-none block w-full p-2.5 dark:placeholder-gray-400 cursor-pointer disabled:text-b disabled:cursor-default"
      @change="handleSelectType">
      <option selected value="All">All types</option>
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

<style scoped>
select::picker-icon {
  color: #ffffff;
  transition: 0.4s rotate;
}
select:open::picker-icon {
  rotate: 180deg;
}
</style>
