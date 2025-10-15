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
    queryKey: ['pokemons', { currentPage, typeFilter, searchQuery}],
    queryFn: () => handleGetPokemons(
      currentPage.value,
      pageSize.value,
      typeFilter.value,
      searchQuery.value
    ),
    staleTime: 1000 * 60 * 10, // Los datos se guardan en caché por 10 minutos
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
    },

    setSearch(name: string) {
      store.setSearch(name)
    }
  }
}

