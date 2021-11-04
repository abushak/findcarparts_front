<script context="module">
	import { addFormatter, config, registerSvelecte } from 'svelecte/component.js';
  import Svelecte from "svelecte";
	// registerSvelecte('el-svelecte');

  
	let payload = null;

	function onSubmit(e) {
	const object = {};
	const formData = new FormData(e.target);
	const el = document.createElement('el-svelecte');

	formData.forEach((value, key) => {
		if (object[key]) {
		object[key] += ', ' + value;
		return;
		}
		object[key] = value
	});
	payload = JSON.stringify(object, null, 2);
	}



	export const prerender = true;
</script>


<script>
  //import { gql } from "@apollo/client/core/core.cjs.js";
  // /home/rubuc/web/apps/svelte-kit-intro/node_modules/svelecte/src/Svelecte.svelte
  //import Svelecte from '../../../node_modules/svelecte/src/Svelecte.svelte';
  
  //import { Svelecte } from 'svelecte';
  //import Select from 'svelte-select';
  
  import { client } from '$lib/graphql-client';
 // import { getClient } from "svelte-apollo";
  // import { get } from 'svelte/store';
  import { appStore, Make, Model, Year, Engine, vehicle } from '$lib/store';
  import { MODELS,YEARS, ENGINES} from "$lib/queries";
  import makes from '../data/makes.js';

  import dataset from '../data/makes.js';

  //import { query } from "svelte-apollo";
  
  //import { config, registerSvelecte } from 'svelecte/component';
  //const { registerSvelecte, addFormatter, config } = window.Svelecte;
  //import { addFormatter, config, registerSvelecte } from '../../../node_modules/svelecte/component.js';
  


  const models = client.query(MODELS, { variables: { makeId: "" } });
  const years = client.query(YEARS, { variables: { makeId: "", modelId: "" } });
  const engines = client.query(ENGINES, { variables: { makeId: "", modelId: "", yearId: "" } });

  // $: vehicle.make.id = vehicle.make.id || -1;
  // $: vehicle.model.id = vehicle.model.id || -1;
  // $: vehicle.year.id = vehicle.year.id || -1;
  // $: vehicle.engine.id = vehicle.engine.id || -1;

  // bind:selectedIndex={$vehicle.make.id}
  // bind:selectedIndex={$vehicle.model.id}
  // bind:selectedIndex={$vehicle.year.id}
  // bind:selectedIndex={$vehicle.engine.id}

  // $: models .refetch({ makeId: "" });
  // $: years .refetch({ makeId: "", modelId: "" } );


  export function getModels () {
    let makeId = localStorage.getItem("Make");
    
    models.refetch({ makeId }) 

  }



   export function makeSelected(item) {
    
    let makeId = localStorage.getItem("Make");

    
    models.refetch({ makeId }) 
        .then(res => {
         if (res.data && res.data.uvdb.search_uvdb_models.items) {
           let items = res.data.uvdb.search_uvdb_models.items;
           let mls = [];
           for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
           carModels.set(mls);
         }
       })
       .catch(err => console.error(`error loading models: ${err}`)
     );
    //  carYears.set([]);
    //  carEngines.set([]);
   }


    function modelRefetch(item) {
      
      models.refetch( {Make} )
        .then(res => {
          if (res.data && res.data.uvdb.search_uvdb_models.items) {
            let items = res.data.uvdb.search_uvdb_models.items;
            let mls = [];
            for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
            carModels.set(mls);
          }
        })
        .catch(err => console.error(`error loading models: ${err}`)
      );
      carYears.set([]);
      carEngines.set([]);
    }



   function modelSelected(item) {
      vehicle.model = item.detail.selectedItem;
      years.refetch({ makeId: vehicle.make.id, modelId: vehicle.model.id })
        .then(res => {
          if (res.data && res.data.uvdb.search_uvdb_years.items) {
            let items = res.data.uvdb.search_uvdb_years.items;
            let mls = [];
            for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
            carYears.set(mls);
          }
        })
        .catch(err => console.error(`error loading years: ${err}`)
     );
      carEngines.set([]);
    }

  function yearSelected(item) {
    vehicle.year = item.detail.selectedItem;
    engines.refetch({ makeId: vehicle.make.id, modelId: vehicle.model.id, yearId: vehicle.year.id })
        .then(res => {
          if (res.data && res.data.uvdb.search_uvdb_vehicle_definitions.items) {
            let items = res.data.uvdb.search_uvdb_vehicle_definitions.items;
            let mls = [];
            for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
            carEngines.set(mls);
          }
        })
        .catch(err => console.error(`error loading engines: ${err}`)
      );
   }


