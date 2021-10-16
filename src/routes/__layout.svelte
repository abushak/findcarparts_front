<script>
	
	import '../app.css';
	// // svelte-apollo approach --> working
	// setContext(key,
	//   	client
	//  )
  
	// not working - why?
	
	import Headroom from "svelte-headroom";
	const onPin = () => console.log("pin");
	
  </script>


<Headroom on:pin={onPin} duration="350ms" offset={50} tolerance={5} >

	<div class="navbar">
		<div class="navbar-start">
			<div class="flex flex-col items-center drawer-content">
				<label for="my-drawer" class="btn btn-square btn-ghost">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
					
				 </label>
			</div> 
		</div> 
		<div class="navbar-center lg:flex">
		  <div class="flex items-stretch">
			<div class="logo"><a sveltekit:prefetch href="/"><img src="/assets/images/fincar.parts.png"
				alt="findcarpasrts-logo"/></a>
			</div>
		  </div>
		</div> 
		<div class="navbar-end">
		  <!-- <button class="btn btn-square btn-ghost">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">     
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>                     
			</svg>
		  </button>  -->
		  <button class="btn btn-square btn-ghost">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
			  </svg>	
		  </button>
		</div>
	  </div>

</Headroom>


  <div class="shadow bg-base-200 drawer h-52">
	<input id="my-drawer" type="checkbox" class="drawer-toggle"> 

	<div class="drawer-side">
	  <label for="my-drawer" class="drawer-overlay"></label> 
	  <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
		<li>
		  <a>Menu Item</a>
		</li> 	
		<li>
		  <a>Menu Item</a>
		</li>
	  </ul>
	</div>
  </div>



	<slot />
  