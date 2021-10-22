<script context="module">
    export const load = async ({ fetch }) => {
      const res = await fetch('/models.json')
      if (res.ok) {
        const { items } = await res.json()
        return {
          props: { items },
        }
      }
    }
  </script>
  
  <script>
    export let items

    console.log(items());
  </script>
  
  <svelte:head>
    <title>Sparkles Blog | Welcome</title>
  </svelte:head>
  
  <h1 class="text-4xl mb-10 font-extrabold">Sparkles Blog</h1>
  
  {#each items as { id, name }}
    <div class="card text-center shadow-2xl mb-20">
    
         <ol><li>{name}</li><li>{id}<a href={`/models/${id}`} class="btn btn-outline btn-primary"
            >Read &rArr;</a></li>
        </div>

  {/each}
  