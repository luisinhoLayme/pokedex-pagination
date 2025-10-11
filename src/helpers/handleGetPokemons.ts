import type { PokemonResponse } from "@/interfaces/pokeon.response"
import pokeApi from "../api/pokemons-api"
import { type PokemonListResponse } from "../interfaces/pokemons-list.response"
import type { Pokemon } from "@/interfaces/pokemon"

export const handleGetPokemons = async (page: number, pageSize: number) => {
  console.log('start')
  const { data } = await pokeApi.get<PokemonListResponse>(`?offset=${ (page - 1) * pageSize }&limit=${pageSize}`)

  console.log('xd')


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

  // return pokemons
  // const pokemons = await Promise.all(
  //   data.results.map(async (poke) => {
  //     const pokes = await pokeApi.get<PokemonResponse>(poke.url)
  //     return pokes.data
  //   })
  // )
  // console.log('end')
  return {
    count: data.count,
    pokemons,
    totalPages:  Math.ceil(data.count / pageSize)
  }
}

