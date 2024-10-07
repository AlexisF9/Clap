<template>
  <div class="c-movie-infos">
    <div>
      <h2 class="c-h-l u-text-white u-mb-16">Informations</h2>
      <div class="c-movie-infos__infos-list">
        <ul>
          <li class="u-text-white" v-if="genres">
            <div class="c-movie-infos__genres">
              <Tag size="md" v-for="item in genres" link="#" :label="item.name"/>
            </div>
          </li>
          <li class="c-text-m u-text-white" v-if="release_date">{{ getDate(release_date) }} en salle</li>
          <li class="c-text-m u-text-white" v-if="budget && budget > 0">
            Budget :
            {{ budget.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          }) }}
          </li>
          <li class="c-text-m u-text-white" v-if="revenue && revenue > 0">
            Box-office :
            {{ revenue.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          }) }}
          </li>
          <li class="c-text-m u-text-white" v-if="runtime">Dure {{ getRunTime(runtime) }}</li>
          <li class="c-text-m u-text-white" v-if="first_air_date">Première diffusion : {{ getDate(first_air_date) }} <span v-if="!last_air_date && in_production">(En cours)</span></li>
          <li class="c-text-m u-text-white" v-if="first_air_date && last_air_date && last_air_date != first_air_date">Dernière diffusion : {{ getDate(last_air_date) }} <span v-if="in_production">(En cours)</span></li>
          <li class="c-text-m u-text-white c-movie-infos__networks" v-if="networks && networks.length > 0">Diffusé sur <span v-for="network in networks">{{ network.name }}</span></li>
          <li class="c-text-m u-text-white" v-if="seasons_count">
            {{ seasons_count }} {{ seasons_count > 1 ? 'saisons' : 'saison' }}
            <span v-if="episodes_count">
              ({{ episodes_count }} {{ episodes_count > 1 ? 'épisodes' : 'épisode'}})
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="overview" class="c-movie-infos__overview">
      <h2 class="c-h-l u-text-white u-mb-16">Synopsis</h2>
      <p class="c-text-m u-text-white">{{ overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from "./Tag.vue";

interface Props {
  genres?: { name: string }[]
  release_date?: string,
  first_air_date?: string,
  last_air_date?: string,
  seasons_count?: number,
  episodes_count?: number,
  vote_count?: number,
  vote_average?: number,
  overview?: string,
  networks?: { name: string }[]
  revenue?: number
  budget?: number
  runtime?: number
  in_production?: boolean
}
defineProps<Props>()

const getDate = (date: string) => {
  const now = Date.now();
  const newDate = new Date(date)
  //const seconds = (Date.parse(date) - now) / 1000;
  const daysBefore = Math.floor(((Date.parse(date) - now) / 1000) / (3600 * 24))

  //const d = Math.floor(seconds / (3600*24));
  //const h = Math.floor(seconds % (3600*24) / 3600);
  //const m = Math.floor(seconds % 3600 / 60);
  //const s = Math.floor(seconds % 60);
  //console.log(d, h, m, s)
  return newDate.toLocaleDateString() + (daysBefore > 1 ? ` (${daysBefore} jours)` : '')
}

const getRunTime = (n:number) => {
  const hours = (n / 60);
  const h = Math.floor(hours);
  const minutes = (hours - h) * 60;
  const m = Math.round(minutes);
  return h + 'h ' + m + "min";
}
</script>
