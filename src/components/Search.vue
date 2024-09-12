<template>
  <div class="search">
    <h2 class="c-h-xl u-text-white u-align-center u-mb-16">Rechercher</h2>
    <form class="search__form" action="">
      <input class="search__field" v-model="search" type="text" placeholder="Rechercher..."/>
    </form>
    <div class="search__results" v-if="data && data.total_results > 0">
      <ul class="search__results-list">
        <li v-for="item in data.results.slice(0, 5)">
          <img v-if="item.poster_path" :src="`https://image.tmdb.org/t/p/w200${item.media_type === 'person' ? item.profile_path : item.poster_path}`" :alt="`Poster ${item.title}`" />
          <RouterLink class="c-text-m u-text-default search__link" :to="{ name: getSinglePageUrl(item.media_type), params: { id: item.id } }">
            {{ item.title ?? item.name }}
            <span v-if="getType(item.media_type)" class="c-text-s u-text-light">{{ getType(item.media_type) }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";

const search = ref('')
const data: any = ref(null)

watchEffect(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}/search/multi?query=${search.value}&include_adult=false&language=fr-FR&page=1`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}` }
    });
    data.value = await response.json();
  } catch (err: any) {
    console.log(err.toString())
  }
})

const getSinglePageUrl = (type: string) => {
  return type === 'movie' ? 'single-movie' : type === 'tv' ? 'single-tv' : type === 'person' ? 'single-person' : ''
}

const getType = (type: string) => {
  return type === 'movie' ? 'Film' : type === 'tv' ? 'Série' : null
}

</script>
