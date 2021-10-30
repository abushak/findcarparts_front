<script context='module'>
   import VehicleSelect from '$lib/components/VehicleSelect.svelte';
	 export const prerender = true;
</script>

<script>
   
  import Features from '$lib/components/Features.svelte';
  import { appStore, searchHistory, vehicle } from '$lib/store';
 
  import { onMount } from 'svelte';
import Affiliates from '$lib/components/Affiliates.svelte';

  
  
  </script>
  
  <main class="main">
  
    <div class="tabs-one justify-center z-0">
      <div class="tab-2">
        <label for="tab2-1">Vechile</label>
        <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
        <div class="attrib-sellect-row" >
          <VehicleSelect />
        </div>
      </div>
      <div class="tab-2">
        <label for="tab2-2">Parts#</label>
        <input id="tab2-2" name="tabs-two" type="radio">
        <div class="vin-sellect-row">
        search by Vin#
        </div>
      </div>
      <div class="tab-2">
         
        <label for="tab2-3">Vin#</label>
        <input id="tab2-3" name="tabs-two" type="radio">
        <div class="vin-sellect-row">
        search by Parts#
        </div>
      </div>
      <div class="features flex-none  pt-100 justify-center">
        <Features />
      </div>
    </div>
    
    
    
 
    <div class="affiliates flex  pt-100 justify-center">
      <Affiliates />
    </div>
       


  
  </main>
  
  