</script>


<!-- 
<form action="" on:submit|preventDefault={onSubmit}>
  <el-svelecte
    name="parent_value" placeholder="Select parent value"
    searchable=True
    clearable=True
    options={`[{"value":"posts","text":"Posts"},{"value":"users","text":"Users"},{"value":"comments","text":"Comments"}]`}
    id="is-parent" required>
  </el-svelecte>
  <el-svelecte name="child_value" parent="is-parent" required placeholder="Pick from child select"
    searchable=True
    clearable=True
    fetch="https://jsonplaceholder.typicode.com/[parent]">
  </el-svelecte>

  {#if payload}
    <pre>{payload}</pre>
  {/if}
</form> -->


<div class="attrib-basic">

    <form action="" on:submit|preventDefault={onSubmit} class="basic-attrib sm:flex-none md:flex justify-center">
      <div class="flex-1 car-attrib">
        <Svelecte bind:value={$Make}
          name="parent_value" placeholder="make"
          options={makes}
          searchable=True
          clearable=True
          fetchCallback={ makeSelected }
          id="is-parent" required>

        </Svelecte>
      </div>
      <div class="flex-1 car-attrib">
        <Svelecte 
          name="child_value" parent="is-parent"
          required placeholder="model"
         
          valueAsObject
          
          searchable=True
          clearable=True
          >
          
        </Svelecte>
      </div>
      <div class="flex-1 car-attrib">  
        <Svelecte 
          name="child_value" parent="is-parent"
          required placeholder="year"
          options={makes}
          searchable=True
          clearable=True
          >
        </Svelecte>
      </div>
      <div class="flex-1 car-attrib ">
        <Svelecte bind:value={$Make}
          name="parent_value" placeholder="submodels"
          options={makes}
          searchable=True
          clearable=True
          
          id="is-parent" required>
        </Svelecte>
      </div> 
      {#if payload}
      <pre>{payload}</pre>
    {/if}
  </form>
</div>
<div class="attrib-specify">
  <div class="attrib-details">
    <label clss="q-ty varning">we found <span>165 car instances</span>, you can choose more car attributes to reduce this number</label>
    <form action="" on:submit|preventDefault={onSubmit} class="engine-submodel-body sm:flex-none md:flex justify-center">
        <div class="flex-1 car-attrib">
          <Svelecte 
            name="parent_value" placeholder="engine"
            options={makes}
            searchable=True
            clearable=True
            fetchCallback
            id="is-parent" required>
          </Svelecte>
        </div>
        <div class="flex-1 car-attrib">
          <Svelecte 
            name="parent_value" placeholder="body type"
            options={makes}
            searchable=True
            clearable=True
            fetchCallback
            id="is-parent" required>
          </Svelecte>
        </div>
      
        <div class="flex-1 car-attrib">
          <Svelecte 
            name="parent_value" placeholder="fuel type"
            options={makes}
            searchable=True
            clearable=True
            fetchCallback
            id="is-parent" required>
          </Svelecte>
        </div>
        <div class="flex-1 car-attrib">
          <Svelecte
            name="parent_value" placeholder="drive type "
            options={makes}
            searchable=True
            clearable=True
            fetchCallback 
            id="is-parent" required>
    
          </Svelecte>
        </div>
    
    
      {#if payload}
      <pre>{payload}</pre>
    {/if}

    </form>

       
    
    </div>
    

  

</div>


  <div class="show-car-inst z-30">
       
    <button class="btn btn-success btn-md md:btn-md lg:btn-md xl:btn-md show-car">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>show 165 cars
    </button> 

  </div>
