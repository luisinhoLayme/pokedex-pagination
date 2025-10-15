import type { Pokemon } from "@/interfaces/pokemons-list-type.response";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

const initializeFaborites = (): number[] => {
  const storedList = localStorage.getItem('pokedexFavorites')
  return storedList ? JSON.parse(storedList) : []
}

export const usePokedexFavoritesStore = defineStore('favorites', () => {

  const list = ref<number[]>(initializeFaborites())

  // 💡 Vigilamos la lista de favoritos. Cada vez que cambie, la guardamos.
  watch(
    list,
    (newValue) => {
      // Esta función se ejecuta CADA VEZ que list.value cambia (se añade/quita un Pokémon)
      localStorage.setItem('pokedexFavorites', JSON.stringify(newValue));
    },
    // El 'deep: true' es crucial para observar cambios DENTRO del array
    // (ej. si se añade o quita un elemento)
    { deep: true }
  );


  return {
    //STATE>
    list,

    //GETTERS>
    //Verifica si un ID específico está en la lista
    isFavorite: computed(() => (pokemonId: number): boolean => {
      return list.value.includes(pokemonId)
    }),
    // Retorna el número total de favoritos
    count: computed<number>(() => list.value.length),

    //ACTIONS>
    //añadir o quitar un Pokémon
    toggleFavorites(pokemonId: number) {
      const index = list.value.indexOf(pokemonId);
      if (index === -1) {
        // Si no está, lo añade
        list.value.push(pokemonId);
      } else {
        // Si está, lo elimina
        list.value.splice(index, 1);
      }
    }
  }
})
