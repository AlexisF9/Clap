<template>
  <div class="o-container">
    <AisInstantSearch :search-client="searchClient" index-name="movies">
      <AisConfigure :hits-per-page.camel="12"></AisConfigure>

      <AisSearchBox>
        <template #default="{ refine }">
          <h2 class="u-align-center u-text-white c-h-2xl u-mb-24">Bientôt en salle</h2>
          <input
              id="field_id"
              class="c-search__search-field"
              type="text"
              name="field_id"
              placeholder="Rechercher le nom"
              autocomplete="off"
              @input="refine(($event.currentTarget as HTMLInputElement)?.value)"
          />
        </template>
      </AisSearchBox>

      <div class="c-search__content">
        <div class="c-search__facets">
          <AisClearRefinements class="c-search__reset">
            <template v-slot="{ canRefine, refine, createURL }">
              <a
                  :href="createURL()"
                  @click.prevent="refine"
                  v-if="canRefine"
              >
                Reinitialiser
              </a>
              <p v-else>Reinitialiser</p>
            </template>
          </AisClearRefinements>
          <!--
          <AisRefinementList class="c-search__facet u-text-white" attribute="type">
            <template v-slot="{ items, refine }">
              <template v-if="items.length">
                <h3 class="u-mb-16 c-h-l">Type</h3>
                <ul class="c-search__facet-list">
                  <li v-for="(item, index) in items" :key="item.value">
                    <input
                        :id="`facet-type-${index}`"
                        type="checkbox"
                        :name="`facet-type-${index}`"
                        :checked="item.isRefined"
                        @input.prevent="refine(item.value)"
                    />
                    <label :for="`facet-type-${index}`">
                      {{ item.label }}
                      <span>({{ item.count }})</span>
                    </label>
                  </li>
                </ul>
              </template>
              <template v-else>Aucun résultat.</template>
            </template>
          </AisRefinementList>
          -->
          <AisRefinementList class="c-search__facet u-text-white" attribute="genre_ids" searchable>
            <template v-slot="{ items, refine }">
              <div class="c-search__facet-intro">
                <h3 class="c-h-l">Genres</h3>
                <button class="c-search__facet-toggle u-text-white" @click="facet_open = !facet_open"><i class="fas fa-chevron-down"></i></button>
              </div>
              <div :class="`c-search__facet-content ${facet_open && 'c-search__facet-content--open'}`">
                <div>
                  <template v-if="items.length">
                    <ul class="c-search__facet-list">
                      <li v-for="(item, index) in items" :key="item.value">
                        <input
                            :id="`facet-genres-${index}`"
                            type="checkbox"
                            :name="`facet-genres-${index}`"
                            :checked="item.isRefined"
                            @input.prevent="refine(item.value)"
                        />
                        <label :for="`facet-genres-${index}`">
                          {{ getGenres(genres, item.label) }}
                          <span>({{ item.count }})</span>
                        </label>
                      </li>
                    </ul>
                  </template>
                  <template v-else>Aucun résultat.</template>
                </div>
              </div>
            </template>
          </AisRefinementList>
          <!--
          <AisRatingMenu class="c-search__facet" attribute="vote_average">
            <template v-slot="{ items, refine, createURL }">
              <h3 class="u-mb-16 c-h-l u-text-white">Note minimum</h3>
              <ul>
                <li v-for="item in items" :key="item.value">
                  <a
                      :href="createURL(item.value)"
                      :style="{ color: item.isRefined ? 'gold' : '#fff' }"
                      @click.prevent="refine(item.value)"
                  >
                  <span v-for="(full, index) in item.stars" :key="index">
                    {{ full ? '★' : '☆' }}
                  </span>
                    ({{ item.count }})
                  </a>
                </li>
              </ul>
            </template>
          </AisRatingMenu>
          -->
        </div>

        <div>
          <AisInfiniteHits>
            <template v-slot="{ items, isLastPage, refineNext }">
              <div class="c-search__result-cards">
                <template v-if="items.length" v-for="item in items">
                  <!--
                  <div class="c-search__result-card">
                    <p class="u-text-white">{{item.title}}</p>
                    <ul>
                      <li class="u-text-light" v-for="el in item.genres">
                        {{ el }}<span>, </span>
                      </li>
                    </ul>
                    <p class="u-text-white u-mt-16">{{ item.vote_average }}/10</p>
                  </div>
                  -->
                  <MovieCard :id="item.id" :title="item.title" :note="item.vote_average" :note_count="item.vote_count" :poster="item.poster_path"/>
                </template>
                <template v-else>
                  <p class="u-text-white">Aucun résultat</p>
                </template>
              </div>
              <div class="u-mt-32" v-if="!isLastPage">
                <Cta label="Voir plus de films" type="plain" size="md" @click="refineNext"/>
              </div>
            </template>
          </AisInfiniteHits>

          <!--
          <AisHitsPerPage
              :items="[
                { label: '12 hits per page', value: 12, default: true },
                { label: '24 hits per page', value: 24 },
                { label: '48 hits per page', value: 48 },
              ]"
          >
            <template v-slot="{ items, refine }">
              <ul>
                <li v-for="item in items" :key="item.value">
                  <button
                      :style="{ fontWeight: item.isRefined ? 'bold' : '' }"
                      @click="refine(item.value)"
                  >
                    {{ item.label }}
                  </button>
                </li>
              </ul>
            </template>
          </AisHitsPerPage>
          -->

          <!--
          <AisPagination class="c-search__pagination">
            <template v-slot="{ currentRefinement, nbPages, pages, isFirstPage, isLastPage, refine, createURL }">
              <ul class="u-text-white">
                <li v-if="!isFirstPage">
                  <a :href="createURL(0)" @click.prevent="refine(0)">
                    ‹‹
                  </a>
                </li>
                <li v-if="!isFirstPage">
                  <a
                      :href="createURL(currentRefinement - 1)"
                      @click.prevent="refine(currentRefinement - 1)"
                  >
                    ‹
                  </a>
                </li>
                <li v-for="page in pages" :key="page">
                  <a
                      :href="createURL(page)"
                      :style="{ fontWeight: page === currentRefinement ? 'bold' : '' }"
                      @click.prevent="refine(page)"
                  >
                    {{ page + 1 }}
                  </a>
                </li>
                <li v-if="!isLastPage">
                  <a
                      :href="createURL(currentRefinement + 1)"
                      @click.prevent="refine(currentRefinement + 1)"
                  >
                    ›
                  </a>
                </li>
                <li v-if="!isLastPage">
                  <a :href="createURL(nbPages)" @click.prevent="refine(nbPages)">
                    ››
                  </a>
                </li>
              </ul>
            </template>
          </AisPagination>
          -->
        </div>
      </div>
    </AisInstantSearch>
  </div>
