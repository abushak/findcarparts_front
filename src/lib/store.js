import { get, readable, writable, derived } from 'svelte/store';
//import { query } from 'svelte-apollo';
//import { BRAND_TYPES } from './queries';
//import makes from './data/makes';
import categories from './data/categories';
import subcategories from './data/subcategories';
import { browser } from '$app/env';
import makes from './data/makes';


export const appStore = writable({
  search: false,
  advancedSearch : false,
  token: {}
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

// export const carMakes = (makes);

// const storedMakes = JSON.parse(browser && localStorage.getItem("carMakes");
// export const carMakes = writable(browser && carMakes);
// makes.subscribe(
//   (val) => browser && (localStorage.makes = JSON.stringify(val))
// );

// export const carMakes = JSON.parse(browser && localStorage.getItem(makes))
// export const makes = writable(browser && carMakes);
//  carMakes.subscribe((val) => browser && (localStorage.makes = JSON.stringify(val)));

  
const modelsByMakeId = {};
let loaded = false;


export const getModelsByMakeId = async (makeId) => {
	if (modelsByMakeId[makeId]) return modelsByMakeId[makeId];

	try {
		const url = `https://api.findcar.parts/api/rest/make/${makeId}/models`;
		const res = await fetch(url);
		const data = await res.json();
		// const modelsByMakeIdloaded = data.uvdb.search_uvdb_models.items.map((data) => ({
		//  	name: data.name,
		//  	id: data.id,
		//  }));
        
          
        //   let items = JSON.stringify(data.uvdb.search_uvdb_models.items,null,0);
          let items = data.uvdb.search_uvdb_models.items;
          let mls = [];
          for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
              

        

        // const modelsJSON = JSON.stringify(modelsByMakeIdloaded);
		modelsByMakeId[makeId] = items;
        // modelsByMakeId[id] = modelsByMakeIdloaded;
		return items;

  
 
		
	} catch (err) {
		console.error(err);
		return null;
	}
};


const yearsByMakeModel = {};


	
export const Model = writable(
  browser && (localStorage.getItem("Model"))
  );
  Model.subscribe((val) => browser && localStorage.setItem("Model", val));


export const getYearsByMakeModel = async (makeId, modelId) => {
 	if (yearsByMakeModel[makeId,modelId]) return yearsByMakeModel[makeId,modelId];

 	try {
 		const url = `https://api.findcar.parts/api/rest/make/${makeId}/models/${modelId}`;
 		const res = await fetch(url);
 		const data = await res.json();
 		// const modelsByMakeIdloaded = data.uvdb.search_uvdb_models.items.map((data) => ({
 		//  	name: data.name,
 		//  	id: data.id,
 		//  }));
        
          
         //   let items = JSON.stringify(data.uvdb.search_uvdb_models.items,null,0);
           let items = data.uvdb.search_uvdb_years.items;
           let mls = [];
           for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
              

        

         // const modelsJSON = JSON.stringify(modelsByMakeIdloaded);
 		yearsByMakeModel[makeId,modelId] = items;
         // modelsByMakeId[id] = modelsByMakeIdloaded;
 		return items;
		
     Model.set(yearsByMakeModel);
     loaded = true;


 	} catch (err) {
 		console.error(err);
 		return null;
 	}
};

// export const vechileDeteails = JSON.parse(browser && localStorage.getItem("vechile")) || {
// 	Make: [makes],
//  	Model: [],
//  	Year: [],
//  	Engine: [],
//  	Submodel: [],
//  	Bodytype: [],
//  	Category: [categories],
//  	Subcategory: [subcategories],
//  	Parttype: [],
//    };

//  const vechile = writable(browser && vechile);
//  vechile.subscribe (
//  	(val) => browser && (localStorage.vechile = JSON.stringify(val))
//  );	

export const vehicle = writable({
  make: undefined,
  model: undefined,
  year: undefined,
  engine: undefined,
  category: undefined,
  subcategory: undefined
});




export const Make = writable(
	browser && (localStorage.getItem("Make"))
  );
  Make.subscribe((val) => browser && (localStorage.Make = val));






 export const Year = writable(
 	browser && (localStorage.getItem("Year"))
   );
   Year.subscribe((val) => browser && (localStorage.Year = val));
  



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
