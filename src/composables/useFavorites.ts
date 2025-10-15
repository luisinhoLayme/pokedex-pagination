import { handleGetPokemonsById } from "@/helpers/handlePokemonById"
import { usePokedexFavoritesStore } from "@/stores/pokedex-favorites"
import { QueryClient, useQuery, useQueryClient, type QueryKey } from "@tanstack/vue-query"
import { storeToRefs } from "pinia"
import { computed, watch } from "vue"

const FAVORITES_QUERY_KEY: QueryKey = ['favorites-list'];

export const useFavorites = () => {
  const store = usePokedexFavoritesStore()
  const queryClient = useQueryClient();

  const { count, list } = storeToRefs(store)

  const { isLoading, data } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => handleGetPokemonsById(list.value),
    // 💡 Opciones: El query es dependiente de los IDs de Pinia.
    // refetchOnMount: false, // Opcional: no recargar al montar si ya está en caché
    staleTime: 1000 * 60 * 5, // Los datos se consideran "frescos" por 5 minutos
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
    // Marca el query de favoritos como obsoleto.
    // Esto fuerza a TanStack Query a recargar la lista de Pokémon
    // la próxima vez que el componente la necesite (si no está montada, se queda en caché).
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
    },
  }
}

