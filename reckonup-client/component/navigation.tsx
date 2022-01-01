import React, { useEffect, useState } from 'react';
import crypto from "crypto";
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { format } from 'react-string-format';

import { clearAuthenticationInformation } from '../logics/auth';
import { IsLoggedInState, JwtTokenState, RefreshTokenState, UserState } from '../common/atom';
import { User } from '../models/user';
import { Translate } from '../locales';

import styles from '../styles/navigation.module.scss';
import Nothing from './nothing';


const md5 = (data: string | undefined | null) =>
  data && crypto.createHash("md5").update(data).digest("hex");

export interface NavigationProps {
  navigation?: string;
};

export const Navigation = ({ navigation }: NavigationProps) => {
  const { locale } = useRouter();
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isUserMenuOpened, setIsUesrMenuOpened] = useState(false);
  const [menu, setMenu] = useState(<Nothing />);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedInState);
  const [user, setUser] = useRecoilState<User>(UserState);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const setRefreshToken = useSetRecoilState(RefreshTokenState);

  const t = new Translate(locale);

  const logout = () => {
    clearAuthenticationInformation();
    setJwtToken('');
    setRefreshToken('');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    // Menu should be rendered on the client side
    if (isLoggedIn && user) {
      setMenu(<>
        {/* Logged in */}
        <div className="navbar-start">
          <Link href="/list">
            <a key="navbar-social-menu-1" className={`navbar-item is-tab ${navigation === 'list' ? 'is-active' : ''}`}>
              {t.t('List')}
            </a>
          </Link>
        </div>
        <div className="navbar-end">
          <div className={`navbar-item has-dropdown ${isUserMenuOpened ? 'is-active' : ''}`}>
            <a className="navbar-link" onClick={() => setIsUesrMenuOpened(!isUserMenuOpened)}>
              <img
                alt='Avatar'
                className={styles.userAvatar}
                src={`https://www.gravatar.com/avatar/${md5(
                  user.email
                )}?r=pg`}
              />
              {format(t.t('NAME_ORDER'), user.firstName, user.lastName)}
            </a>
            <div className="navbar-dropdown">
              <Link href="/profile">
                <a className="navbar-item">
                  {t.t('Profile')}
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
      </>);
    } else {
      setMenu(<>
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
      </>);
    }
  }, [isLoggedIn, user, isUserMenuOpened]);

  return <>
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img className={styles.reckonupLogo} src="/reckonup-logo.svg" height="34" alt="Reckonup" />
        </a>

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

      <div id="navbar-menu" className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
        {menu}
      </div>
    </nav>
  </>;
}

export default Navigation;