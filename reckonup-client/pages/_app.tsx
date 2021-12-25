import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import DebugObserver from '../component/debug-observer';

import 'rsuite/dist/rsuite.min.css';

import '../styles/globals.scss';


export const App = ({ Component, pageProps, router }: AppProps) => <>
  <RecoilRoot>
    <DebugObserver />
    <Component {...pageProps} />
  </RecoilRoot>
</>;
export default App
