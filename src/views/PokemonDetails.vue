<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { usePokemonDetails } from '@/composables/usePokemonDetails'
import ArrowLeftBackIcon from '@/components/icons/IconArrawLeftBack.vue'
import { useFavorites } from '@/composables/useFavorites';
import AddIcon from '@/components/icons/IconAdd.vue'
import DeleteIcon from '@/components/icons/IconDelete.vue'
import { useTheme } from '@/composables/useTheme';

defineProps({})
const route = useRoute()
const {name} = route.params

useTheme()
const { data: pokemon } = usePokemonDetails(''+name)
const { isPokemonFavorite, toggleFavoriteStatus } = useFavorites()

onMounted(() => {
  isPokemonFavorite(pokemon.value?.id!)
})

watch(pokemon, () => {
  isPokemonFavorite(pokemon.value?.id!)
})

const toggleFavorites = (id: number) => {
  toggleFavoriteStatus(id)

  isPokemonFavorite(pokemon.value?.id!)
}
</script>

<template>
  <header class="flex justify-between items-center">
    <button
      class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 rounded-md font-medium flex items-center gap-3 uppercase md:text-xl"
    >
      <ArrowLeftBackIcon class="w-2 h-3" />
      Back
    </button>
    <button
      @click="toggleFavorites(pokemon?.id!)"
      class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd  text-light-50  dark:text-dark-10 rounded-md font-medium flex items-center gap-3 uppercase md:text-xl"
      :class="{
        'bg-danger-10 dark:bg-danger-10': isPokemonFavorite(pokemon?.id!),
        'bg-light-30 dark:bg-light-40': !isPokemonFavorite(pokemon?.id!)
      }"
    >
      <AddIcon v-if="!isPokemonFavorite(pokemon?.id!)" class="" />
      <DeleteIcon v-if="isPokemonFavorite(pokemon?.id!)" class="" />
      {{ isPokemonFavorite(pokemon?.id!) ? 'delete favorites' : 'add favorites' }}
    </button>

  </header>
  <main></main>
</template>

<style scoped>

</style>
