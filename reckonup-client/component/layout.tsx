import React from 'react'
import Head from 'next/head'
import Navigation from './navigation';

export interface LayoutProps {
  title?: string;
  navigation?: string;
  children?: JSX.Element | JSX.Element[];
};

export const Layout = ({ title, navigation, children }: LayoutProps) => <>
  <Head>
    <title>Reckonup{title ? ` - ${title}` : ''}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <Navigation navigation={navigation} />
  <main>
    {children}
  </main>
</>;

export default Layout;