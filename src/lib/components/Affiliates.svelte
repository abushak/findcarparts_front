<script>
  
  import { onMount } from 'svelte';

  let Carousel; // for saving Carousel component class
  let carousel; // for calling methods of the carousel instance
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  const handleNextClick = () => {
    carousel.goToNext()
  }
</script>



<svelte:component
  this={Carousel}
  bind:this={carousel}
>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</svelte:component>

<button on:click={handleNextClick}>Next</button>

<div class="flex flex-col w-full">
 
    <div class="divider"><h2 class="divider">featured products</h2></div> 

    <div class="featured-products flex">
       <div class="insurify-aff-link"> 
            <a href="https://insurify.com/partners/insurify/" class="af-link"><img src="/assets/images/insurify.jpg" alt="insurify aff link"/></a>
       </div>
       <div class="goodyear-aff-link"> 
            <a href="https://www.goodyear.com/" class="af-link"><img src="/assets/images/goodyear.jpg" alt="insurify aff link"/></a>
       </div>

    </div>    
    
</div>
