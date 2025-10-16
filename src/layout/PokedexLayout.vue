<script setup lang='ts'>
import { ref, watch } from 'vue'
import ButtonTheme from '@/components/ButtonTheme.vue'
import { usePokedex } from '@/composables/usePokedex';
import PokemonTypes from '@/components/PokemonTypes.vue'
import { useRoute, useRouter, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import SearchIcon from '@/components/icons/IconSearch.vue'

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
  <header class="grid gap-3 xl:flex xl:gap-3 xl:items-center bg-light-10 dark:bg-dark-10 dark:text-light-10 dark:border-b-light-50/50 border-b-light-30 border-b pb-6">
    <section class="flex flex-col items-center justify-center xl:items-start">
      <div class="flex gap-4 items-center">
        <h1 class="text-4xl font-bold dark:text-light-10/90">Pokedex GO!</h1>
        <ButtonTheme />
      </div>
      <p class="text-sm xl:whitespace-nowrap dark:text-light-40">The essential encyclopedia for the modern coarch.</p>
    </section>
    <section class="grid gap-2 md:grid-cols-4 lg:grid-cols-7 xl:items-center">
      <div class="md:col-span-full lg:col-start-1 lg:col-end-4 xl:col-start-2 xl:col-end-4">
        <form @submit.prevent="onSubmitSearch">
          <div
            class="flex items-center shadow-xm dark:shadow-light-10/40 rounded-md pl-3"
            :class="[disableAttr && 'opacity-50']"
          >
            <SearchIcon class="w-5 text-light-50/60 dark:text-light-10/40" />
            <input
              :disabled="disableAttr"
              v-model="searchInput"
              class=" outline-none w-full p-2.5 rounded-md disabled:opacity-50"
              type="text"
              placeholder="Search for name..."
            />
          </div>
        </form>
      </div>
      <button
        @click="goToPage('pokedex')"
        :class="{'active': activeView === 'pokedex'}"
        class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 rounded-md lg:col-start-4 xl:col-start-auto"
      >Pokedex</button>
      <button
        @click="goToPage('favorites')"
        :class="{'active': activeView === 'favorites'}"
        class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 rounded-md"
      >Favorites</button>
      <PokemonTypes :disabled-arrt="disableAttr" :class="[disableAttr && 'opacity-50']" />
      <p
        class="flex justify-center md:justify-end items-center font-light text-dark-10 dark:text-light-10 text-sm">
        Page {{currentPage}} / {{totalPages}}
      </p>
    </section>
  </header>
  <RouterView />
</template>

<style scoped>
html {
  .button-pokedex.active {
    background-color: #A39ABD;
    color: #343438;
  }
  &.dark {

    .button-pokedex.active {
      background-color: #C3B8E2;
      color: #495057;
    }
  }
}
</style>
