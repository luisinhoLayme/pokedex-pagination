import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokedexStore = defineStore('pokedex', () => {
  const theme = ref<string>('light')
  const searchQuery = ref<string>('')
  const typeFilter = ref<string>('All')
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(20)


  return {
    theme,
    currentPage,
    pageSize,
    setPage(page: number) {
        // globalState.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }
})

