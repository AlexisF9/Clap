<template>
  <div class="movie-card">
    <img class="movie-card__picture" :src="`https://image.tmdb.org/t/p/w300${poster}`" :alt="`Poster ${title}`" />
    <div class="movie-card__infos">
      <RouterLink class="c-text-l u-text-white movie-card__link" :to="{ name: 'single-movie', params: { id: id } }">{{ title }}</RouterLink>
      <p class="c-text-m u-text-white">{{ Math.round(note * 10) / 10 }}/10</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['poster', 'title', 'id', 'note'])
</script>
