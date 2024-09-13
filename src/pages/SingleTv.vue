<template>
  <div v-if="tv" class="c-single-movie">
    <MovieBackdrop
        :backdrop_path="tv.backdrop_path"
        :alt="tv.name"
    />

    <div class="o-container c-single-movie__titles">
      <img v-if="tv.poster_path" :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="`Poster ${tv.name}`" />
      <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-white">{{ tv.name }}</h1>
      <p class="u-text-white u-mt-16" v-if="tv.tagline">{{ tv.tagline }}</p>
    </div>

    <div class="o-container">
      <MovieInfos
          :title="tv.name"
          :genres="tv.genres"
          :vote_count="tv.vote_count"
          :first_air_date="tv.first_air_date"
          :vote_average="tv.vote_average"
          :overview="tv.overview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import {ref, Ref, watchEffect} from "vue";
import MovieInfos from "../components/MovieInfos.vue";
const route = useRoute()

const tv: Ref<{
  name: string,
  backdrop_path: string,
  tagline: string,
  poster_path: string,
  overview: string,
  vote_average: any,
  first_air_date: string,
  vote_count: number,
  genres: any
} | null> = ref(null)
const videos: Ref<{ results: [{key: string}] } | null> = ref(null)

const fetchData = async(url: string, elem: any) => {
  elem.value = null

  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}/tv/${route.params.id}` + url, {
      headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
    });
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString())
  }
}

watchEffect(() => {
  fetchData(`?language=fr-FR`, tv)
  fetchData(`/videos?language=fr-FR`, videos)
})

</script>
