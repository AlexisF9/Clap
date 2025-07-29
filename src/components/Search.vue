<template>
  <div class="c-home-search">
    <h2 class="c-h-2xl c-h-xl-mob u-text-white u-align-center u-mb-16">
      Rechercher
    </h2>
    <div v-click-outside="closeDropdown">
      <form class="c-home-search__form" action="" @submit.prevent="">
        <input
          class="c-home-search__field"
          v-model="search"
          type="text"
          placeholder="Rechercher..."
        />
        <i class="c-home-search__icon u-text-white fas fa-search"></i>
      </form>
      <div
        class="c-home-search__results"
        v-if="open && data && data.total_results > 0"
      >
        <ul class="c-home-search__results-list">
          <li v-for="item in data.results.slice(0, 5)">
            <img
              v-if="item.poster_path"
              :src="`https://image.tmdb.org/t/p/w200${
                item.media_type === 'person'
                  ? item.profile_path
                  : item.poster_path
              }`"
              :alt="`Poster ${item.title}`"
            />
            <RouterLink
              class="c-text-m u-text-default c-home-search__link"
              :to="{
                name: getSinglePageUrl(item.media_type),
                params: { id: item.id },
              }"
            >
              {{ item.title ?? item.name }}
              <span
                v-if="getType(item.media_type)"
                class="c-text-s u-text-light"
                >{{ getType(item.media_type) }}</span
              >
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const open = ref(false);
const search = ref("");
const data: any = ref(null);

watch(search, async (newSearchValue) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_TMBD_URL
      }/search/multi?query=${newSearchValue}&include_adult=false&language=fr-FR&page=1`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}` },
      }
    );
    data.value = await response.json();
    open.value = true;
  } catch (err: any) {
    console.log(err.toString());
  }
});

const closeDropdown = () => {
  open.value = false;
};

const getSinglePageUrl = (type: string) => {
  return type === "movie"
    ? "single-movie"
    : type === "tv"
    ? "single-tv"
    : type === "person"
    ? "single-person"
    : "";
};

const getType = (type: string) => {
  return type === "movie" ? "Film" : type === "tv" ? "Série" : null;
};
</script>
