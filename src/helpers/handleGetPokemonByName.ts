import pokeApi from "@/api/pokemons-api"
import type { PokemonDetails } from "@/interfaces/pokemon"
import type { PokemonResponse } from "@/interfaces/pokeon.response"

export const handleGetPokemonByName = async (name: string): Promise<PokemonDetails> => {

  const { data } = await pokeApi.get<PokemonResponse>(`/pokemon/${name}`)

  return {
    id: data.id,
    name: data.name,
    types: data.types,
    frontSprite: data.sprites.other?.["official-artwork"].front_default!,
    abilities: data.abilities,
    weight: data.weight,
    height: data.height,
    stats: data.stats,
    moves: data.moves.slice(0, 6).map(m => m.move.name)
  }
}
