import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo";
import { Analytics } from '@vercel/analytics/react';

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Analytics />
      </ApolloProvider>
    )
}

export default MyApp;