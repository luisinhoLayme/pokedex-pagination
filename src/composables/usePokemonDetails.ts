import { useQuery } from '@tanstack/vue-query';
import { handleGetPokemonByName } from '../helpers/handleGetPokemonByName';

export const usePokemonDetails = (name: string) => {

  return useQuery({
    queryKey: ['pokemon-details', name],
    // se ejecuta si no hay datos en caché.
    queryFn: () => handleGetPokemonByName(name),

    // Opciones de caching
    // staleTime: 1000 * 60 * 60 * 24, // 24 horas: Los datos de un Pokémon son estáticos.
    staleTime: 1000 * 60 * 60, // 1 horas: Los datos de un Pokémon son estáticos.
    // enabled: !name, // Asegura que no se ejecute si no hay nada en el name
  });
}
