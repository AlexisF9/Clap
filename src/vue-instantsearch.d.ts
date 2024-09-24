/* eslint-disable */

declare module 'vue-instantsearch/vue3/es' {
  // @ts-ignore
  import Vue from 'vue';
  import { InstantSearch, InstantSearchOptions } from 'instantsearch.js/es/types/instantsearch';
  import { SearchClient } from 'instantsearch.js/es/types/algoliasearch';
  // eslint-disable-next-line @typescript-eslint/ban-type
  export class AisConfigure extends Vue {
    hitsPerPage?: number;
    attributesToReceive?: string[];
    attributesToHighlight?: string[];
    attributesToSnippet?: string[];
    queryLanguages?: string[];
    restrictSearchableAttributes?: string[];
    snippetEllipsisText?: string;
    analytics?: boolean;
  }

  export class AisHits extends Vue {
    escapeHTML?: boolean;
    transformItems?: ItemsTransformer;
  }

  export class AisHitsPerPage extends Vue {
    items?: SearchItem[];
    transformItems?: ItemsTransformer;
  }

  export class AisInstantSearch extends Vue {
    searchClient: SearchClient;
    // eslint-disable-next-line @typescript-eslint/ban-types
    insightsClient?: Function;
    indexName: string;
    routing?: {
      router?: unknown;
      stateMapping?: unknown;
    };

    stalledSearchDelay?: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    searchFunction?: Function;
    initialUiState?: object;
  }

  export class AisPagination extends Vue {
    padding?: number;
    totalPages?: number;
    showFirst?: boolean;
    showLast?: boolean;
    showNext?: boolean;
    showPrevious?: boolean;
  }

  export class AisRefinementList extends Vue {
    attribute: string;
    searchable?: boolean;
    searchablePlaceholder?: string;
    operator?: 'and' | 'or';
    limit?: number;
    showMoreLimit?: number;
    showMore?: boolean;
    sortBy?: Sorter;
    transformItems?: ItemsTransformer;
  }

  export class AisSearchBox extends Vue {
    placeholder?: string;
    autofocus?: boolean;
    showLoadingIndicator?: boolean;
    submitTitle?: string;
    resetTitle?: string;
    value?: string;
  }

  export type VueClass<V> = {
    new (...args: any[]): V & Vue;
  } & typeof Vue;

  export type ExtendedInstantSearch = {
    findResultsState: (props: { component: Vue; renderToString: (app: Vue) => Promise<unknown> }) => Promise<unknown>;
    getState: () => unknown;
    hydrate: (results: unknown) => ExtendedInstantSearch;
  } & InstantSearch;

  export type InstantSearchMixin = {
    instantsearch: ExtendedInstantSearch;
  } & typeof Vue;
}
