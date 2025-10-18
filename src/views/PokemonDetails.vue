<script setup lang='ts'>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import { usePokemonDetails } from '@/composables/usePokemonDetails'
import ArrowLeftBackIcon from '@/components/icons/IconArrawLeftBack.vue'
import { useFavorites } from '@/composables/useFavorites';
import AddIcon from '@/components/icons/IconAdd.vue'
import DeleteIcon from '@/components/icons/IconDelete.vue'
import { useTheme } from '@/composables/useTheme';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { getTypeColorClasses } from '@/utils/getTypeColorClasses';
import { typeColors } from '@/utils/typeColors';

defineProps({})
const route = useRoute()

useTheme()

const pokemonName = computed(() => {
  const nameParam = route.params.name
  return Array.isArray(nameParam) ? nameParam[0]?.toLowerCase() : nameParam?.toLowerCase() || ''
})

const { data: pokemon, isError, isLoading } = usePokemonDetails(pokemonName.value!)
const { isPokemonFavorite, toggleFavoriteStatus } = useFavorites()

const isFavorite = computed(() => isPokemonFavorite(pokemon.value?.id!))
// const type = pokemon.value?.types
// const typeColor = computed(() => typeColors[])

const toggleFavorites = () => {
  const id = pokemon.value?.id
  if (id) {
    toggleFavoriteStatus(id)
  }
}
</script>

<template>
  <header class="flex justify-between items-center">
    <button
      class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 rounded-md font-medium flex items-center gap-3 uppercase md:text-xl"
    >
      <ArrowLeftBackIcon class="w-2 h-3" />
      Back
    </button>
    <button
      @click="toggleFavorites"
      class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd  text-light-50  dark:text-dark-10 rounded-md font-medium flex items-center gap-3 uppercase md:text-xl"
      :class="{
        'bg-danger-5 dark:bg-danger-10 shadow-red-200 dark:shadow-red-400/50': isFavorite,
        'bg-light-30 dark:bg-light-40': !isFavorite
      }"
    >
      <AddIcon v-if="!isFavorite" class="" />
      <DeleteIcon v-if="isFavorite" class="" />
      {{ isPokemonFavorite(pokemon?.id!) ? 'delete favorites' : 'add favorites' }}
    </button>

  </header>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Pokemon not loaded</div>
  <main
    v-else-if="pokemon"
    class="mt-10 grid gap-4"
  >
    <section class="shadow-xss rounded-2xl">
      <img :src="pokemon.frontSprite" :alt="pokemon.name">
    </section>

    <section class="shadow-xss rounded-2xl p-4 grid gap-3">
      <div>
        <h1 class="font-bold text-3xl">{{capitalizeFirstLetter(pokemon.name)}}</h1>
        <span class="text-light-50">#{{pokemon.id}}</span>
      </div>
      <div>
        <div class="flex gap-5">
          <strong>Height: <span class="font-normal">{{pokemon.height}} m</span></strong>
          <strong>Weight: <span class="font-normal">{{pokemon.weight}} kg</span></strong>
        </div>
        <div class="mt-3">
          <p
            v-for="type of pokemon.types"
            class="w-max py-1 px-4 rounded-3xl border "
            :class="[
              getTypeColorClasses(type.type.name).bg as string,
              getTypeColorClasses(type.type.name).text as string,
              'dark:bg-opacity-50'
            ]"
            :key="type.type.name"
          >{{type.type.name}}</p>
        </div>
      </div>
    </section>

    <section class="shadow-xss rounded-2xl p-4 grid gap-3">
      <div>
        <h2 class="font-semibold text-2xl">Abilites</h2>
        <ul class="square-list pl-1">
          <li
            class="before:text-dark-20"
            v-for="abilite in pokemon.abilities"
            :key="abilite.ability?.name"
          >{{abilite.ability?.name}}</li>
        </ul>
      </div>
      <div>
        <h2 class="font-semibold text-2xl">Movements (Top 6)</h2>
        <ul class="square-list pl-1">
          <li
            class="before:text-dark-20"
            v-for="move in pokemon.moves"
            :key="move"
          >{{move}}</li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Aplica la propiedad directamente a la clase personalizada */
/* .square-list { */
/*   list-style-type: square; */
/* } */

/* O, si prefieres usar pseudo-elementos para un mayor control */
.square-list li {
  position: relative;
  padding-left: 1rem; /* Espacio para el marcador */
}

.square-list li::before {
  content: '■'; /* Carácter Unicode de un cuadrado */
  position: absolute;
  left: 0;
  /*color: #333;  Color del cuadrado */
}
</style>
