<template>
  <div class="movie-card">
    <img v-if="poster" class="movie-card__picture" :src="`https://image.tmdb.org/t/p/w300${poster}`" :alt="`Poster ${title}`" />
    <div v-else class="movie-card__no-picture"></div>
    <div class="movie-card__infos">
      <RouterLink class="c-text-l u-text-white movie-card__link" :to="{ name: 'single-movie', params: { id: id } }">{{ title }}</RouterLink>
      <p class="c-text-m u-text-white" v-if="note_count > 0">{{ Math.round(note * 10) / 10 }}/10</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['poster', 'title', 'id', 'note', 'note_count'])
</script>
