import { handleGetPokemons } from "@/helpers/handleGetPokemons";
import { usePokedexStore } from "@/stores/pokedex";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";

export const usePokedex = () => {
  const store = usePokedexStore()
  const { currentPage, pageSize, pokemons, totalPages, theme } = storeToRefs(store)


  const {data, isLoading, isFetching} = useQuery({
    queryKey: ['pokemons/page=', currentPage],
    queryFn: () => handleGetPokemons(currentPage.value, pageSize.value)
  })

  watch(data,(pokemons) => {
    if (pokemons) {
      console.log(pokemons)
      // console.log(pokemons.pokemons)
      store.setPokeons(pokemons.pokemons)
      store.setTotalPages(pokemons.totalPages)
    }
  })


  return {
    theme,
    pokemons,
    currentPage,
    totalPages,
    pageSize,
    isLoading,
    isFetching,

    setPage(page:number) {
      store.setPage(page)
    }
  }
}

