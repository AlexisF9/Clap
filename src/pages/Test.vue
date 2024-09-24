<template>
  <div class="o-container">
    <AisInstantSearch :search-client="searchClient" index-name="movies">
      <AisConfigure :hits-per-page.camel="3"></AisConfigure>

      <AisSearchBox>
        <template #default="{ refine }">
          <input
              id="field_id"
              class="c-search-test__search-field"
              type="text"
              name="field_id"
              placeholder="Rechercher le nom"
              autocomplete="off"
              @input="refine(($event.currentTarget as HTMLInputElement)?.value)"
          />
        </template>
      </AisSearchBox>

      <div class="c-search-test__content">
        <AisRefinementList class="c-search-test__facets u-text-white" attribute="genres" searchable>
          <template v-slot="{ items, refine, searchForItems }">
            <AisSearchBox>
              <template v-slot>
                <input class="u-mb-16 c-search-test__facet-field" @input="searchForItems(($event.currentTarget as HTMLInputElement).value)">
              </template>
            </AisSearchBox>
            <template v-if="items.length">
              <ul class="c-search-test__facet-list">
                <li v-for="(item, index) in items" :key="item.value">
                  <input
                      :id="`facet-genres-${index}`"
                      type="checkbox"
                      :name="`facet-genres-${index}`"
                      :checked="item.isRefined"
                      @input.prevent="refine(item.value)"
                  />
                  <label :for="`facet-genres-${index}`" class="c-field__label">
                    {{ item.label }}
                    <span>({{ item.count }})</span>
                  </label>
                </li>
              </ul>
            </template>
            <template v-else>Aucun résultat.</template>
          </template>
        </AisRefinementList>

        <div>
          <AisHits class="c-search-test__result-cards">
            <template v-slot="{ items }">
              <template v-if="items.length" v-for="item in items">
                <div class="c-search-test__result-card u-mb-24">
                  <p class="u-text-white">{{item.title}}</p>
                  <ul>
                    <li class="u-text-light" v-for="el in item.genres">
                      {{ el }}
                    </li>
                  </ul>
                </div>
              </template>
              <template v-else>
                <p class="u-text-white">Aucun résultat</p>
              </template>
            </template>
          </AisHits>
          <AisPagination class="c-search-test__pagination">
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
        </div>
      </div>
    </AisInstantSearch>
  </div>
</template>

<script setup lang="ts">
import { AisInstantSearch, AisSearchBox, AisConfigure, AisHits } from 'vue-instantsearch/vue3/es';
import { algoliasearch } from 'algoliasearch';

const searchClient = {
  ...algoliasearch(import.meta.env.VITE_ALGOLIA_APP, import.meta.env.VITE_ALGOLIA_API),
  search(requests: never[]) {
    if (requests.every(({ params }: { params: { query?: string } }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }

    return algoliasearch('4JZM1RK86D', 'dc580b87b8cab44f44bc47cf3c442d91').search(requests);
  },
};
</script>


<style lang="scss">
.c-search-test__search-field {
  border: 0;
  background-color: #fff;
  padding: 1rem 1.5rem;
  max-width: 50rem;
  width: 100%;
  display: flex;
  margin: 0 auto 3.2rem auto;
  border-radius: var(--radius-full);
}

.c-search-test__content {
  grid-template-columns: 20rem 2fr;
  gap: 3.2rem;
  display: none;

  &:has(.c-search-test__result-card) {
    display: grid;
  }
}

.c-search-test__facets {
  background-color: var(--color-neutral-2);
  padding: 2rem;
  border-radius: var(--radius-md);
  height: fit-content;
}

.c-search-test__facet-field {
  border: 0;
  background-color: #fff;
  border-radius: var(--radius-full);
  padding: .5rem 1.5rem;
  height: auto;
  width: 100%;
}

.c-search-test__facet-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    align-items: center;
    gap: .5rem;
  }
}

.c-search-test__result-cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  height: fit-content;
}

.c-search-test__result-card {
  background-color: var(--color-neutral-2);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.c-search-test__pagination {
  display: flex;
  width: 100%;
  margin-top: 3.2rem;

  &.ais-Pagination--noRefinement {
    display: none;
  }

  ul {
    display: flex;
    align-items: center;
    gap: .5rem
  }
}
</style>