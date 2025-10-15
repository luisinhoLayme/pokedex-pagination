import pokeApi from "@/api/pokemons-api"
import type { PokemonResponse } from "@/interfaces/pokeon.response"

export const handleGetPokemonsById = async(list: number[]) => {
  const pokemonPromises: Promise<any>[] = []

  for (const id of list) {
    const pokemonPromise = pokeApi.get<PokemonResponse>(`/pokemon/${id}`).then(({ data }) => {
      return {
        id: data.id,
        name: data.name,
        hp: data.stats[0]?.base_stat,
        types: data.types,
        frontSprite: data.sprites.other?.["official-artwork"].front_default
      }
    })

    pokemonPromises.push(pokemonPromise)
  }

  const pokemons = await Promise.all( pokemonPromises )
  return pokemons
}
