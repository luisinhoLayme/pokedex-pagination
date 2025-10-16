import { createRouter, createWebHistory } from 'vue-router'
import PokedexLayout from '@/layout/PokedexLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemons-home',
      component: PokedexLayout,
      redirect: { name: 'pokedex' },
      children: [
        { path: '/pokedex', name: 'pokedex', component: () => import('@/views/PokedexView.vue') },
        { path: '/favorites', name: 'favorites', component: () => import('@/views/FavoritesView.vue') }
      ]
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon',
      component: () => import('@/views/PokemonDetails.vue')
    },
  ],
})

export default router
