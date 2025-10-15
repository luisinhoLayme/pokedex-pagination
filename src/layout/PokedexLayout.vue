<script setup lang='ts'>
import { ref, watch } from 'vue'
import ButtonTheme from '@/components/ButtonTheme.vue'
import { usePokedex } from '@/composables/usePokedex';
import PokemonTypes from '@/components/PokemonTypes.vue'
import { useRoute, useRouter, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

defineProps({})

const router = useRouter()
const route = useRoute()

const searchInput = ref('')
const disableAttr = ref(false)
const activeView = ref('pokedex')

const { currentPage, totalPages, setSearch } = usePokedex()

const onSubmitSearch = () => {
  setSearch(searchInput.value)
  // searchInput.value = ''
}

const goToPage = (routePage: string) => {
  // activeView.value = routePage
  router.push({name: routePage})
}

const changePage = (page: RouteLocationNormalizedLoadedGeneric) => {
  if(page.path === '/favorites') {
    disableAttr.value = true
    activeView.value = 'favorites'
  }
  if (route.path === '/pokedex') {
    disableAttr.value = false
    activeView.value = 'pokedex'
  }
}

changePage(route)
watch(route, changePage)

</script>

<template>
  <header class="grid gap-3 xl:flex xl:gap-3 xl:items-center bg-white dark:bg-bg-2 dark:text-text">
    <section class="flex flex-col items-center justify-center xl:items-start">
      <div class="flex gap-4 items-center">
        <h1 class="text-4xl font-bold">Pokedex GO!</h1>
        <ButtonTheme />
      </div>
      <p class="text-sm xl:whitespace-nowrap">The essential encyclopedia for the modern coarch.</p>
    </section>
    <section class="grid gap-2 md:grid-cols-4 lg:grid-cols-7 xl:items-center">
      <div class="md:col-span-full lg:col-start-1 lg:col-end-3 xl:col-start-2 xl:col-end-4">
        <form @submit.prevent="onSubmitSearch">
          <input
            :disabled="disableAttr"
            v-model="searchInput"
            class="border border-b dark:border-b/60 outline-none w-full p-2.5 rounded-md"
            type="text"
            placeholder="Search for name..."
          />
        </form>
      </div>
      <button
        @click="goToPage('pokedex')"
        :class="{'active': activeView === 'pokedex'}"
        class="button-pokedex text-center h-max p-2.5 cursor-pointer border border-b rounded-md lg:col-start-4 xl:col-start-auto"
      >Pokedex</button>
      <button
        @click="goToPage('favorites')"
        :class="{'active': activeView === 'favorites'}"
        class="button-pokedex text-center h-max p-2.5 cursor-pointer border border-b dark:border-b/60 rounded-md"
      >Favorites</button>
      <PokemonTypes :disabled-arrt="disableAttr" />
      <p
        class="flex justify-center md:justify-end items-center font-light dark:text-b text-sm">
        Page {{currentPage}} / {{totalPages}}
      </p>
    </section>
  </header>
  <RouterView />
</template>

<style scoped>
html {
  .button-pokedex.active {
    background-color: #303030;
    color: #f5f5f5;
  }
  &.dark {

    .button-pokedex.active {
      background-color: #f5f5f5;
      color: #282828;
    }
  }
}
</style>
