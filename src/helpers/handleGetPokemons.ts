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

  const start = (page - 1) * 20
  const end = start + 20

  if (filterType !== 'All') {
    console.log('type filter')
    const { data } = await pokeApi.get<PokemonListTypeResponse>(`/type/${filterType}`)

    const pokemonsDB = data.pokemon.map((p) => p.pokemon)

    let pokemons = []

    if (search) {
      const filtered = pokemonsDB.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase()))
      pokemons = await handlePokemonsReturn(filtered.slice(start, end))

      return {
        count: filtered.length,
        pokemons,
        totalPages:  Math.ceil(filtered.length / pageSize)
      }
    }
    if (!search) {
      pokemons = await handlePokemonsReturn(pokemonsDB.slice(start, end))
      return {
        count: data.pokemon.length,
        pokemons,
        totalPages:  Math.ceil(data.pokemon.length / pageSize)
      }
    }

  }

  if (filterType === 'All' && !search) {
    console.log('type all')
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?offset=${ (page - 1) * pageSize }&limit=${pageSize}`)

    const pokemons = await handlePokemonsReturn(data.results)

    return {
      count: data.count,
      pokemons,
      totalPages:  Math.ceil(data.count / pageSize)
    }
  }

  if (filterType === 'All' && search) {
    console.log('type all search')
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?offset=0&limit=10000`)
    console.log(data)

    const filtered = data.results.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    console.log(filtered)

    const pokemons = await handlePokemonsReturn(filtered.slice(start, end))

    return {
      count: filtered.length,
      pokemons,
      totalPages:  Math.ceil(filtered.length / pageSize)
    }
  }
}

