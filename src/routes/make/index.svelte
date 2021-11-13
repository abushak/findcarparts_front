<script context="module">
	export const prerender = true;
	export async function load({ fetch }) {
		const url = '/models/makes.json';
		const res = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				limit: 5
			})
		});
		const { data } = await res.json();
		if (res.ok) {
			return {
				props: { data }
			};
		}

		return {
			status: res.status,
			error: new Error(`Couldn't load ${url}`)
		};
	}
</script>

<script>
	
	export let data;


</script>

<pre>{JSON.stringify(data)}</pre>