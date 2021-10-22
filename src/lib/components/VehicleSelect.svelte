<script>
  import { gql } from "@apollo/client/core/core.cjs.js";
  // /home/rubuc/web/apps/svelte-kit-intro/node_modules/svelecte/src/Svelecte.svelte
  //import Svelecte from '../../../node_modules/svelecte/src/Svelecte.svelte';
  //import { Svelecte, config, registerSvelecte } from 'svelecte';
  import { client } from '$lib/graphql-client';
 // import { getClient } from "svelte-apollo";
  // import { get } from 'svelte/store';
  import { appStore, Make, Model, Year, Engine, vehicle } from '$lib/store';
  import { MODELS,YEARS, ENGINES} from "$lib/queries";
  import makes from '../data/makes';
  //import { query } from "svelte-apollo";
  
  import { config, registerSvelecte } from 'svelecte/component';
  //const { registerSvelecte, addFormatter, config } = window.Svelecte;
  //import { config, registerSvelecte } from '../../../node_modules/svelecte/component.js';
  
  import {onMount} from 'svelte';
  import { ValidationMessage as ValidationMessageSSR } from '@felte/reporter-svelte';
  //import { config, registerSvelecte } from 'svelect/component.js';

  let ValidationMessage
  // let makes;
  // // let models;
  // let years;
  // let engines;
  
  
  onMount(async () => {
      ValidationMessage = ValidationMessageSSR
})
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


  function getModels () {
    const models = client.query(MODELS, {
      variables: { makeId: "" }
    });
  }



   export function makeSelected(item) {
    //vehicle.make = item.detail.selectedItem;
    let makeId = localStorage.getItem("Make");
    
    models.refetch({ makeId }) 
        .then(res => {
          if (res.data && res.data.uvdb.search_uvdb_models.items) {
            let items = res.data.uvdb.search_uvdb_models.items;
            let mls = [];
            for (let i=items.length-1; i>=0; i--) mls[i] = { id: items[i].id, text: items[i].name };
            // carModels.set(mls);
          }
        })
      //   .catch(err => console.error(`error loading models: ${err}`)
      // );
      // carYears.set([]);
      // carEngines.set([]);
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


  let payload = null;
  config.clearable = true;
  
    registerSvelecte('el-svelecte');
    

 


  function onSubmit(e) {
    
   
    const object = {};
    const el = document.createElement('el-svelecte');
   
    const formData = new FormData(e.target);
    formData.forEach((value, key) => {
      if (object[key]) {
        object[key] += ', ' + value;
        return;
      }
      object[key] = value
    });
    payload = JSON.stringify(object, null, 2);
  }


</script>

<!-- 
<form action="" on:submit|preventDefault={onSubmit}>
  <Svelecte bind:value={$Make}
    name="parent_value" placeholder="Select parent value"
    options={makes}
    searchable=True
    clearable=True
    
    id="is-parent" required>

  </Svelecte> 
  <Svelecte 
    name="child_value" parent="is-parent"
    required placeholder="Pick from child select"
    searchable=True
    clearable=True
    options={makes}
    fetch={ makeSelected }>
    
  </Svelecte>
</form> -->


<form action="" on:submit|preventDefault={onSubmit}>
  <el-svelecte
    name="parent_value" placeholder="Select parent value"
    options={`[{"value":"posts","text":"Posts"},{"value":"users","text":"Users"},{"value":"comments","text":"Comments"}]`}
    id="is-parent" required>
  </el-svelecte>
  <el-svelecte name="child_value" parent="is-parent" required placeholder="Pick from child select"
    fetch="https://jsonplaceholder.typicode.com/[parent]">
  </el-svelecte>
  <!-- server-side rendered -->
  <div>Server-side rendered inner select:</div>
  <el-svelecte options={`[{"id":"posts","label":"Posts", "prop": "Posts"},{"id":"users","label":"Users", "prop": "Users"},{"id":"comments","label":"Comments", "prop": "Comment"}]`}
    style="margin-bottom: 0"
    lazy-dropdown="false"
  >
    <select id="anchored" name="demo" multiple on:change={e => console.log(e.target.selectedOptions)}></select>
  </el-svelecte>
  <small>This <code>&lt;el-svelecte&gt;</code> has nested (anchored) <code>&lt;select&gt;</code>, when you <em>need</em> to have it rendered server-side. This setup is specific, 
    because inner select needs to have <code>name</code> and <code>required</code> (if applicable) properties specified manually. (They are not inherited from el-svelecte parent)</small>
  <div class="mt-2">
    <button type="submit" class="btn btn-success">Send form</button>
  </div>
  {#if payload}
    <pre>{payload}</pre>
  {/if}
</form>