import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsLoggedInState, JwtTokenState, RefreshTokenState, UserState } from '../common/atom';
import { loginCheck } from '../logics/auth';
import { Translate } from '../locales';
import Loading from './loading';

export interface LoginCheckProps {
  children?: JSX.Element;
  onLoginOk?: () => void;
};

export const LoginCheck = ({ children, onLoginOk }: LoginCheckProps) => {
  const router = useRouter();
  const jwtToken = useRecoilValue(JwtTokenState);
  const refreshToken = useRecoilValue(RefreshTokenState);
  const setIsLoggedIn = useSetRecoilState(IsLoggedInState);
  const setUser = useSetRecoilState(UserState);

  const [isLoginChecked, setIsLoginChecked] = useState(false);

  const t = new Translate(router.locale);

  useEffect(() => {
    (async () => {
      if (!router.isReady) {
        return;
      }
      try {
        const response = await loginCheck(jwtToken, refreshToken);
        setUser(response.user);
        setIsLoggedIn(true);
        setIsLoginChecked(true);
        if (onLoginOk === null) {
          return;
        }
        onLoginOk();
      }
      catch (e) {
        if (e.isAxiosError && Math.floor(e.response.status / 400) === 1) {

          if (process.browser) {
            // Dynamic import to avoid SSR
            const { immediateToast } = await import('izitoast-react');
            immediateToast('error', { message: t.t('Certification information has expired. Need re-login.') });
          }
          router.replace(`/login?url=${router.asPath}`);
        }
      }
    })();
  }, [router.isReady]);

  return isLoginChecked
    ? children
    : <Loading />;
};

export default LoginCheck;