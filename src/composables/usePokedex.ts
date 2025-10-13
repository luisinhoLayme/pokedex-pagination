import { handleGetPokemons } from "@/helpers/handleGetPokemons";
import { usePokedexStore } from "@/stores/pokedex";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";

export const usePokedex = () => {
  const store = usePokedexStore()
  const {
    currentPage, pageSize, pokemons,
    totalPages, theme, results, typeFilter, searchQuery
  } = storeToRefs(store)


  const {data, isLoading, isFetching} = useQuery({
    queryKey: ['pokemons', { currentPage, typeFilter }],
    queryFn: () => handleGetPokemons(currentPage.value, pageSize.value, typeFilter.value)
  })

  watch(data,(pokemons) => {
    if (pokemons) {
      // console.log(pokemons.count)
      // console.log(pokemons.pokemons)
      store.setPokeons(pokemons.pokemons)
      store.setTotalPages(pokemons.totalPages, pokemons.count)
    }
  })


  return {
    theme,
    pokemons,
    currentPage,
    totalPages,
    pageSize,
    results,
    isLoading,
    isFetching,

    setPage(page:number) {
      store.setPage(page)
    },

    setFilter(type: string) {
      store.setFilter(type)
    }
  }
}

