<script setup lang='ts'>
import { ref } from 'vue'
import HeartIcon from './icons/IconHeart.vue'
import type { Pokemon } from '@/interfaces/pokemon';
import { typeColors } from '@/utils/typeColors'
import { getTypeColorClasses } from '@/utils/getTypeColorClasses'
import { useFavorites } from '../composables/useFavorites'
import { useRouter } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { handleGetPokemonByName } from '@/helpers/handleGetPokemonByName'

type Props = {
  pokemon: Pokemon
}

const { pokemon } = defineProps<Props>()
const color = ref('#A8A77A')
const roter = useRouter()

const queryClient = useQueryClient()

const type = pokemon.types[0]?.type.name as string
color.value = typeColors[type] || '#A8A77A'

const { isPokemonFavorite, toggleFavoriteStatus } = useFavorites()

const goToPokemonDetails = (name: string) => {
  roter.push({name: 'pokemon', params: { name }})
}


const prefetchPokemonDetails = () => {
  queryClient.prefetchQuery({
    queryKey: ['pokemon-details', pokemon.name],
    queryFn: () => handleGetPokemonByName(pokemon.name),
    staleTime: 1000 * 60 * 60, // 1 horas: Los datos de un Pokémon son estáticos.
  })
}
</script>

<template>
  <article
    @mouseenter="prefetchPokemonDetails"
    class="shadow-xss dark:shadow-xsd/15 rounded-xs grid gap-3 p-5 relative dark:bg-dark-40">
    <div
      :class="`w-14 h-14 dark:w-12 dark:h-12 blur-2xl dark:blur-xl absolute right-15 top-15 ${color}`"
    ></div>
    <header class="flex justify-between items-center relative">
      <i
        @click="toggleFavoriteStatus(pokemon.id)"
        class="absolute -left-2 top-0 cursor-pointer"
        :class="[isPokemonFavorite(pokemon.id) ? 'text-dark-10 dark:text-light-10' : 'text-light-40 dark:text-light-10/30']"
      >
        <HeartIcon />
      </i>
      <div>
        <h2 class="text-md font-medium dark:text-light-10/80">{{pokemon.name}}</h2>
        <span class="text-light-20 text-sm">#{{pokemon.id}}</span>
      </div>
      <div class="w-24">
        <img :src="pokemon.frontSprite" alt="Bulbasaur image">
      </div>
    </header>
    <section class="flex gap-2">

      <span
        class="max-h-[29px] rounded-xs py-1 px-2.5 text-xs font-light"
        v-for="type of pokemon.types"
        :class="[
          getTypeColorClasses(type.type.name).bg as string,
          getTypeColorClasses(type.type.name).text as string,
          'dark:bg-opacity-50'
        ]"
        :key="type.type.name"
      >
        {{type.type.name}}
      </span>
      <!-- <span class="bg-b/20 dark:bg-b/15 rounded-xl py-1 px-2.5 text-xs font-light dark:text-text leading-5">Poison</span> -->
    </section>
    <footer class="flex justify-between items-center dark:text-text">
      <p class="text-sm text-dark-10 dark:text-light-10/50">HP {{ pokemon.hp }}</p>
      <button
        @click="goToPokemonDetails(pokemon.name)"
        class="font-light px-4 py-1.5 cursor-pointer
        from-light-linear-20 to-light-linear-10
        text-dark-10 dark:text-light-10
        dark:from-dark-10 dark:to-dark-20/70
        rounded-tl-3xl rounded-br-3xl
        hover:bg-gradient-to-b transition-all duration-500 shadow-xss dark:shadow-xsd/15"
      >
        See
      </button>
    </footer>
  </article>
</template>

<style scoped></style>
