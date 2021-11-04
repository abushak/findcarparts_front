<script context='module'>
   import VehicleSelect from '$lib/components/VehicleSelect.svelte';

   
  // onMount(async () => {
  //   const module = await import('@beyonk/svelte-carousel');
  //   Carousel = module.default;
  // });

	 export const prerender = true;

  


</script>

<script>
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
  import PartsNumb from '$lib/components/PartsNumb.svelte';
  import VinSearch from '$lib/components/VinSearch.svelte';
  import Features from '$lib/components/Features.svelte';
  import { appStore, searchHistory, vehicle } from '$lib/store';
 
  import { onMount } from 'svelte';
//import Affiliates from '$lib/components/Affiliates.svelte';
import Carousel from '@beyonk/svelte-carousel'
  let carousel;

  function enter() {
    carousel.pause();
  }

  function leave() {
    carousel.resume();
  }
  const handleNextClick = () => {
    carousel.goToNext()
  }


  </script>
  
  <main class="main">
  
    <div class="tabs-one justify-center z-0">
      <div class="tab-1">
        <label for="tab2-1">Vechile</label>
        <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
        <div class="attrib-sellect-row" >
          <VehicleSelect />
        </div>
      </div>
      <div class="tab-2">
        <label for="tab2-2">Parts#</label>
        <input id="tab2-2" name="tabs-two" type="radio">
        <div class="parts-sellect-row flex flex-col justify-center">
          <PartsNumb />
         
          <div class="parts-search flex w-full">
                <div class="insurify-aff-link"> 
                    <a href="https://mwg.aaa.com/lp/insurance/auto/affiliate?cmp=BAC_Auto_CJ_Affiliate" class="af-link"><img src="/assets/images/auto_insurance.jpg" alt="insurify aff link"/></a>
                </div>
                <div class="goodyear-aff-link"> 
                    <a href="https://www.goodyear.com/" class="af-link"><img src="/assets/images/goodyear.jpg" alt="insurify aff link"/></a>
                </div>
          </div> 
        </div>
    
      </div>
      <div class="tab-3">
         
        <label for="tab2-3">Vin#</label>
        <input id="tab2-3" name="tabs-two" type="radio">
        <div class="vin-sellect-row flex justify-center">
          <VinSearch />
        </div>
      </div> 
        <div class="features flex-none pt-100 justify-center">
          <Features />
        </div>
      </div>
    
<!--     
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
      
        <TabPanel>
          <h2>Panel One</h2>
        </TabPanel>
      
        <TabPanel>
          <h2>Panel Two</h2>
        </TabPanel>
      
        <TabPanel>
          <h2>Panel Three</h2>
        </TabPanel>
      </Tabs> -->
    
    
    <div class="affiliates">

      <div class="flex flex-col w-full">
 
        <div class="divider"><h2 class="divider">featured products</h2></div> 
       <div class="aff-desktop flex">
            <div class="affiliates-desktop flex-1">
              <a href="https://insurify.com/partners/insurify/" class="af-link"><img src="/assets/images/insurify.jpg" alt="insurify aff link"/></a>
            </div>
            <div class="affiliates-desktop flex-1">
              <a href="https://www.goodyear.com/" class="af-link"><img src="/assets/images/goodyear_1.jpg" alt="insurify aff link"/></a>
            </div>
            <div class="affiliates-desktop flex-1">
              <a href="https://www.carid.com/tsw-wheels/" class="af-link"><img src="/assets/images/disc.jpg" alt="insurify aff link"/></a>
            </div>
            
       </div>
        <!-- 1280: 6,1024: 4, 768: 3, 640: 1 -->
        <!-- <svelte:component this={Carousel} > -->

      <div class="aff-mob flex">  
          <Carousel bind:this={carousel} on:mouseenter={enter} on:mouseleave={leave} perPage={{ 320: 1 }}>
            <span class="control" slot="left-control">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <div class="slide-content  ">
              <a href="https://insurify.com/partners/insurify/" class="af-link flex justify-center"><img src="/assets/images/insurify.jpg" alt="insurify aff link"/></a>
            </div>
            <div class="slide-content ">
              <a href="https://www.goodyear.com/" class="af-link flex justify-center "><img src="/assets/images/goodyear_1.jpg" alt="insurify aff link"/></a>
            </div>
            <div class="slide-content ">
              <a href="https://www.carid.com/tsw-wheels/" class="af-link flex justify-center "><img src="/assets/images/disc.jpg" alt="insurify aff link"/></a>
            </div>
     
      
            <span class="control" slot="right-control">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Carousel>
      </div>
        <!-- </svelte:component> -->
      </div>
    </div>

 
 
       


  
  </main>
  
  