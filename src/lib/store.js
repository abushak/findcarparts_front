import { get, readable, writable } from 'svelte/store';
import { query } from 'svelte-apollo';
import { BRAND_TYPES } from './queries';
import makes from './data/makes';
import categories from './data/categories';
import subcategories from './data/subcategories';
import { getClient } from 'svelte-apollo';


export const appStore = writable({
  search: false,
  advancedSearch : false,
  token: {}
});

export const carAttributes = writable({
  make: undefined,
  model: undefined,
  year: undefined,
  engine: undefined
});

export const searchParams = writable({
  searchId: 0,
  offset: 0,
  limit: 10,
  priceSort: null,
  topRatedSeller: false,
  buyItNow: false,
  locatedInUSAOnly: false,
  nearMe: false,
  minPrice: null,
  maxPrice: null,
  conditions: null
});

export const apiSearchParams = writable({
  brandTypes: [],
  freeShipping: false
});

export const appSearchAnswer = writable({
  total: 0,
  totalWithoutFilters: 0,
  minPrice: null,
  maxPrice: null,
  countUsed: null,
  countNew: null,
  countNewOther: null
});

export const appFilteredProducts = writable({
  filtered_products: []
});

export const appFilter = writable({
  filter: {
      condition     : ['all'],
      filterValPrice : 'min first',
      manufacturers : ['all'],
      priceFilter   : {
        min_price : 0,
        max_price : 0,
      },
      location: {},
  }
});

export const searchAttr = writable(undefined);
export const searchVin = writable(undefined);

export const refetchInProgress = writable(false);
export const searchInProgress = writable(false);
export const searchVinInProgress = writable(false);
export const noProductsFound = writable(false);
export const errorOccurred = writable(false);

export const doPolling = writable(false);
export const pollerRandom = writable(0);
export const firstResultsAvailable = writable(false);

export const carMakes = writable(makes);
export const carModels = writable([]);
export const carYears = writable([]);
export const carEngines = writable([]);
export const carCategories = writable(categories);
export const carSubcategories = writable(subcategories);

export const vehicle = writable({
  make: undefined,
  model: undefined,
  year: undefined,
  engine: undefined,
  category: undefined,
  subcategory: undefined
});

export const filtersConfiguration = readable(
  { brandTypes: null },
  function start(set) {
    if (get(filtersConfiguration).brandTypes === null) {
      const brandTypes = query(BRAND_TYPES);
      brandTypes.result().then(res => {
        set({ brandTypes: res.data.ebay_brandtype });
        const activeByDefault = res.data.ebay_brandtype.filter(item => item.active_default).map(item => item.id);
        apiSearchParams.set({ brandTypes: activeByDefault })
      }).catch((err) => {
        console.error(err);
        set({ brandTypes: [] });
        apiSearchParams.set({ brandTypes: [] })
      });
    }
    return function stop() { };
  }
);

function createSearchHistory() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    useLocalStorage: () => {
      const searchHistory = localStorage.getItem("searchHistory");
      if (searchHistory) set(JSON.parse(searchHistory));
    },
    add: (item) => update(historyItems => {
      if (item && item.trim() !== "") {
        if (historyItems.indexOf(item) < 0) {
          historyItems.unshift(item);
        } else {
          historyItems.splice(historyItems.indexOf(item), 1);
          historyItems.unshift(item);
        }
        historyItems.splice(20);
        localStorage.setItem("searchHistory", JSON.stringify(historyItems));
      }
      return historyItems;
    }),
    reset: () => {
      set([]);
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }
  };
}

export const searchHistory = createSearchHistory();
