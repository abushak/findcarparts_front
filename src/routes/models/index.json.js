import { client } from '$lib/graphql-client';
import { gql } from "@apollo/client/core/core.cjs.js?";
import { allMakes } from "$lib/queries";

const makes = client.query(allMakes, {
  
});


$: makes.refetch ();


