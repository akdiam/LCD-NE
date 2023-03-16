import Head from "next/head";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo";
import { Inter } from 'next/font/google'

import '../styles/index.css'

const inter = Inter({ 
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
}

export default MyApp;