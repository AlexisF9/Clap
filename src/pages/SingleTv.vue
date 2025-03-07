<template>
  <div v-if="tv" class="c-single-movie">
    <MovieBackdrop :backdrop_path="tv.backdrop_path" :alt="tv.name" />

    <div class="o-container c-single-movie__titles">
      <img
        v-if="tv.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
        :alt="`Poster ${tv.name}`"
      />
      <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-white c-single-movie__title">
        {{ tv.name }}
      </h1>
      <p
        class="c-text-l u-text-white u-mt-16"
        v-if="tv.vote_average && tv.vote_count && tv.vote_count > 0"
      >
        {{ Math.round(tv.vote_average * 10) / 10 }}/10 ({{ tv.vote_count }})
      </p>
    </div>

    <div class="o-container c-single-movie__infos">
      <div
        v-if="videos && videos.results.length > 0 && videos.results.filter((el: any) => el.type === 'Trailer' && el.official && el.site === 'YouTube').length > 0"
      >
        <Trailer title="Bande-annonce saison 1" :videos="videos" />
      </div>
      <MovieInfos
        :title="tv.name"
        :genres="tv.genres"
        :first_air_date="tv.first_air_date"
        :last_air_date="tv.last_air_date"
        :in_production="tv.in_production"
        :overview="tv.overview"
        :seasons_count="tv.number_of_seasons"
        :episodes_count="tv.number_of_episodes"
        :networks="tv.networks"
      />
    </div>

    <div v-if="credits && credits.cast.length > 0" class="o-container">
      <SliderPersons title="Casting (VO)" :list="credits.cast" />
    </div>

    <div class="o-container u-text-white c-episodes-rating" v-if="seasons">
      <h2 class="c-h-2xl u-mb-24">Notation des épisodes</h2>
      <div class="c-episodes-rating__seasons">
        <div
          v-for="season in seasons.sort((a: any, b: any) => a.season_number - b.season_number)"
        >
          <p
            class="c-text-l u-mb-8 u-align-center"
            v-if="season.episodes.length > 0"
          >
            S{{ season.season_number }}
          </p>
          <ul
            class="c-episodes-rating__episodes-list"
            v-if="season.episodes.length > 0"
          >
            <li
              :class="`c-text-m c-episodes-rating__episode ${
                episode.vote_count > 0 &&
                getClass(Math.round(episode.vote_average * 10) / 10)
              }`"
              v-for="episode in season.episodes"
            >
              E{{ episode.episode_number }}
              <span class="c-text-l u-fw-600" v-if="episode.vote_count > 0">{{
                Math.round(episode.vote_average * 10) / 10
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="reco && reco.results.length > 0" class="o-container">
      <SliderMovies
        :title="`Vous avez aimé ${tv.name} ?`"
        subtitle="Ces films peuvent vous intéresser"
        :list="reco.results"
        card_type="tv"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import { ref, Ref, watch, watchEffect } from "vue";
import MovieInfos from "../components/MovieInfos.vue";
import Trailer from "../components/Trailer.vue";
import SliderPersons from "../components/SliderPersons.vue";
import SliderMovies from "../components/SliderMovies.vue";

const route = useRoute();
const router = useRouter();

const tv: Ref<{
  name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  last_air_date: string;
  vote_count: number;
  genres: any;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: any;
  networks: [];
  in_production: boolean;
  success?: boolean;
} | null> = ref(null);
const videos: Ref<{ results: [{ key: string }] } | null> = ref(null);
const credits: Ref<{ cast: [] } | any> = ref(null);
const reco: Ref<{ title: string; results: [] } | null> = ref(null);

type Season = {
  name: string;
  season_number: number;
  episodes: {
    episode_number: number;
    vote_count: number;
    vote_average: any;
    length: number;
  };
};
const seasons = ref<Season[]>([]);

const fetchData = async (url: string, elem: any) => {
  elem.value = null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_TMBD_URL}/tv/${route.params.id}` + url,
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
  fetchData(`?language=fr-FR`, tv);
  fetchData(`/videos?language=fr-FR`, videos);
  fetchData(`/credits?language=fr-FR`, credits);
  fetchData(`/recommendations?language=fr-FR&page=1`, reco);
});

watch(tv, () => {
  if (tv?.value && tv?.value?.success === false) {
    router.push({ name: "not-found" });
  } else if (tv.value?.name) {
    document.title = tv.value.name;
  }
});

watch(videos, () => {
  if (videos.value) {
    const vid =
      videos &&
      videos.value.results.length > 0 &&
      videos.value.results.filter(
        (el: any) =>
          el.type === "Trailer" && el.official && el.site === "YouTube"
      ).length > 0;

    if (!vid) {
      fetchData(`/videos`, videos);
    }
  }
});

const fetchEp = async (number: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_TMBD_URL}/tv/${
        route.params.id
      }/season/${number}?language=fr-FR`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}` },
      }
    );
    const res = await response.json();
    seasons.value = [...seasons.value, res];
  } catch (err: any) {
    console.log(err.toString());
  }
};

const getEpisodes = (s: any) => {
  seasons.value = [];
  if (s) {
    s.filter((item: any) => item.season_number > 0).forEach((element: any) => {
      fetchEp(element.season_number);
    });
  }
};

watchEffect(() => {
  if (tv) {
    getEpisodes(tv.value?.seasons);
  }
});

const getClass = (note: number) => {
  if (note < 4) {
    return "c-episodes-rating__episode--nul";
  } else if (note < 6) {
    return "c-episodes-rating__episode--bof";
  } else if (note < 8) {
    return "c-episodes-rating__episode--ok";
  } else if (note < 9) {
    return "c-episodes-rating__episode--good";
  } else if (note < 10) {
    return "c-episodes-rating__episode--very-good";
  } else {
    return "c-episodes-rating__episode--amazing";
  }
};
</script>