</template>

<script setup lang="ts">
import { AisInstantSearch, AisSearchBox, AisConfigure, AisInfiniteHits } from 'vue-instantsearch/vue3/es';
import Cta from "../components/Cta.vue";
import { algoliasearch } from "algoliasearch";
import {useFetch} from "../composables/fetch.ts";
import MovieCard from "../components/MovieCard.vue";
import {ref} from "vue";

const { data: genres } = useFetch(`${import.meta.env.VITE_TMBD_URL}/genre/movie/list?language=fr`)

const getGenres = (genres: any, id: number) => {
  if (genres) {
    return genres.genres.find((el: { id: number | any }) => el.id.toString() === id).name
  }
}

const facet_open = ref(false)

const searchClient = {
  ...algoliasearch(import.meta.env.VITE_ALGOLIA_APP, import.meta.env.VITE_ALGOLIA_API),
  //search(requests: never[]) {
  //  if (requests.every(({ params }: { params: { query?: string } }) => !params.query)) {
  //    return Promise.resolve({
  //      results: requests.map(() => ({
  //        hits: [],
  //        nbHits: 0,
  //        nbPages: 0,
  //        page: 0,
  //        processingTimeMS: 0,
  //        hitsPerPage: 0,
  //        exhaustiveNbHits: false,
  //        query: '',
  //        params: '',
  //      })),
  //    });
  //  }
  //  return algoliasearch('4JZM1RK86D', 'dc580b87b8cab44f44bc47cf3c442d91').search(requests);
  //},
};

</script>