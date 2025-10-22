import { useQuery } from '@tanstack/vue-query';
import { handleGetPokemonByName } from '../helpers/handleGetPokemonByName';

export const usePokemonDetails = (name: string) => {

  return useQuery({
    queryKey: ['pokemon-details', name],
    queryFn: () => handleGetPokemonByName(name),

    // Opciones de caching
    // staleTime: 1000 * 60 * 60 * 24, // 24 horas
    staleTime: 1000 * 60 * 60, // 1 horas
    // enabled: !name, // Asegura que no se ejecute si no hay nada en el name
  });
}
