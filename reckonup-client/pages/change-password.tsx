import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../component/layout";
import LoginCheck from "../component/login-check";
import { Translate } from "../locales";
import { changePassword } from "../logics/system";

export const ChangePassword = () => {
  const router = useRouter();

  const [isLoginOk, setIsLoginOk] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const t = new Translate(router.locale);

  const onSaveButtonClicked = async () => {
    if (process.browser) {
      // Dynamic import to avoid SSR
      const { immediateToast } = await import('izitoast-react');
      if (newPassword !== newPasswordConfirm) {
        immediateToast('error', { message: t.t('Password not match!') });
        return;
      }
      if (newPassword === '') {
        immediateToast('error', { message: t.t('New password needed.') });
        return;
      }
      if (newPasswordConfirm === '') {
        immediateToast('error', { message: t.t('New password (confirm) needed.') });
        return;
      }
      try {
        await changePassword(newPassword);
        immediateToast('success', { message: t.t('Saved!') });
        router.back();
      } catch (e) {
        immediateToast('error', { message: e });
      }
    }
  };

  return <>
    <LoginCheck onLoginOk={() => setIsLoginOk(true)}>
      <Layout navigation="profile">
        <div className="container">
          <h3 className="title is-3">{t.t('Change password')}</h3>

          <div className="field">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">{t.t('New password')}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder={t.t('New password')}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">{t.t('New password (confirm)')}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder={t.t('New password (confirm)')}
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field buttons is-right">
            <div className="control">
              <button
                className="button is-primary"
                onClick={onSaveButtonClicked}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faSave} />
                </span>
                <span>{t.t('Save')}</span>
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                onClick={() => router.back()}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </span>
                <span>{t.t('Cancel')}</span>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </LoginCheck>
  </>
}

export default ChangePassword;