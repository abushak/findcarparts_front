import { gql } from '@apollo/client/core/core.cjs.js';

// -------------------------------------------------------------------------
export const BRAND_TYPES = gql`
  query BrandTypes {
    ebay_brandtype {
      id
      name
      active_default
    }
  }
`;
// -------------------------------------------------------------------------
export const MODELS = gql`
  query getModels($makeId: ID!) {
  	uvdb {
    	search_uvdb_models( uvdb_make_id: $makeId, limit: 500 ) {
      	items {
        	id
        	name
      	}
    	}
  	}
	}
`;
// -------------------------------------------------------------------------
export const YEARS = gql`
	query getYears($makeId: ID!, $modelId: ID!) {
	  uvdb {
	    search_uvdb_years( uvdb_make_id: $makeId, uvdb_model_id: $modelId, limit: 100 ) {
	      items {
	        id
	        name
	      }
	    }
	  }
	}
`;
// -------------------------------------------------------------------------
export const ENGINES = gql`
	query getEngineBase($makeId: ID!, $modelId: ID!, $yearId: Int!) {
	  uvdb {
	    search_uvdb_vehicle_definitions(
	      vehicle_instance: {
	        uvdb_make_id: $makeId
	        uvdb_model_id: $modelId
	        uvdb_year_id: $yearId
	      }
	      limit: 20 ){
	      items {
	        id
	        name
	        uvdb_models {
	          id
	          name
	        }
	        uvdb_engine_base {
	          id
	          name
	        }
	        description
	        uvdb_mfr_body_codes {
	          id
	          name
	        }
	      }
	    }
	  }
	}
`;
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
