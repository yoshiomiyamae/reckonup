import React, { useEffect, useState } from 'react';
import crypto from "crypto";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'react-string-format';
import nookies from 'nookies';

import { Translate } from '../locales';

import styles from '../styles/navigation.module.scss';
import Nothing from './nothing';
import { User } from '../gql/types';
import { useRevokeTokenMutation } from '../gql/mutations/system.generated';
import classnames from 'classnames';


const md5 = (data: string | undefined | null) =>
  data && crypto.createHash("md5").update(data).digest("hex");

export interface NavigationProps {
  navigation?: string;
  user?: User;
};

export const Navigation = ({ navigation, user }: NavigationProps) => {
  const router = useRouter();
  const [revokeToken, { error: revokeTokenError, data: revokeTokenData, loading: revokeTokenLoading }] = useRevokeTokenMutation();

  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isUserMenuOpened, setIsUesrMenuOpened] = useState(false);

  const t = new Translate(router.locale);

  const logout = () => {
    const cookies = nookies.get();
    revokeToken({ variables: { refreshToken: cookies['refreshToken'] } });
    nookies.destroy(null, 'token'), { path: '/' };
    nookies.destroy(null, 'tokenExpiredIn', { path: '/' });
    nookies.destroy(null, 'refreshToken'), { path: '/' };
    nookies.destroy(null, 'refreshExpiresIn', { path: '/' });
    router.push('/login');
  }

  return <>
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img className={styles.reckonupLogo} src="/reckonup-logo.svg" height="34" alt="Reckonup" />
          </a>
        </Link>

        <a role="button"
          className={`navbar-burger ${isBurgerActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isBurgerActive}
          data-target="navbar-menu"
          onClick={() => setIsBurgerActive(!isBurgerActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar-menu" className={classnames([
        'navbar-menu',
        { 'is-active': isBurgerActive },
      ])}>
        {
          user
            ? <>
              {/* Logged in */}
              <div className="navbar-start">
                <Link href="/list">
                  <a key="navbar-social-menu-1" className={classnames([
                    'navbar-item is-tab',
                    { 'is-active': navigation === 'list' },
                  ])}>
                    {t.t('List')}
                  </a>
                </Link>
              </div>
              <div className="navbar-end">
                <div className={classnames([
                  'navbar-item has-dropdown',
                  { 'is-active': isUserMenuOpened },
                ])}>
                  <a className="navbar-link" onClick={() => setIsUesrMenuOpened(!isUserMenuOpened)}>
                    <img
                      alt='Avatar'
                      className={styles.userAvatar}
                      src={`https://www.gravatar.com/avatar/${md5(
                        user.email
                      )}?r=pg`}
                    />
                    <span className={styles.userName}>{format(t.t('NAME_ORDER'), user.firstName || '', user.lastName || '')}</span>
                  </a>
                  <div className="navbar-dropdown">
                    <Link href="/profile">
                      <a className="navbar-item">
                        {t.t('Profile')}
                      </a>
                    </Link>
                    <Link href="/change-password">
                      <a className="navbar-item">
                        {t.t('Change password')}
                      </a>
                    </Link>
                    <Link href="/login">
                      <a className="navbar-item" onClick={() => logout()}>
                        {t.t('Logout')}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </>
            : <>
              {/* Not logged in */}
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link href="/signup">
                      <a className="button is-primary">
                        <strong>Signup</strong>
                      </a>
                    </Link>
                    <Link href="/login">
                      <a className="button is-light">
                        Login
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </>}
      </div>
    </nav>
  </>;
}

export default Navigation;