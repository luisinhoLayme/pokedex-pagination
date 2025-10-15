import pokeApi from "../api/pokemons-api"
import { type PokemonListResponse } from "../interfaces/pokemons-list.response"
import type { PokemonListTypeResponse } from "@/interfaces/pokemons-list-type.response"
import { handlePokemonsUrl } from "./handlePokemonUrl"

export const handleGetPokemons = async (
  page: number,
  pageSize: number,
  filterType: string,
  search?: string
) => {

  const start = (page - 1) * 20
  const end = start + 20

  if (filterType !== 'All') {
    const { data } = await pokeApi.get<PokemonListTypeResponse>(`/type/${filterType}`)

    const pokemonsDB = data.pokemon.map((p) => p.pokemon)

    let pokemons = []

    if (search) {
      const filtered = pokemonsDB.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase()))
      pokemons = await handlePokemonsUrl(filtered.slice(start, end))

      return {
        count: filtered.length,
        pokemons,
        totalPages:  Math.ceil(filtered.length / pageSize)
      }
    }
    if (!search) {
      pokemons = await handlePokemonsUrl(pokemonsDB.slice(start, end))
      return {
        count: data.pokemon.length,
        pokemons,
        totalPages:  Math.ceil(data.pokemon.length / pageSize)
      }
    }

  }

  if (filterType === 'All' && !search) {
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?offset=${ (page - 1) * pageSize }&limit=${pageSize}`)

    const pokemons = await handlePokemonsUrl(data.results)

    return {
      count: data.count,
      pokemons,
      totalPages:  Math.ceil(data.count / pageSize)
    }
  }

  if (filterType === 'All' && search) {
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?offset=0&limit=10000`)

    const filtered = data.results.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    const pokemons = await handlePokemonsUrl(filtered.slice(start, end))

    return {
      count: filtered.length,
      pokemons,
      totalPages:  Math.ceil(filtered.length / pageSize)
    }
  }
}

