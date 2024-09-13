<template>
  <div class="c-home">
    <Swiper
        class="c-home__backdrop-swiper"
        v-if="movies && movies.results.length > 0"
        :slides-per-view="1"
        :space-between="0"
        :effect="'fade'"
        :autoplay="{
        delay: 5000
      }"
        :modules="[Autoplay, EffectFade]"
    >
      <SwiperSlide v-for="movie in movies.results">
        <div class="o-container c-home__swiper-content">
          <h2 class="c-h-2xl u-text-white u-mb-24">En ce moment... <span class="u-text-secondary">{{ movie.title }}</span></h2>
          <Button
              label="En voir plus"
              size="lg"
              type="plain"
              :link="{ name: 'single-movie', params: { id: movie.id } }"
              icon="fas fa-arrow-right"
              iconPosition="right"
          />
        </div>
        <MovieBackdrop
            :backdrop_path="movie.backdrop_path"
            :alt="movie.title"
        />
      </SwiperSlide>
    </Swiper>

    <div class="o-container c-home__main">
      <Search/>

      <div class="u-mt-48" v-if="movies && movies.results.length > 0">
        <SliderMovies title="Les films à l'affiche" :list="movies.results"/>
      </div>

      <div class="u-mt-48" v-if="upcoming && upcoming.results.length > 0">
        <SliderMovies title="Ils arrivent bientot" :list="upcoming.results"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "../composables/fetch.ts";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import { Autoplay, EffectFade } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/effect-fade';
import Search from "../components/Search.vue";
import SliderMovies from "../components/SliderMovies.vue";
import Button from "../components/Button.vue";

const { data: movies } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/now_playing?language=fr-FR&page=1`)
const { data: upcoming } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/upcoming?language=fr-FR&page=1`)
</script>