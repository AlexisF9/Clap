<template>
  <div class="o-container" v-if="person">
    <div class="c-single-person__infos">
      <div class="c-single-person__intro">
        <img
          v-if="person.profile_path"
          class="c-single-person__picture"
          :src="`https://image.tmdb.org/t/p/w300${person.profile_path}`"
          :alt="`Poster ${person.name}`"
        />
        <div>
          <h2 class="c-h-2xl u-text-white u-mb-16">{{ person.name }}</h2>
          <p class="c-text-l u-text-white" v-if="person.place_of_birth">
            Natif de {{ person.place_of_birth }}
          </p>
          <p class="c-text-l u-text-white" v-if="person.birthday">
            Né le {{ getDate(person.birthday) }}
          </p>
          <p
            class="c-text-l u-text-white"
            v-if="person.birthday && person.deathday"
          >
            Mort le {{ getDate(person.deathday) }}
          </p>
          <div v-if="socials" class="c-single-person__socials">
            <a
              class="c-text-l"
              target="_blank"
              v-if="socials.instagram_id"
              :href="`https://www.instagram.com/${socials.instagram_id}/`"
              ><i class="fab fa-instagram"></i
            ></a>
            <a
              class="c-text-l"
              target="_blank"
              v-if="socials.tiktok_id"
              :href="`https://www.tiktok.com/@${socials.tiktok_id}`"
              ><i class="fab fa-tiktok"></i
            ></a>
            <a
              class="c-text-l"
              target="_blank"
              v-if="socials.twitter_id"
              :href="`https://x.com/${socials.twitter_id}`"
              ><i class="fab fa-twitter"></i
            ></a>
            <a
              class="c-text-l"
              target="_blank"
              v-if="socials.youtube_id"
              :href="`https://www.youtube.com/@${socials.youtube_id}`"
              ><i class="fab fa-youtube"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <p class="c-text-m u-text-white u-mt-32" v-if="person.biography">
      {{ person.biography }}
    </p>

    <div class="c-single-person__sliders">
      <SliderTabsMovies
        v-if="
          (filtered_movies?.cast && filtered_movies.cast.length > 0) ||
          (filtered_tv?.cast && filtered_tv.cast.length > 0)
        "
        title="Au casting de"
        :tabs="[
          {
            value: 'movie',
            label: 'Film',
            list: filtered_movies?.cast ? filtered_movies.cast : [],
          },
          {
            value: 'tv',
            label: 'Série',
            list: filtered_tv?.cast ? filtered_tv.cast : [],
          },
        ]"
        :type="
          filtered_movies?.cast && filtered_movies.cast.length === 0
            ? (trendingType = 'tv')
            : trendingType2
        "
        v-model:select="trendingType2"
      />

      <SliderTabsMovies
        v-if="
          (filtered_movies?.crew && filtered_movies.crew.length > 0) ||
          (filtered_tv?.crew && filtered_tv.crew.length > 0)
        "
        title="Dans l'équipe de"
        :tabs="[
          {
            value: 'movie',
            label: 'Film',
            list: filtered_movies?.crew ? filtered_movies.crew : [],
          },
          {
            value: 'tv',
            label: 'Série',
            list: filtered_tv?.crew ? filtered_tv.crew : [],
          },
        ]"
        :type="
          filtered_movies?.crew && filtered_movies.crew.length > 0
            ? trendingType
            : (trendingType = 'tv')
        "
        v-model:select="trendingType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch, watchEffect } from "vue";
import SliderTabsMovies from "../components/SliderTabsMovies.vue";

const route = useRoute();
const router = useRouter();
const trendingType = ref("movie");
const trendingType2 = ref("movie");

const person = ref<{
  profile_path: string;
  name: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  biography: string;
  success?: boolean;
}>();
const movies = ref<{ cast?: any[]; crew?: any[] }>();
const filtered_movies = ref<{ cast?: any[]; crew?: any[] }>({
  cast: [],
  crew: [],
});
const tv = ref<{ cast?: any[]; crew?: any[] }>();
const filtered_tv = ref<{ cast?: any[]; crew?: any[] }>({ cast: [], crew: [] });
const socials = ref<{
  instagram_id?: string;
  tiktok_id?: string;
  twitter_id?: string;
  youtube_id?: string;
}>();

const fetchData = async (url: string, elem: any) => {
  elem.value = null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_TMBD_URL}/person/${route.params.id}` + url,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}` },
      }
    );
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString());
  }
};

watchEffect(() => {
  fetchData(`?language=fr-FR`, person);
  fetchData(`/movie_credits?language=fr-FR`, movies);
  fetchData(`/tv_credits?language=fr-FR`, tv);
  fetchData(`/external_ids`, socials);
});

const getDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

watch(person, () => {
  if (person?.value && person?.value?.success === false) {
    router.push({ name: "not-found" });
  }
});

watch(movies, () => {
  if (movies.value) {
    movies?.value?.crew?.forEach((el: any) => {
      if (!filtered_movies?.value?.crew?.find((e: any) => e.id === el.id)) {
        filtered_movies?.value?.crew?.push(el);
      }
    });

    movies?.value?.cast?.forEach((el: any) => {
      if (!filtered_movies?.value?.cast?.find((e: any) => e.id === el.id)) {
        filtered_movies?.value?.cast?.push(el);
      }
    });
  }
});

watch(tv, () => {
  if (tv.value) {
    tv?.value?.crew?.forEach((el: any) => {
      if (!filtered_tv?.value?.crew?.find((e: any) => e.id === el.id)) {
        filtered_tv?.value?.crew?.push(el);
      }
    });

    tv?.value?.cast?.forEach((el: any) => {
      if (!filtered_tv?.value?.cast?.find((e: any) => e.id === el.id)) {
        filtered_tv?.value?.cast?.push(el);
      }
    });
  }
});
</script>
