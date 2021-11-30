<script>
	
	import '../styles/app.css';
	// import '../styles/styles.css';
	// import '../styles/resposive.css';
	
	import Headroom from "svelte-headroom";
	import Footer from '$lib/components/Footer.svelte';
	const onPin = () => console.log("pin");
	
  </script>



<div class="drawer h-screen">
	
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle">

	<div class="flex flex-col drawer-content ">
			<!-- <Headroom on:pin={onPin} duration="350ms" offset={50} tolerance={5} > -->
	  	
			
			<div class="w-full navbar">

		
				<div class="navbar-start">
				
					<label for="my-drawer-3" class="btn btn-square btn-ghost">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
				</div>
				<div class="navbar-center lg:flex">
						<div class="flex items-stretch">
							<div class="logo"><a sveltekit:prefetch href="/"><img src="/assets/images/fincar.parts.png"
								alt="findcarpasrts-logo"/></a>
							</div>
						
						</div>
					
				</div>
				<div class="navbar-end">
						<button class="btn btn-square btn-ghost">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
				</div>
		
	  		</div>
		
		<div>
		
	
			<h1 class="index-h1">car parts prices comparison<br>and compatibility<br>service</h1>
		
			
		<!-- </Headroom>	 -->
		</div>
	
	
		<div class="container mx-auto">
			<slot />
		</div>
		<Footer />
	</div>
	


	<div class="drawer-side">
	  <label for="my-drawer-3" class="drawer-overlay"></label> 
	  <ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
		<label for="my-drawer-3" class="absolute top-0 right-0 h-16 w-16 btn btn-square btn-ghost">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			  </svg>
		</label>


		<li class="search-notify">
			<input id="my-drawer" type="checkbox" class="drawer-toggle"> 
			<a sveltekit:prefetch href="/search-help">You can't find what are looking for?<span class="green-anc">></span></a>
		</li> 
		<li>
			<a sveltekit:prefetch href="/about">About us</a>
		</li>
		<li>
			<a sveltekit:prefetch href="/contact">Contact us</a>
		</li>
		<li>
			<a sveltekit:prefetch href="/disclaimer">Disclaimer</a>
		</li>
		<li>
			<a sveltekit:prefetch href="/privacy-policy">Privacy policy</a>
		</li>
		<li>
			<a sveltekit:prefetch href="/terms-and-conditions">Terms and Conditions</a>
		</li>
		<li>
			<a sveltekit:prefetch href="/help">Help</a>
		</li>
	  </ul>
	</div>

</div>	

  
