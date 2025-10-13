import type { PokemonResponse } from "@/interfaces/pokeon.response"
import pokeApi from "../api/pokemons-api"
import { type PokemonListResponse, type Result } from "../interfaces/pokemons-list.response"
import type { PokemonListTypeResponse } from "@/interfaces/pokemons-list-type.response"

const handlePokemonsReturn = async(list: Result[]) => {
  const pokemonPromises: Promise<any>[] = []

  for (const { url } of list) {
    const pokemonPromise = pokeApi.get<PokemonResponse>(url).then(({ data }) => {
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

export const handleGetPokemons = async (
  page: number,
  pageSize: number,
  filterType: string,
  search?: string
) => {

  if (filterType !== 'All') {
    const { data } = await pokeApi.get<PokemonListTypeResponse>(`/type/${filterType}`)

    const pokemonsDB = data.pokemon.map((p) => p.pokemon)
    const start = (page - 1) * 20
    const end = start + 20

    const pokemons = await handlePokemonsReturn(pokemonsDB.slice(start, end))

    return {
      count: data.pokemon.length,
      pokemons,
      totalPages:  Math.ceil(data.pokemon.length / pageSize)
    }
  } else {
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?offset=${ (page - 1) * pageSize }&limit=${pageSize}`)

    const pokemons = await handlePokemonsReturn(data.results)

    return {
      count: data.count,
      pokemons,
      totalPages:  Math.ceil(data.count / pageSize)
    }
  }
}

