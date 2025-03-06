<template>
  <div class="movie-card">
    <img
      v-if="poster"
      class="movie-card__picture"
      :src="`https://image.tmdb.org/t/p/w300${poster}`"
      :alt="`Poster ${title}`"
    />
    <div v-else class="movie-card__no-picture c-h-2xl u-text-dark-light">
      CLAP
    </div>
    <div class="movie-card__infos">
      <RouterLink
        class="c-text-l u-text-white movie-card__link"
        :to="{
          name: type && type === 'tv' ? 'single-tv' : 'single-movie',
          params: { id: id },
        }"
        >{{ title }}</RouterLink
      >
      <p class="c-text-m u-text-white" v-if="note_count > 0">
        {{ Math.round(note * 10) / 10 }}/10
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  poster?: string;
  title: string;
  id: number;
  note: number;
  note_count: number;
  type?: string;
}
defineProps<Props>();
</script>
