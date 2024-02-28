// import { cssBundleHref } from "@remix-run/css-bundle";
// import type { LinksFunction } from "@remix-run/node";
// import {
//   Links,
//   LiveReload,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
// } from "@remix-run/react";
// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core/index.js";
// import { ApolloProvider } from "@apollo/client/react/index.js";

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

// export default function App() {
//   const client = new ApolloClient({
//     ssrMode: true,
//     link: createHttpLink({
//       uri: 'http://localhost:8000/graphql',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//     }),
//     cache: new InMemoryCache(),
// });

//   return (
//     <html lang="ja">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <ApolloProvider client={client}>
//           <Outlet />
//           <ScrollRestoration />
//           <Scripts />
//           <LiveReload />
//         </ApolloProvider>
//       </body>
//     </html>
//   );
// }
