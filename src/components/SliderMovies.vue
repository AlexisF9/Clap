<template>
  <div class="c-slider-movies">
    <div class="c-slider-movies__intro">
      <div>
        <div class="c-slider-movies__title">
          <h2 class="c-h-xl u-text-white">{{ title }}</h2>
          <div class="c-toggle-buttons">
            <button
                :class="set_type === item.value ? 'c-toggle-buttons__cta is-active' : 'c-toggle-buttons__cta u-text-white'"
                v-for="item in filter"
                @click="set_type = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
        <p v-if="subtitle" class="c-text-l u-text-light u-mt-12">{{ subtitle }}</p>
      </div>
      <Button class="c-slider-movies__more-cta" v-if="action" label="Voir plus" type="ghost" icon="fas fa-plus"/>
    </div>
    <Swiper
        v-if="!loading && list"
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
          :title="movie.title ?? movie.name"
          :note="movie.vote_average"
          :poster="movie.poster_path"
          :note_count="movie.vote_count"
          :type="type === 'tv' ? 'tv' : 'movie'"
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
import Button from "./Button.vue";

const set_type = defineModel('select')

interface Props {
  title: string,
  subtitle?: string,
  list: any[],
  action?: { label: string, link: string },
  filter?: { value: string, label: string }[],
  loading?: any
  type?: string
}
defineProps<Props>()
</script>