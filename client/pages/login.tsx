import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from "jsonwebtoken";
import Layout from '../components/layout'
import { User } from '../gql/types';
import { useTokenAuthMutation } from '../gql/mutations/system.generated';
import { Translate } from '../locales';
import { JwtData } from '../models';
import Nothing from '../components/nothing';
import Link from 'next/link';
import { getLoginUser } from '../lib/system';

interface LoginProps {
  user?: User;
}

const Login: NextPage<LoginProps> = ({ user }) => {
  const router = useRouter();

  const [tokenAuth, { error: tokenAuthError, data: tokenAuthData, loading: tokenAuthLoading }] = useTokenAuthMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  useEffect(() => {
    if (tokenAuthLoading) {
      return;
    }
    if (tokenAuthError) {
      console.log(tokenAuthError);
      return;
    }
    if (tokenAuthData) {
      const jwtData = jwt.decode(tokenAuthData.tokenAuth.token) as JwtData;
      nookies.set(null, 'token', tokenAuthData.tokenAuth.token, { path: '/' });
      nookies.set(null, 'tokenExpiredIn', `${jwtData.exp}`, { path: '/' });
      nookies.set(null, 'refreshToken', `${tokenAuthData.tokenAuth.refreshToken}`, { path: '/' });
      nookies.set(null, 'refreshExpiresIn', `${tokenAuthData.tokenAuth.refreshExpiresIn}`, { path: '/' });
      if (router.pathname === '/login') {
        router.push('/');
        return;
      }
      router.reload();
    }
  }, [tokenAuthLoading]);

  const t = new Translate(router.locale);

  const login = () => {
    tokenAuth({
      variables: {
        username,
        password,
      }
    });
  }

  return <>
    <Layout title='Login' navigation='login' user={user}>
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
                          value={username}
                          onInput={(e) => setUsername(e.currentTarget.value)}
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
                {/* To keep the security, remember me function is disabled*/}
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
                  onClick={() => login()}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await getLoginUser(ctx);
    return {
      props: {
        user,
      }
    };
  } catch {
    return { props: {} };
  }
}

export default Login
