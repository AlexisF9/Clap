<template>
  <div class="c-slider-movies" v-if="list">
    <div class="c-slider-movies__intro">
      <div>
        <h2 class="c-h-xl u-text-white">{{ title }}</h2>
        <p v-if="subtitle" class="c-text-l u-text-light u-mt-12">{{ subtitle }}</p>
      </div>
      <Cta class="c-slider-movies__more-cta" v-if="action" label="Voir plus" type="ghost" icon="fas fa-plus"/>
    </div>
    <Swiper
        class="c-slider-movies__swiper"
        slides-per-view="auto"
        :space-between="20"
        :breakpoints="{
          '640': {
            slidesPerView: 2
          },
          '768': {
            slidesPerView: 3
          },
          '1024': {
            slidesPerView: 5
          }
        }"
        :modules="[Navigation]"
        :navigation="{enabled: true, prevEl: '.swiper-prev', nextEl: '.swiper-next'}"
    >
      <SwiperSlide v-for="movie in list">
        <MovieCard
          :id="movie.id"
          :title="movie.title ?? movie.name"
          :note="movie.vote_average"
          :poster="movie.poster_path"
          :note_count="movie.vote_count"
          :type="card_type ?? 'movie'"
        />
      </SwiperSlide>
      <div class="c-slider-movies__nav">
        <button class="u-text-white swiper-prev"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="u-text-white swiper-next"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/navigation';
import MovieCard from "./MovieCard.vue";
import Cta from "./Cta.vue";

interface Props {
  title: string,
  subtitle?: string,
  list: any[],
  action?: { label: string, link: string }
  card_type?: string
}
defineProps<Props>()
</script>