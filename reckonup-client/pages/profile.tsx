import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserState } from "../common/atom";
import Layout from "../component/layout";
import Loading from "../component/loading";
import LoginCheck from "../component/login-check";
import { Translate } from "../locales";
import { getClassifications, getDepartments, putUser } from "../logics/system";
import { ClassificationCollection, DepartmentCollection } from "../models/system";

export const Profile = () => {
  const router = useRouter();

  const [isLoginOk, setIsLoginOk] = useState(false);
  const user = useRecoilValue(UserState);
  const [tempUser, setTempUser] = useState(user);
  const [classifications, setClassifications] = useState<ClassificationCollection>();
  const [departments, setDepartments] = useState<DepartmentCollection>();

  const t = new Translate(router.locale);

  useEffect(() => {
    (async () => {
      if (!isLoginOk) {
        return;
      }
      setClassifications(await getClassifications());
      setDepartments(await getDepartments());
    })();
  }, [isLoginOk]);

  const onSaveButtonClicked = async () => {
    if (process.browser) {
      // Dynamic import to avoid SSR
      const { immediateToast } = await import('izitoast-react');
      try {
        await putUser(tempUser);
        immediateToast('success', { message: t.t('Saved!') })
        router.push('/list');
      } catch (e) {
        immediateToast('error', { message: e });
      }
    }
  };

  return <>
    <LoginCheck onLoginOk={() => setIsLoginOk(true)}>
      <Layout navigation="profile">
        {tempUser && classifications && departments
          ? <>
            <div className="container">
              <h3 className="title">{t.t('Edit profile')}</h3>
              <div className="field">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{t.t('ID')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder={t.t('ID')}
                          value={tempUser.id || ''}
                          readOnly
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                          value={tempUser.userName || ''}
                          readOnly
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{t.t('First name')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder={t.t('First name')}
                          value={tempUser.firstName || ''}
                          onChange={(e) => setTempUser({
                            ...tempUser,
                            firstName: e.currentTarget.value,
                          })}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{t.t('Last name')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder={t.t('Last name')}
                          value={tempUser.lastName || ''}
                          onChange={(e) => setTempUser({
                            ...tempUser,
                            lastName: e.currentTarget.value,
                          })}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{t.t('E-mail')}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder={t.t('E-mail')}
                          value={tempUser.email || ''}
                          onChange={(e) => setTempUser({
                            ...tempUser,
                            email: e.currentTarget.value,
                          })}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label">
                  <label className="label">{t.t('Active')}</label>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={tempUser.isActive}
                          onChange={(e) => setTempUser({
                            ...tempUser,
                            isActive: e.currentTarget.checked,
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">{t.t('Classification')}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={tempUser.classificationId}
                          onChange={(e) => setTempUser({
                            ...tempUser,
                            classificationId: Number(e.currentTarget.value),
                          })}
                        >
                          <option
                            key="business-trip-destination-0"
                            value="0"
                          >
                            Select Classification
                          </option>
                          {classifications.map(
                            d => <option
                              key={`profile-classification-${d.id}`}
                              value={d.id}
                            >
                              {d.name}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">{t.t('Department')}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={tempUser.departmentId}
                          onChange={(e) => setTempUser({
                            ...tempUser,
                            departmentId: Number(e.currentTarget.value),
                          })}
                        >
                          <option
                            key="business-trip-destination-0"
                            value="0"
                          >
                            Select Department
                          </option>
                          {departments.map(
                            d => <option
                              key={`profile-department-${d.id}`}
                              value={d.id}
                            >
                              {d.name}
                            </option>
                          )}
                        </select>
                      </div>
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
          </>
          : <Loading />
        }
      </Layout>
    </LoginCheck>
  </>;
}

export default Profile;