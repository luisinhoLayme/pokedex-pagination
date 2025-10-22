import { handleGetPokemonsById } from "@/helpers/handlePokemonById"
import { usePokedexFavoritesStore } from "@/stores/pokedex-favorites"
import { useQuery, useQueryClient, type QueryKey } from "@tanstack/vue-query"
import { storeToRefs } from "pinia"

const FAVORITES_QUERY_KEY: QueryKey = ['favorites-list'];

export const useFavorites = () => {
  const store = usePokedexFavoritesStore()
  const queryClient = useQueryClient();

  const { count, list } = storeToRefs(store)

  const { isLoading, data } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => handleGetPokemonsById(list.value),

    staleTime: 1000 * 60 * 5, //5 minutos
  })

  return {
    // props
    favoriteIds: list,
    count,
    isLoading,
    favoritePokemons: data,

    //methods
    isPokemonFavorite(id: number){
      return store.isFavorite(id)
    },

    toggleFavoriteStatus(id: number) {
      store.toggleFavorites(id)

      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
    },
  }
}

