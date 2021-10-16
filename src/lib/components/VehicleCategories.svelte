<script>
  import { createEventDispatcher } from 'svelte';
  import { appStore, carCategories, vehicle } from '$lib/store';
  import { Row, Column, Search, Button } from "carbon-components-svelte";

  const dispatch = createEventDispatcher();

  function setCategory(cat) {
    vehicle.category = cat;
    dispatch('category-selected');
  }

</script>

<div>

  <div class="centered-text-attr">find out parts # throught accurate parts categories selection tool</div>

  <Row class="parts-cat-flter">
    <Column sm={4} md={{ span:4, offset:2 }} lg={{ span:6, offset:5 }}>
      <Search  size="lg"  placeholder="you can filter parts categories"/>
    </Column>
  </Row>

  <Row>
    {#each $carCategories as cat}
      <Column sm={4} md={4} lg={3}>
        <Button kind="danger-ghost" on:click={setCategory(cat)}>{cat.name}</Button>
      </Column>
  	{/each}
  </Row>

</div>
