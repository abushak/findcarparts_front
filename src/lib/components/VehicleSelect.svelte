
<script context="module">
  import Svelecte from "svelecte";
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
  // export async function load({ params }) {
    // 	return await this.get(`.api/${params.makeId}.json`);
    // }


  function resetPayload(e) {
    payload = null;
  } 

  export const prerender = true;
</script>



<script>
 	import makes from '$lib/data/makes.js';
	import {Make, Model, Year } from '$lib/store';


	/**
	 * NOTE: I am comparing store values to text 'null', because you store it in localStorage.
	 * That should be fixed in $lib/store.js in your export function
	 * 
	 * I am using real API endpoints I found in your code to be able to test it properly.
	 * */ 

	$: model_fetchUrl = $Make && $Make !== 'null'
		? `https://api.findcar.parts/api/rest/make/${$Make}/models`
		: null;
	$: year_fetchUrl = $Model && $Model !== 'null'
		? `https://api.findcar.parts/api/rest/make/${$Make}/models/${$Model}`
		: null;


	/**
	 * Resolve 'items' property from response correctly
	 * @param resp
	 */
	function onFetch(resp) {
 
		if (resp.uvdb.search_uvdb_models) 
			return resp.uvdb.search_uvdb_models.items;
		if (resp.uvdb.search_uvdb_years) 
			return resp.uvdb.search_uvdb_years.items;
	};

</script>



  


<div class="attrib-basic">
 
  <form action="" on:submit|preventDefault={onSubmit} class="basic-attrib sm:flex-none md:flex justify-between">
    <div class="car-attrib flex-1">
      <Svelecte bind:value={$Make}
      disableHighlight
      name="make" placeholder="make"
      disable-sifter
      clearable
      options={makes}
      
      on:blur={resetPayload}
      >
      </Svelecte>
    </div>
    <div class="car-attrib flex-1">
      <Svelecte bind:value={$Model}
        disabled={!model_fetchUrl}
        name="model"
        disableHighlight
        required placeholder="model"
        clearable
        disable-highlight
        id="model"
        fetch={model_fetchUrl}
        fetchCallback={onFetch}
        
      ></Svelecte>
    </div>
    <div class="car-attrib flex-1">  
      <Svelecte bind:value={$Year}
      disabled={!year_fetchUrl}
      name="year"
      disableHighlight
      required placeholder="year"
      clearable
      id="year"
      fetch={year_fetchUrl}
      fetchCallback={onFetch}
     
      >
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
        <div class="flex-1 car-attrib ">
          <Svelecte 
          name="parent_value" placeholder="submodels"
          searchable=True
          clearable=True
          id="is-parent" required>
          </Svelecte>
        </div>
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
