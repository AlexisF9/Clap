<template>
  <div v-if="tv" class="c-single-movie">
    <MovieBackdrop
        :backdrop_path="tv.backdrop_path"
        :alt="tv.name"
    />

    <div class="o-container c-single-movie__titles">
      <img v-if="tv.poster_path" :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="`Poster ${tv.name}`" />
      <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-white">{{ tv.name }}</h1>
      <p class="c-text-l u-text-white u-mt-16" v-if="tv.vote_average && tv.vote_count && tv.vote_count > 0">{{ Math.round(tv.vote_average * 10) / 10 }}/10 ({{ tv.vote_count }})</p>
    </div>

    <div class="o-container c-single-movie__infos">
      <div v-if="videos && videos.results.length > 0">
        <Trailer title="Bande-annonce saison 1" :videos="videos" />
      </div>
      <MovieInfos
          :title="tv.name"
          :genres="tv.genres"
          :first_air_date="tv.first_air_date"
          :last_air_date="tv.last_air_date"
          :overview="tv.overview"
          :seasons_count="tv.number_of_seasons"
          :episodes_count="tv.number_of_episodes"
          :networks="tv.networks"
      />
    </div>

    <div class="o-container u-mt-64 u-text-white episodes-note" v-if="test">
      <h2 class="c-h-2xl u-mb-24">Episodes</h2>
      <div class="seasons">
        <div v-for="season in test.sort((a: any, b: any) => a.season_number - b.season_number)">
          <p class="c-text-l u-mb-8 season-name">{{ season.name }}</p>
          <ul class="episodes">
            <li :class="`c-text-m episode ${episode.vote_count > 0 && getClass(episode.vote_average)}`" v-for="episode in season.episodes">
              {{ episode.episode_number }}
              <span class="u-fw-600" v-if="episode.vote_count > 0">{{ Math.round(episode.vote_average * 10) / 10 }} ({{ episode.vote_count }})</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!--
    <div class="o-container" v-if="tv.seasons">
      <SliderSeasons title="Saisons" :list="tv.seasons" />
    </div>
    -->

    <div v-if="credits && credits.cast.length > 0" class="o-container">
      <SliderPersons title="Casting (VO)" :list="credits.cast"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import {ref, Ref, watchEffect} from "vue";
import MovieInfos from "../components/MovieInfos.vue";
import Trailer from "../components/Trailer.vue";
import SliderPersons from "../components/SliderPersons.vue";
const route = useRoute()

const tv: Ref<{
  name: string,
  backdrop_path: string,
  poster_path: string,
  overview: string,
  vote_average: number,
  first_air_date: string,
  last_air_date: string,
  vote_count: number,
  genres: any
  number_of_seasons: number,
  number_of_episodes: number,
  seasons: any
  networks: []
} | null> = ref(null)
const videos: Ref<{ results: [{key: string}] } | null> = ref(null)
const credits: Ref<{ cast: [] } | any> = ref(null)

type Season = {episodes: any}
const test = ref<Season[]>([])

const fetchData = async(url: string, elem: any) => {
  elem.value = null

  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}/tv/${route.params.id}` + url, {
      headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
    });
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString())
  }
}

watchEffect(() => {
  fetchData(`?language=fr-FR`, tv)
  fetchData(`/videos?language=fr-FR`, videos)
  fetchData(`/credits?language=fr-FR`, credits)
})

const fetchEp = async(number: number) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}/tv/${route.params.id}/season/${number}?language=fr-FR`, {
      headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
    });
    const res = await response.json()
    test.value = [...test.value, res];
  } catch (err: any) {
    console.log(err.toString())
  }
}

const getEpisodes = (seasons: any) => {
  if (seasons) {
    seasons.filter((item: any) => item.season_number > 0).forEach((element: any) => {
      fetchEp(element.season_number)
    })
  }
}

watchEffect(() => {
  if (tv) {
    getEpisodes(tv.value?.seasons)
  }
})

watchEffect(() => {
  console.log(test)
})

const getClass = (note: number) => {
  if (note < 4) {
    return 'episode--nul'
  } else if (note < 5) {
    return 'episode--bof'
  } else if (note < 8) {
    return 'episode--ok'
  } else if (note < 9) {
    return 'episode--good'
  } else if (note < 10) {
    return 'episode--very-good'
  } else {
    return 'episode--amazing'
  }
}
</script>


<style lang="scss">
.episodes-note {
  overflow: hidden;
}

.seasons {
  background-color: #252525;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  overflow: auto;

  & > div {
    position: relative;
    width: max-content;
    display: inline-table;
  }
}

.season-name {
  position: sticky;
  left: 0;
  width: fit-content;
}

.episodes {
  display: flex;
}

.episode {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  background-color: grey;
  min-width: 6rem;
  height: 6rem;
}

.episode--nul {
  background-color: #a2336b;
}

.episode--bof {
  background-color: #bd2130;
}

.episode--ok {
  background-color: #fcd25e;
}

.episode--good {
  background-color: #7adf90;
}

.episode--very-good {
  background-color: #28a745;
}

.episode--amazing {
  background-color: green;
}
</style>