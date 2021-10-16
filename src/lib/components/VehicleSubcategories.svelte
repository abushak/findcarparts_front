<script>
  import { createEventDispatcher } from 'svelte';
  import { carSubcategories, vehicle } from '$lib/store';
  import { Row, Column, Search, Button } from "carbon-components-svelte";

  const dispatch = createEventDispatcher();

  function setSubcategory(subcat) {
    vehicle.subcategory = subcat;
  }

  function getBack() {
    dispatch('category-deselected');
  }

  function breadCrumbs() {
    return [vehicle.make.text, vehicle.model.text, vehicle.year.text, vehicle.engine.text, vehicle.category.name].join(' / ');
  }

</script>

<div>

  <h2>{breadCrumbs()}</h2>

  <span on:click|preventDefault={getBack}>&lt; back</span>

<!--
  <Row class="parts-cat-flter">
    <Column sm={4} md={{ span:4, offset:2 }} lg={{ span:6, offset:5 }}>
      <Search  size="lg"  placeholder="you can filter parts categories"/>
    </Column>
  </Row>
-->
  <Row>
    {#each $carSubcategories[vehicle.category.id] as subcat}
      <Column sm={4} md={4} lg={3}>
        <Button kind="danger-ghost" on:click={setSubcategory(subcat)}>{subcat.name}</Button>
      </Column>
  	{/each}
  </Row>

</div>
