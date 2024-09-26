<template>
  <div class="c-trailer">
    <h2 class="c-h-xl u-text-white u-mb-16">{{ title }}</h2>
    <iframe :src="`https://www.youtube.com/embed/${videos.results.length > 1 ? getTrailer(videos.results).key : videos.results[0].key}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">
defineProps(['title', 'videos'])

const getTrailer = (videos: any) => {
  const trailers = videos.filter((el: any) => el.type === 'Trailer')
  return trailers.length > 1 ? trailers.reduce((r:any, o:any) => o.published_at < r.published_at ? o : r) : trailers[0]
}
</script>
