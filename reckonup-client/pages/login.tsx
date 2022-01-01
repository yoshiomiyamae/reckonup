import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IsLoggedInState, JwtTokenState, PasswordState, RefreshTokenState, RememberMeState, UserNameState, UserState } from '../common/atom';
import { login } from '../logics/auth';
import Layout from '../component/layout'
import Nothing from '../component/nothing';
import { Translate } from '../locales';
import { User } from '../models/system';

export const Login = () => {
  const router = useRouter();
  const [persistentUserName, setPersistentUserName] = useRecoilState(UserNameState);
  const [persistentPassword, setPersistentPassword] = useRecoilState(PasswordState);
  // const [rememberMe, setRememberMe] = useRecoilState(RememberMeState);
  const [rememberMe, setRememberMe] = useState(false);
  const [userName, setUserName] = useState(rememberMe ? persistentUserName : '');
  const [password, setPassword] = useState(rememberMe ? persistentPassword : '');
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const setIsLoggedIn = useSetRecoilState<boolean>(IsLoggedInState);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const setRefreshToken = useSetRecoilState(RefreshTokenState);
  const setUser = useSetRecoilState<User>(UserState);

  const t = new Translate(router.locale);

  useEffect(() => {
    if (isLoginChecked) {
      if (router.query.url) {
        router.replace(router.query.url as string);
      } else {
        router.replace('/');
      }
    }
  }, [isLoginChecked]);

  const onLoginButtonClicked = async () => {
    const response = await login(
      userName,
      password
    );
    setLoginErrorMessage(response.loginErrorMessage);
    if (response.isLoggedIn) {
      if (rememberMe) {
        setPersistentUserName(userName);
        setPersistentPassword(password);
      } else {
        setPersistentUserName('');
        setPersistentPassword('');
      }
      setIsLoggedIn(response.isLoggedIn);
      setJwtToken(response.jwtToken);
      setRefreshToken(response.refreshToken);
      setUser(response.user);
      setIsLoginChecked(true);
    }
  };

  return <>
    <Layout>
      <div className="columns is-multiline">
        <div className="container column is-half is-offset-one-quater">
          <div className="card">
            <div className="card-header">
              <h3 className="card-header-title">{t.t('Login')}</h3>
            </div>
            <div className="card-content">
              <div className="field">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{t.t('User name')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder={t.t('User name')}
                          value={userName}
                          onInput={(e) => setUserName(e.currentTarget.value)}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{t.t('Password')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder={t.t('Password')}
                          value={password}
                          onInput={(e) => setPassword(e.currentTarget.value)}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label">{t.t('Remember me')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-narrow">
                      <div className="control">
                        <label className="checkbox">
                          <input
                            className="checkbox"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.currentTarget.checked)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {loginErrorMessage
                ? <div className="notification is-danger">
                  {loginErrorMessage}
                </div>
                : <Nothing />
              }
            </div>
            <div className="card-footer">
              <div className="card-footer-item">
                <button
                  className="button is-primary"
                  onClick={onLoginButtonClicked}
                >
                  {t.t('Login')}
                </button>
                <Link href='/forgot-password'>
                  <a>{t.t('Forgot password?')}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>;
}

export default Login;