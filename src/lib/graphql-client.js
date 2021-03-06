// import { Client, setDefaultClient } from "micro-graphql-svelte";

// const client = new Client({
//   endpoint: "https://api.findcar.parts/v1/graphql",
//   fetchOptions: { credentials: "include" }
// });

// setDefaultClient(client);


//import { InMemoryCache } from "@apollo/client/core";
import { InMemoryCache } from '@apollo/client/cache/cache.cjs.js';
import { SvelteApolloClient } from "svelte-apollo-client";

 export const client = SvelteApolloClient({
   uri: "https://api.findcar.parts/v1/graphql",
   cache: new InMemoryCache(),
});



// import { HttpLink, ApolloClient, split } from '@apollo/client/core/core.cjs.js';
// import { InMemoryCache } from '@apollo/client/cache/cache.cjs.js';
// import { WebSocketLink } from '@apollo/client/link/ws/ws.cjs.js';
// import { getMainDefinition } from 'apollo-utilities';
// import fetch from 'cross-fetch';
// import websocket from 'ws';
// import { browser } from '$app/env';
// // Create an http link
// // (needed for adding items)
// const httpLink = new HttpLink({
//     uri: 'https://api.findcar.parts/v1/graphql',
//     fetch
// });
// // Create a WebSocket Link
// // (needed for realtime updates)
// const webSocketConfig = {
//     uri: 'ws://api.findcar.parts/v1/graphql',
//     options: {
//         reconnect: true
//     }
// };
// if (!browser) {
//     webSocketConfig.webSocketImpl = websocket;
// }
// const wsLink = new WebSocketLink(webSocketConfig);
// // Using the ability to split links, you can send data to each link
// // depending on waht kind of operation is being sent
// const link = split(
// // split based on operation type
// ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
// }, wsLink, httpLink);
// export const client = browser
//     ? new ApolloClient({
//         link,
//         cache: new InMemoryCache(),
//         ssrForceFetchDelay: 100
//     })
//     : new ApolloClient({
//         // Make sure queries run once
//         ssrMode: true,
//         // Use SchemaLink to run queries on local scheme (no round trips)
//         // new SchemaLink(...) or httpLink --> SchemaLink is faster
//         // https://www.apollographql.com/docs/react/performance/server-side-rendering/#avoiding-the-network-for-local-queries
//         // exporting schema with npm install -g graphqurl
//         // gq http://localhost:8080/v1/graphql --introspect --format json > app\src\lib\schema.json
//         // @todo: how to automate this? Why is SchemaLink not working?
//         link: httpLink,
//         // Cache not uses, but required by Apollo
//         cache: new InMemoryCache(),
//         // Disbale all cache
//         defaultOptions: {
//             query: {
//                 fetchPolicy: 'no-cache'
//             },
//             mutate: {
//                 fetchPolicy: 'no-cache'
//             },
//             watchQuery: {
//                 fetchPolicy: 'no-cache'
//             }
//         }
//     });