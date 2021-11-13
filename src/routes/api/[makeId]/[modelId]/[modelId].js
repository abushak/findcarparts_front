import { getYearsByMakeModel } from "$lib/store";

	export async function get({params}) {
		
		const years = await getYearsByMakeModel(`${params.makeId}`,`${params.modelId}`);


		console.log(years)

		 return {
		 		headers: { 'content-type': 'application/json' },
		 		body: years
		 	}



	}


	// 	return {
// 		body: `${params.modelId}`
// }	
