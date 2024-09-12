<template>
  <div v-if="movie" class="o-container">
    <div class="single-movie">
      <h1 class="c-h-2xl u-text-white">{{ movie.title }}</h1>
      <p class="u-text-white u-mt-16" v-if="movie.tagline">{{ movie.tagline }}</p>

      <div class="single-movie__video" v-if="videos && getTrailer(videos.results).key">
        <h2 class="c-h-l u-text-white u-mb-16">Bande-annonce</h2>
        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${getTrailer(videos.results).key}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>

      <div class="single-movie__content">
        <h2 class="c-h-l u-text-white u-mb-16">Informations</h2>
        <div>
          <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" :alt="`Poster ${movie.title}`" />
          <div class="single-movie__infos">
            <ul class="single-movie__genres">
              <li class="c-text-l u-text-white" v-for="item in movie.genres">{{ item.name }}</li>
            </ul>
            <p class="c-text-l u-text-white">Date de sortie : {{ getDate(movie.release_date) }}</p>
            <p class="c-text-l u-text-white">{{ Math.round(movie.vote_average * 10) / 10 }}/10 ({{ movie.vote_count }})</p>
          </div>
        </div>
      </div>
      <div class="single-movie__overview">
        <h2 class="c-h-l u-text-white u-mb-16">Synopsis</h2>
        <p class="c-text-m u-text-white">{{ movie.overview }}</p>
      </div>
      <div v-if="reco" class="single-movie__slider">
        <SliderMovies :title="`Vous avez aimé ${movie.title} ?`" subtitle="Ces films peuvent vous intéresser" :list="reco.results"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFetch} from "../composables/fetch.ts";
import {useRoute} from "vue-router";
import SliderMovies from "../components/SliderMovies.vue";

const route = useRoute()

const { data: movie } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}?language=fr-FR`)
const { data: videos } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}/videos?language=fr-FR`)
const { data: reco } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}/recommendations?language=fr-FR&page=1`)
const { data: credits } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}/credits?language=fr-FR`)
console.log(credits)
const getDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}

const getTrailer = (videos: any) => {
  const trailers = videos.filter((el: any) => el.type === 'Trailer')
  return trailers.reduce((r:any, o:any) => o.published_at < r.published_at ? o : r)
}
</script>

<style lang="scss">
.single-movie {
  margin-top: 10rem;
}

.single-movie__video {
  margin: 4rem 0;
}

.single-movie__content {
  margin-top: 2.4rem;

  div {
    display: flex;
    gap: 1.6rem;
  }

  img {
    max-width: 300px;
  }
}

.single-movie__infos {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.single-movie__genres {
  display: flex;
  gap: .5rem;

  li:not(:last-child)::after {
    content: ',';
  }
}

.single-movie__overview {
  margin-top: 2rem;
}

.single-movie__slider {
  margin-top: 6rem;
}
</style>
