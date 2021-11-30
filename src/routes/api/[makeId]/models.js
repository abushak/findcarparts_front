import { getModelsByMakeId } from "$lib/store";
import { page } from '$app/stores';
import { onMount } from "svelte";	




	export async function get({params}) {
		const { makeId } = params;
		const models = await getModelsByMakeId(makeId);

	

		// selectedMakeId.update(${makeId});
	
		console.log(makeId)

		return {
				headers: { 'content-type': 'application/json' },
				body: models

			}
		
		
	}

	
	