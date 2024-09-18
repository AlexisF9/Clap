<template>
  <div v-if="movie" class="c-single-movie">
    <MovieBackdrop
      :backdrop_path="movie.backdrop_path"
      :alt="movie.title"
    />

    <div class="o-container c-single-movie__titles">
      <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="`Poster ${movie.title}`" />
      <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-white c-single-movie__title">{{ movie.title }}</h1>
      <p class="c-text-l u-text-white u-mt-16" v-if="movie.vote_average && movie.vote_count && movie.vote_count > 0">
        {{ Math.round(movie.vote_average * 10) / 10 }}/10 ({{ movie.vote_count }})
      </p>
    </div>

    <div class="o-container c-single-movie__infos">
      <div v-if="videos && videos.results.length > 0 && videos.results.filter((el: any) => el.type === 'Trailer').length > 0">
        <Trailer title="Bande-annonce" :videos="videos" />
      </div>
      <MovieInfos
        :genres="movie.genres"
        :release_date="movie.release_date"
        :overview="movie.overview"
        :revenue="movie.revenue"
        :budget="movie.budget"
        :runtime="movie.runtime"
      />
    </div>

    <div v-if="credits && credits.cast.length > 0" class="o-container">
      <SliderPersons title="Casting (VO)" :list="credits.cast"/>
    </div>
    <div v-if="reco && reco.results.length > 0" class="o-container">
      <SliderMovies :title="`Vous avez aimé ${movie.title} ?`" subtitle="Ces films peuvent vous intéresser" :list="reco.results"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import SliderMovies from "../components/SliderMovies.vue";
import SliderPersons from "../components/SliderPersons.vue";
import {Ref, ref, watchEffect} from "vue";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import Trailer from "../components/Trailer.vue";
import MovieInfos from "../components/MovieInfos.vue";
const route = useRoute()

const movie: Ref<{
  title: string,
  backdrop_path: string,
  poster_path: string,
  overview: string,
  vote_average: number,
  release_date: string,
  vote_count: number,
  genres: any,
  revenue: number,
  budget: number
  runtime: number
} | null> = ref(null)
const videos: Ref<{ results: [{key: string}] } | null> = ref(null)
const reco: Ref<{ title: string, results: [] } | null> = ref(null)
const credits: Ref<{ cast: [] } | any> = ref(null)
const date: Ref<any> = ref(null)

const fetchData = async(url: string, elem: any) => {
  elem.value = null

  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}` + url, {
      headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
    });
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString())
  }
}

watchEffect(() => {
  fetchData(`?language=fr-FR`, movie)
  fetchData(`/videos?language=fr-FR`, videos)
  fetchData(`/recommendations?language=fr-FR&page=1`, reco)
  fetchData(`/credits?language=fr-FR`, credits)
  fetchData(`/release_dates`, date)
})
//const getReleaseDate = (date: any) => {
//  if (date && date.results.length > 0) {
//    const fr = date.results.find((el: any) => el.iso_3166_1 === 'FR')
//    return fr.release_dates.find((i: any) => i.note === '').release_date.slice(0, 10)
//  }
//  return null
//}
</script>
