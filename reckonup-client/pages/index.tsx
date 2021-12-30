import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'react-string-format';
import { useRecoilValue } from 'recoil';
import { IsLoggedInState } from '../common/atom';
import Layout from '../component/layout'
import Nothing from '../component/nothing';
import { Translate } from '../locales';

export const Home = () => {
  const router = useRouter();
  const isLoggedIn = useRecoilValue(IsLoggedInState);

  const [children, setChildren] = useState(<Nothing />)

  const t = new Translate(router.locale);

  useEffect(() => {
    setChildren(
      isLoggedIn
        ? <>
          <div className="hero is-link">
            <div className="hero-body">
              <div className="title">
                {t.t('Travel Expenditure Management System')}
              </div>
              <div className="subtitle">
                {t.t('Reckonup is ....')}
              </div>
            </div>
          </div>
        </>
        : <>
          <div className="container">
            {format(t.t('You need to {0} or {1}.'),
              <Link href="/login"><a>{t.t('login')}</a></Link>,
              <Link href="/signup"><a>{t.t('signup')}</a></Link>
            )}
          </div>
        </>);
  }, [isLoggedIn])

  return <>
    <Layout>
      {children}
    </Layout>
  </>;
}

export default Home;