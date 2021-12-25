import React from 'react'
import Head from 'next/head'
import Nav from './navigation';

export interface LayoutProps {
  children?: JSX.Element | never[],
};

export const Layout = ({children}: LayoutProps) => <>
  <Head>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <Nav />
  <main>
    {children}
  </main>
</>;

export default Layout;