import type { Pokemon } from "@/interfaces/pokemon";
import type { PokemonResponse } from "@/interfaces/pokeon.response";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokedexStore = defineStore('pokedex', () => {
  const theme = ref<string>('light')
  const pokemons = ref<Pokemon[]>([])
  const searchQuery = ref<string>('')
  const typeFilter = ref<string>('All')
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(20)
  const totalPages = ref<number>(20)

  console.log(currentPage)

  return {
    // props
    theme,
    currentPage,
    pageSize,
    totalPages,
    pokemons,

    //Actions
    setPokeons(pokemonsApi: Pokemon[]) {
      pokemons.value = pokemonsApi
    },
    setPage(page: number) {
      currentPage.value = page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setTotalPages(pages: number) {
      totalPages.value = pages
    }
  }
})

