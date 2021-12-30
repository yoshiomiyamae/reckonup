import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsLoggedInState, JwtTokenState, RefreshTokenState, UserState } from '../common/atom';
import { loginCheck } from '../common/auth';
import Loading from './loading';

export interface LoginCheckProps {
  children?: JSX.Element;
  onLoginOk?: () => Promise<void>;
};

export const LoginCheck = ({ children, onLoginOk }: LoginCheckProps) => {
  const router = useRouter();
  const jwtToken = useRecoilValue(JwtTokenState);
  const refreshToken = useRecoilValue(RefreshTokenState);
  const setIsLoggedIn = useSetRecoilState(IsLoggedInState);
  const setUser = useSetRecoilState(UserState);

  const [isLoginChecked, setIsLoginChecked] = useState(false);

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
        await onLoginOk();
      }
      catch (e) {
        if (e.isAxiosError && Math.floor(e.response.status / 400) === 1) {
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