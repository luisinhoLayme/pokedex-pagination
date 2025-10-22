<script setup lang='ts'>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { usePokemonDetails } from '@/composables/usePokemonDetails'
import ArrowLeftBackIcon from '@/components/icons/IconArrawLeftBack.vue'
import { useFavorites } from '@/composables/useFavorites';
import AddIcon from '@/components/icons/IconAdd.vue'
import DeleteIcon from '@/components/icons/IconDelete.vue'
import { useTheme } from '@/composables/useTheme';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { getTypeColorClasses } from '@/utils/getTypeColorClasses';
import { typeColors } from '@/utils/typeColors';
import StatPokemon from '@/components/StatPokemon.vue';

defineProps({})
const route = useRoute()
const router = useRouter()

useTheme()

const pokemonName = computed(() => {
  const nameParam = route.params.name
  return Array.isArray(nameParam) ? nameParam[0]?.toLowerCase() : nameParam?.toLowerCase() || ''
})

const { data: pokemon, isError, isLoading } = usePokemonDetails(pokemonName.value!)
const { isPokemonFavorite, toggleFavoriteStatus } = useFavorites()

const isFavorite = computed(() => isPokemonFavorite(pokemon.value?.id!))
// const type = pokemon.value?.types
// const typeColor = computed(() => typeColors[])
// console.log(pokemon.value)

const toggleFavorites = () => {
  const id = pokemon.value?.id
  if (id) {
    toggleFavoriteStatus(id)
  }
}

</script>

<template>
  <header class="flex justify-between items-center">
    <button
      @click="router.back()"
      class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 rounded-md font-medium flex items-center gap-3 uppercase md:text-xl"
    >
      <ArrowLeftBackIcon class="w-2 h-3" />
      Back
    </button>
    <button
      @click="toggleFavorites"
      class="button-pokedex text-center h-max p-2.5 cursor-pointer shadow-xss dark:shadow-xsd  text-light-50  dark:text-dark-10 rounded-md font-medium flex items-center gap-3 uppercase md:text-xl"
      :class="{
        'bg-danger-5 dark:bg-danger-10 shadow-red-200 dark:shadow-red-400/50': isFavorite,
        'bg-light-30 dark:bg-light-40': !isFavorite
      }"
    >
      <AddIcon v-if="!isFavorite" class="" />
      <DeleteIcon v-if="isFavorite" class="" />
      {{ isPokemonFavorite(pokemon?.id!) ? 'delete favorites' : 'add favorites' }}
    </button>

  </header>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Pokemon not loaded</div>
  <main
    v-else-if="pokemon"
    class="mt-10 grid gap-4 lg:gap-6
    lg:grid-cols-3 lg:grid-rows-20
    lg:max-h-[89vh]
    text-dark-10 dark:text-light-30"
  >
    <section class="shadow-xss rounded-2xl dark:shadow-xsd  lg:row-[1/12] relative">
      <img :src="pokemon.frontSprite" :alt="pokemon.name" class="w-full h-full">
    </section>

    <section class="
      shadow-xss rounded-2xl p-4 grid sm:flex gap-2 lg:gap-5
      lg:p-8
      lg:grid-cols-2 dark:shadow-xsd
      lg:col-[2/4]
      lg:row-[1/5]
      ">
      <div>
        <h1 class="font-bold text-3xl lg:text-4xl">{{capitalizeFirstLetter(pokemon.name)}}</h1>
        <span class="text-light-50 lg:text-xl">#{{pokemon.id}}</span>
      </div>
      <div class="dark:text-light-5/70">
        <div class="grid gap-1 min-[350px]:gap-5 min-[350px]:flex whitespace-nowrap">
          <strong class="text-xl">Height: <span class="font-normal lg:text-xl">{{pokemon.height}} m</span></strong>
          <strong class="text-xl">Weight: <span class="font-normal lg:text-xl">{{pokemon.weight}} kg</span></strong>
        </div>
        <div class="mt-3 flex gap-3">
          <p
            v-for="type of pokemon.types"
            class="w-max py-1 px-4 rounded-3xl border "
            :class="[
              getTypeColorClasses(type.type.name).bg as string,
              getTypeColorClasses(type.type.name).text as string,
              'dark:bg-opacity-50'
            ]"
            :key="type.type.name"
          >{{type.type.name}}</p>
        </div>
      </div>
    </section>

    <section class="
      shadow-xss rounded-2xl p-4 grid sm:flex gap-10 dark:shadow-xsd
      lg:grid-cols-2 lg:p-8
      lg:col-[2/4] lg:row-[5/12]
      ">
      <div>
        <h2 class="font-semibold text-2xl">Abilites</h2>
        <ul class="square-list pl-1 flex gap-4 flex-wrap sm:grid sm:gap-2 mt-2">
          <li
            class="before:text-dark-20 dark:text-light-5/70"
            v-for="abilite in pokemon.abilities"
            :key="abilite.ability?.name"
          >{{abilite.ability?.name}}</li>
        </ul>
      </div>
      <div>
        <h2 class="font-semibold text-2xl">Movements (Top {{pokemon.moves.length}})</h2>
        <ul class="square-list pl-1 grid gap-2 min-[350px]:flex min-[350px]:gap-10 mt-2">
          <div class="grid gap-2">
            <li
              class="before:text-dark-20 dark:text-light-5/70"
              v-for="move in pokemon.moves.slice(0, 3)"
              :key="move"
            >{{move}}</li>
          </div>
          <div class="grid gap-2">
            <li
              class="before:text-dark-20 dark:text-light-5/70"
              v-for="move in pokemon.moves.slice(3, 6)"
              :key="move"
            >{{move}}</li>
          </div>
        </ul>
      </div>
    </section>
    <section class="
      shadow-xss dark:shadow-xsd rounded-2xl p-4
      lg:col-span-full lg:row-[12/20] grid gap-3
      ">
      <h2 class="font-semibold text-2xl col-span-full">Stats</h2>
      <div class="grid lg:grid-cols-2 gap-3 lg:gap-10">
        <div class="grid gap-3">
          <StatPokemon
            :stat="pokemon.stats[0]!"
            icon="❤️"
            color="#EF4444"
            description="Health points how much damage can resist."
          />
          <StatPokemon
            :stat="pokemon.stats[1]!"
            icon="⚔️"
            color="#F97316"
            description="Physical damage it can cause"
          />
          <StatPokemon
            :stat="pokemon.stats[2]!"
            icon="🛡️"
            color="#22C55E"
            description="Resistance to physical damage"
          />
        </div>
        <div class="grid gap-3">
          <StatPokemon
            :stat="pokemon.stats[3]!"
            icon="✨"
            color="#A855F7"
            description="Potencia of attack specials."
          />
          <StatPokemon
            :stat="pokemon.stats[4]!"
            icon="🔮"
            color="#6366F1"
            description="Resistance to special attacks."
          />
          <StatPokemon
            :stat="pokemon.stats[5]!"
            icon="⚡"
            color="#FACC15"
            description="How fast it attacks or moves."
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* .square-list { */
/*   list-style-type: square; */
/* } */

.square-list li {
  position: relative;
  padding-left: 1rem;
}

.square-list li::before {
  content: '■';
  position: absolute;
  left: 0;
}
</style>
