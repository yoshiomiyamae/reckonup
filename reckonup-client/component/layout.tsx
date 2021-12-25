import React from 'react'
import Head from 'next/head'
import Nav from './navigation';

export interface LayoutProps {
  title?: string;
  children?: JSX.Element | never[];
};

export const Layout = ({ title, children }: LayoutProps) => <>
  <Head>
    <title>Reckonup{title ? ` - ${title}` : ''}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <Nav />
  <main>
    {children}
  </main>
</>;

export default Layout;