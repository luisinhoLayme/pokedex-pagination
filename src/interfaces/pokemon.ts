import type { Ability, Move, Stat, Type } from "./pokeon.response"

export interface Pokemon {
  id: number
  name: string
  hp: number
  types: Type[]
  frontSprite: string
}

export interface PokemonDetails {
  abilities: Ability[];
  height: number;
  id: number;
  moves: string[];
  name: string;
  frontSprite: string;
  stats: Stat[];
  types: Type[];
  weight: number;
}
