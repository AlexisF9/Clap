<template>
  <div v-if="tv" class="c-single-movie">
    <MovieBackdrop
        :backdrop_path="tv.backdrop_path"
        :alt="tv.name"
    />

    <div class="o-container c-single-movie__titles">
      <img v-if="tv.poster_path" :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="`Poster ${tv.name}`" />
      <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-white">{{ tv.name }}</h1>
      <p class="c-text-l u-text-white u-mt-16" v-if="tv.vote_average && tv.vote_count && tv.vote_count > 0">{{ Math.round(tv.vote_average * 10) / 10 }}/10 ({{ tv.vote_count }})</p>
    </div>

    <div class="o-container c-single-movie__infos">
      <div v-if="videos && videos.results.length > 0">
        <Trailer title="Bande-annonce saison 1" :videos="videos" />
      </div>
      <MovieInfos
          :title="tv.name"
          :genres="tv.genres"
          :first_air_date="tv.first_air_date"
          :last_air_date="tv.last_air_date"
          :overview="tv.overview"
          :seasons_count="tv.number_of_seasons"
          :episodes_count="tv.number_of_episodes"
          :networks="tv.networks"
      />
    </div>

    <div class="o-container" v-if="tv.seasons">
      <SliderSeasons title="Saisons" :list="tv.seasons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import {ref, Ref, watchEffect} from "vue";
import MovieInfos from "../components/MovieInfos.vue";
import SliderSeasons from "../components/SliderSeasons.vue";
import Trailer from "../components/Trailer.vue";
const route = useRoute()

const tv: Ref<{
  name: string,
  backdrop_path: string,
  poster_path: string,
  overview: string,
  vote_average: number,
  first_air_date: string,
  last_air_date: string,
  vote_count: number,
  genres: any
  number_of_seasons: number,
  number_of_episodes: number,
  seasons: []
  networks: []
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
