<template>
  <div v-if="movie" class="c-single-movie">
    <div class="c-single-movie__hero-picture">
      <img v-if="pictures && pictures.backdrops.length > 0" :src="`https://image.tmdb.org/t/p/original${pictures.backdrops.slice(0, 1)[0].file_path}`" :alt="`Poster ${movie.title}`" />
    </div>

    <div class="c-single-movie__titles">
      <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-white u-align-center">{{ movie.title }}</h1>
      <p class="u-text-white u-align-center u-mt-16" v-if="movie.tagline">{{ movie.tagline }}</p>
    </div>

    <div class="o-container c-single-movie__content">
      <img class="c-single-movie__poster" v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="`Poster ${movie.title}`" />
      <div class="c-single-movie__infos-container">
        <div class="c-single-movie__infos">
          <h2 class="c-h-l u-text-white u-mb-16">Informations</h2>
          <div class="c-single-movie__infos-list">
            <ul class="c-single-movie__genres">
              <li class="c-text-l u-text-white" v-for="item in movie.genres">{{ item.name }}</li>
            </ul>
            <p class="c-text-l u-text-white">Date de sortie : {{ getDate(movie.release_date) }}</p>
            <p class="c-text-l u-text-white" v-if="movie.vote_count > 0">{{ Math.round(movie.vote_average * 10) / 10 }}/10 ({{ movie.vote_count }})</p>
          </div>
        </div>
        <div v-if="movie.overview" class="c-single-movie__overview">
          <h2 class="c-h-l u-text-white u-mb-16">Synopsis</h2>
          <p class="c-text-m u-text-white">{{ movie.overview }}</p>
        </div>
      </div>
    </div>

    <div class="o-container c-single-movie__video" v-if="videos && videos.results.length > 0">
      <h2 class="c-h-xl u-text-white u-mb-16">Bande-annonce</h2>
      <iframe :src="`https://www.youtube.com/embed/${videos.results.length > 1 ? getTrailer(videos.results).key : videos.results[0].key}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
const route = useRoute()

//const { data: movie } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}?language=fr-FR`)
//const { data: videos } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}/videos?language=fr-FR`)
//const { data: reco } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}/recommendations?language=fr-FR&page=1`)
//const { data: credits } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/${route.params.id}/credits?language=fr-FR`)

const movie: Ref<{
  title: string,
  tagline: string,
  poster_path: string,
  overview: string,
  vote_average: any,
  release_date: string,
  vote_count: number,
  genres: any
} | null> = ref(null)
const videos: Ref<{ results: [{key: string}] } | null> = ref(null)
const reco: Ref<{ title: string, results: [] } | null> = ref(null)
const credits: Ref<{ cast: [] } | any> = ref(null)
const pictures: Ref<{ backdrops: [], file_path: string } | any> = ref(null)

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
  fetchData(`/images`, pictures)
})

console.log('cc', videos)

const getDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}

const getTrailer = (videos: any) => {
  const trailers = videos.filter((el: any) => el.type === 'Trailer')
  return trailers.length > 2 ? trailers.reduce((r:any, o:any) => o.published_at < r.published_at ? o : r) : trailers[0]
}
</script>
