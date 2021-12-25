import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'react-string-format';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsLoggedInState, JwtTokenState, RefreshTokenState, UserState } from '../common/atom';
import { loginCheck } from '../common/auth';
import Layout from '../component/layout'
import { Translate } from '../locales';

export const Home = () => {
  const { locale } = useRouter();
  const isLoggedIn = useRecoilValue(IsLoggedInState);
  const jwtToken = useRecoilValue(JwtTokenState);
  const refreshToken = useRecoilValue(RefreshTokenState);
  const setUser = useSetRecoilState(UserState);

  const [contents, setContents] = useState(<></>);

  const t = new Translate(locale);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const response = await loginCheck(jwtToken, refreshToken);
        setUser(response.user);
      }
    })();
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      setContents(<>
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
      </>);
    } else {
      setContents(<>
        <div className="container">
          {format(t.t('You need to {0} or {1}.'),
            <Link href="/login"><a>{t.t('login')}</a></Link>,
            <Link href="/signup"><a>{t.t('signup')}</a></Link>
          )}
        </div>
      </>);
    }
  }, [isLoggedIn]);
  return <>
    <Layout>
      {contents}
    </Layout>
  </>;
}

export default Home;