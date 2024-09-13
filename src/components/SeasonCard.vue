<template>
  <div class="movie-card">
    <img v-if="poster" class="movie-card__picture" :src="`https://image.tmdb.org/t/p/w300${poster}`" :alt="`Poster ${title}`" />
    <div v-else class="movie-card__no-picture"></div>
    <div class="movie-card__infos">
      <p class="c-text-l u-text-white movie-card__link">{{ title }}</p>
      <p class="c-text-m u-text-white" v-if="episodes_count && episodes_count > 0">{{ episodes_count }} {{ episodes_count > 1 ? "épisodes" : "épisode" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  poster?: string,
  title: string,
  episodes_count?: number
}
defineProps<Props>()
</script>
