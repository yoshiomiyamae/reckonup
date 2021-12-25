import React, { useState } from 'react';
import styles from '../styles/navigation.module.scss';
import crypto from "crypto";
import Link from 'next/link';
import { clearAuthenticationInformation } from '../common/auth';
import { IsLoggedInState, JwtTokenState, UserState } from '../common/atom';
import { User } from '../models/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Translate } from '../locales';
import { format } from 'react-string-format';


const md5 = (data: string | undefined | null) =>
  data && crypto.createHash("md5").update(data).digest("hex");

export const Nav = () => {
  const { locale } = useRouter();
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isUserMenuOpened, setIsUesrMenuOpened] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedInState);
  const [user, setUser] = useRecoilState<User>(UserState);
  const setJwtToken = useSetRecoilState(JwtTokenState);

  const t = new Translate(locale);

  const logout = () => {
    clearAuthenticationInformation();
    setJwtToken('');
    setIsLoggedIn(false);
    setUser(null);
  };

  return <>
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img className={styles.reckonupLogo} src="/reckonup-logo.svg" height="34" />
        </a>

        <a role="button"
          className={`navbar-burger ${isBurgerActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isBurgerActive}
          data-target="navbarBasicExample"
          onClick={() => setIsBurgerActive(!isBurgerActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
        {isLoggedIn && user
          ? <>
            {/* Logged in */}
            <div className="navbar-start">
              <Link href="/list">
                <a className="navbar-item">
                  {t.t('List')}
                </a>
              </Link>
            </div>
            <div className="navbar-end">
              <div className={`navbar-item has-dropdown ${isUserMenuOpened ? 'is-active' : ''}`}>
                <a className="navbar-link" onClick={() => setIsUesrMenuOpened(!isUserMenuOpened)}>
                  <img
                    className={styles.userAvatar}
                    src={`https://www.gravatar.com/avatar/${md5(
                      user.email
                    )}?r=pg`}
                  />
                  {format(t.t('NAME_ORDER'), user.firstName, user.lastName)}
                </a>
                <div className="navbar-dropdown">
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
                  <a className="button is-primary">
                    <strong>Signup</strong>
                  </a>
                  <Link href="/login">
                    <a className="button is-light">
                      Login
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </nav>
  </>;
}

export default Nav;