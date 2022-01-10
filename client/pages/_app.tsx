import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/apollo'
import { NextPage } from 'next'

import 'rsuite/dist/rsuite.min.css';
import 'izitoast-react/dist/iziToast.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => <>
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
</>;

export default App
