import type { Type } from "./pokeon.response"

export interface Pokemon {
  id: number
  name: string
  hp: number
  types: Type[]
  frontSprite: string
}
