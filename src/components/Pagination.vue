<script setup lang='ts'>
import { usePokedex } from '@/composables/usePokedex'
import { usePokedexStore } from '@/stores/pokedex';
import { computed } from 'vue';

// const store = usePokedexStore()
const { totalPages, theme, currentPage, setPage } = usePokedex()


  // Lógica de Paginación
  const paginationRange = computed(() => {
    const current = currentPage.value //store.state.currentPage;
    const last = totalPages.value //totalPages.value;
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
</script>

<template>
  <footer class="grid gap-4 my-6 md:grid-cols-[2fr_1fr] md:items-center">
    <!-- Botones de Paginación -->
    <div class="flex items-center flex-wrap gap-1 space-x-2">
      <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
        class="bg-white border dark:bg-bg dark:border-b/50 dark:text-text p-2 px-4 rounded-lg font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-50/10' : 'bg-gray-700 hover:bg-gray-600'">
        Previous
      </button>

      <template v-for="page in paginationRange" :key="page">
        <span v-if="page === '...'" class="px-2 dark:text-text">...</span>
        <button v-else @click="setPage(page)" class="border border-b dark:bg-bg-2  dark:border-b/50 p-2 px-4 rounded-lg font-normal transition-colors" :class="[
          page === currentPage
            ? 'bg-bg text-white shadow-md dark:bg-white dark:text-bg dark:hover:bg-white'
            : theme === 'light' ? 'bg-white hover:bg-gray-200 dark:text-text dark:hover:bg-gray-50/10' : 'bg-gray-700 hover:bg-gray-600'
        ]">
          {{ page }}
        </button>
      </template>

      <button @click="setPage(currentPage + 1)"
        :disabled="currentPage === 66"
        class="bg-white border border-b dark:bg-bg-2 dark:border-b/50 dark:text-text p-2 px-4 rounded-lg font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-50/10"
        :class="theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'">
        Next
      </button>
    </div>
    <div>
      <p class="text-center text-bg dark:text-text md:text-right">Showing 20 / 1302 results</p>
    </div>
  </footer>
</template>

<style scoped></style>
