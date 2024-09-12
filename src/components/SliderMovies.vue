<template>
  <div v-if="list">
    <div class="c-slider-movies__intro">
      <div class="c-slider-movies__title">
        <h2 class="c-h-xl u-text-white">{{ title }}</h2>
        <p v-if="subtitle" class="c-text-l u-text-light u-mt-12">{{ subtitle }}</p>
      </div>
      <Button v-if="action" label="Voir plus" type="ghost" link="cc" icon="fas fa-plus"/>
    </div>
    <Swiper
        class="c-slider-movies__swiper"
        slides-per-view="auto"
        :space-between="20"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
          },
          '768': {
            slidesPerView: 3,
          },
          '1024': {
            slidesPerView: 5,
          },
        }"
        :modules="[Navigation]"
        :navigation="{enabled: true, prevEl: '.swiper-prev', nextEl: '.swiper-next'}"
    >
      <SwiperSlide v-for="movie in list">
        <MovieCard
          :id="movie.id"
          :title="movie.title"
          :note="movie.vote_average"
          :poster="movie.poster_path"
        />
      </SwiperSlide>
    </Swiper>
    <div class="c-slider-movies__nav">
      <button class="u-text-white swiper-prev"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="u-text-white swiper-next"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/navigation';
import MovieCard from "./MovieCard.vue";
import Button from "./Button.vue";

defineProps(['title', 'subtitle', 'list', 'action'])
</script>
