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
    <form action="">
      <select id="countries" :disabled="disabledArrt"
        class="bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 shadow-xss dark:shadow-xsd rounded-lg outline-none block w-full p-2.5 dark:placeholder-gray-400 cursor-pointer disabled:text-b disabled:cursor-default "
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
    </form>
  </section>
</template>

<style scoped>
select,
::picker(select) {
  appearance: base-select;
  background-color: #C3B8E2;
  scrollbar-width: thin;
  scrollbar-color: #a39abd #c3b8e2; /* color del thumb y track */
}

html.dark {
  select,
  ::picker(select) {
    appearance: base-select;
    background-color: #A39ABD;
    border: none;
  }
}

/* select:hover, */
/* select:focus { */
/*   background-color: #C3B8E2; */
/* } */
select::picker-icon {
  content: url('/arrow-down.svg');
  color: #495057;
  opacity: .8;
  transition: 0.4s rotate;
}
select:open::picker-icon {
  rotate: 180deg;
}
::picker(select) {
  border: none;
  margin-top: .3rem;
}
option {
  border: 1px solid #A39ABDaa;
  background-color: #C3B8E2;
  padding: 10px;
  transition: 0.4s;
}
option:first-of-type {
  border-radius: 8px 8px 0 0;
  /* margin-top: 1rem; */
}

option:last-of-type {
  border-radius: 0 0 8px 8px;
}

::picker(select) {
  border-radius: 8px;
}

option:not(option:last-of-type) {
  border-bottom: none;
}
option:nth-of-type(odd) {
  /* background: white; */
  /* background-color: #C3B8E2; */
}

option:hover,
option:focus {
  background-color: #A39ABD;
}

html.dark {
  option {
    border: 1px solid #AFAABE;
    background-color: #A39ABD;
  }

  option:hover,
  option:focus {
    background-color: #C3B8E2;
  }
}

option:checked {
  font-weight: bold;
}
option::checkmark {
  order: 1;
  margin-left: auto;
  content: url('/check.svg');
}
::picker(select) {
  opacity: 0;
  transition: all 0.4s allow-discrete;
}
::picker(select):popover-open {
  opacity: 1;
}
@starting-style {
  ::picker(select):popover-open {
    opacity: 0;
  }
}
/* ::picker(select) { */
/*   top: calc(anchor(bottom) + 1px); */
/*   left: anchor(10%); */
/* } */
</style>
