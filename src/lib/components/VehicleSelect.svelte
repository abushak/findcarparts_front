<script>
  import { gql } from '@apollo/client/core/core.cjs.js';
 
  import { client } from '$lib/graphql-client';
 // import { getClient } from "svelte-apollo";
  // import { get } from 'svelte/store';
  import { appStore, carMakes, carModels, carYears, carEngines, vehicle } from '$lib/store';
  import { MODELS, YEARS, ENGINES } from "$lib/queries";
  import { Row, Column, ComboBox } from "carbon-components-svelte";
  //import { query } from "svelte-apollo";

 
  // let makes;
  // // let models;
  // let years;
  // let engines;
  
  

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

  function shouldFilterItem(item, value) {
    if (!value) return true;
    return item.text.toLowerCase().includes(value.toLowerCase());
  }


  function makeSelected(item) {
     vehicle.make = item.detail.selectedItem;
     models.refetch({ makeId: vehicle.make.id })
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

  function engineSelected(item) {
    vehicle.engine = item.detail.selectedItem;

  }

</script>

<Row class="attrib-sellect-row">
  <Column class="attrib-select"  sm={4} md={{ span:3, offset:1 }} lg={{ span:3, offset:2 }}>
    <ComboBox size="xl" placeholder="make" items={$carMakes} {shouldFilterItem} on:select={makeSelected} />
  </Column>
  <Column sm={4} md={{ span:3, offset:1 }} lg={{ span:3, offset:0 }}>
    <ComboBox size="xl" placeholder="model" items={$carModels} {shouldFilterItem} on:select={modelSelected} />
  </Column>
  <Column sm={4} md={{ span:3 }} lg={3}>
    <ComboBox size="xl" placeholder="year" items={$carYears} {shouldFilterItem} on:select={yearSelected} />
  </Column>
  <Column sm={4} md={{ span:3, offset:0 }} lg={{ span:3, offset:0 }}>
    <ComboBox size="xl" placeholder="engine" items={$carEngines} {shouldFilterItem} on:select={engineSelected} />
  </Column>
</Row>
