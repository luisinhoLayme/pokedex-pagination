import type { Pokemon } from "@/interfaces/pokemon";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokedexStore = defineStore('pokedex', () => {
  const theme = ref<string>('light')
  const pokemons = ref<Pokemon[]>([])
  const searchQuery = ref<string>('')
  const typeFilter = ref<string>('All')
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(20)
  const totalPages = ref<number>(0)
  const results = ref<number>(0)

  // console.log(currentPage)

  return {
    // props
    theme,
    currentPage,
    typeFilter,
    searchQuery,
    pageSize,
    totalPages,
    pokemons,
    results,

    //Actions
    setPokeons(pokemonsApi: Pokemon[]) {
      pokemons.value = pokemonsApi
    },
    setPage(page: number) {
      currentPage.value = page
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setTotalPages(pages: number, counts:number) {
      totalPages.value = pages
      results.value = counts
    },
    setFilter(type: string) {
      typeFilter.value = type
      currentPage.value = 1
      searchQuery.value = ''
    },
    setSearch(name: string) {
      searchQuery.value = name
      currentPage.value = 1
    }
  }
})

