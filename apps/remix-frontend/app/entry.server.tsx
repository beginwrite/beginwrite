// // app/entry.server.tsx

import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { getDataFromTree } from '@apollo/client/react/ssr/index.js';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core/index.js';
import { ApolloProvider } from '@apollo/client/react/index.js';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: 'http://localhost:8000/graphql',
    }),
  });

  const App = (
    <ApolloProvider client={client}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  );

  return getDataFromTree(App).then(() => {
    const initialState = client.extract();

    const markup = renderToString(
      <>
        {App}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              initialState,
            ).replace(/</g, '\\u003c')}`,
          }}
        />
      </>,
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  });
}
