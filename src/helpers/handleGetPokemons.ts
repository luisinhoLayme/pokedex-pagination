import type { PokemonResponse } from "@/interfaces/pokeon.response"
import pokeApi from "../api/pokemons-api"
import { type PokemonListResponse } from "../interfaces/pokemons-list.response"

export const handleGetPokemons = async (page: number, pageSize: number, filterType: string) => {

  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?offset=${ (page - 1) * pageSize }&limit=${pageSize}`)
  const result = await pokeApi.get(`/type/flying`)
  console.log(result)

  // const pokemons = data.pokemon.map((p: any) => p.pokemon)
  // const start = (page - 1) * 20
  // const end = start + 20
  // return pokemons.slice(start, end)

  const pokemonPromises: Promise<any>[] = []

  for (const { url } of data.results) {
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

  return {
    count: data.count,
    pokemons,
    totalPages:  Math.ceil(data.count / pageSize)
  }
}

