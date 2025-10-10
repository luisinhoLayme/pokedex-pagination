import { usePokedexStore } from "@/stores/pokedex";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export const usePokedex = () => {
  const store = usePokedexStore()
  const { currentPage, pageSize, theme } = storeToRefs(store)

  // Lógica de Paginación
  const paginationRange = computed(() => {
    const current = 1 //store.state.currentPage;
    const last = 20 //totalPages.value;
    const delta = 2;
    const range: (number | '...')[] = [];

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    const finalRange: (number | '...')[] = [];
    let lastPushed: number | '...' = 0;
    for (const page of range) {
      if (page === '...') {
        finalRange.push('...');
      } else if (page > (lastPushed as number) + 1) {
        finalRange.push('...');
        finalRange.push(page);
      } else {
        finalRange.push(page);
      }
      lastPushed = page;
    }
    return finalRange;
  });

  return {
    theme,
    currentPage,
    totalPage: 1314,
    pageSize,
    paginationRange,

  }
}

