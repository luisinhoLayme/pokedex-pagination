import { createRouter, createWebHistory } from 'vue-router'
import PokedexLayout from '@/layout/PokedexLayout.vue'
import PokedexView from '@/views/PokedexView.vue'
import PokemonDetails from '@/views/PokemonDetails.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemons-home',
      component: PokedexLayout,
      redirect: { name: 'pokedex' },
      children: [
        { path: '/pokedex', name: 'pokedex', component: PokedexView },
        { path: '/favorites', name: 'fovorites', component: FavoritesView }
      ]
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: PokemonDetails
    },
  ],
})

export default router
