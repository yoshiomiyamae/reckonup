import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import * as dateFns from 'date-fns';

import Layout from "../components/layout";
import { Translate } from "../locales";
import { GetServerSideProps, NextPage } from "next";
import { Department, Grade, User } from "../gql/types";
import { getDepartments, getGrades, getLoginUser, updateLoginUser } from "../lib/system";
import Auth from "../components/auth";

interface ProfileProps {
  user?: User;
  grades?: Grade[];
  departments?: Department[];
}

export const Profile: NextPage<ProfileProps> = ({ user, grades, departments }) => {
  const router = useRouter();

  const [id, setId] = useState(user!.id);
  const [username, setUsername] = useState(user!.username);
  const [firstName, setFirstName] = useState(user!.firstName || '');
  const [lastName, setLastName] = useState(user!.lastName || '');
  const [email, setEmail] = useState(user!.email || '');
  const [isSuperuser, setIsSuperUser] = useState(user!.isSuperuser);
  const [isStaff, setIsStaff] = useState(user!.isStaff);
  const [isActive, setIsActive] = useState(user!.isActive);
  const [gradeId, setGradeId] = useState(user!.profile!.grade?.id || 0);
  const [departmentId, setDepartmentId] = useState(user!.profile!.department?.id || 0);
  const [dateJoined, setDateJoined] = useState(new Date(user!.dateJoined));
  const [lastLogin, setLastLogin] = useState(new Date(user!.lastLogin || 0));

  const t = new Translate(router.locale);

  const onSaveButtonClicked = async () => {
    if (process.browser) {
      // Dynamic import to avoid SSR
      const { immediateToast } = await import('izitoast-react');
      try {
        await updateLoginUser(null, { id, firstName, lastName, email, gradeId, departmentId });
        immediateToast('success', { message: t.t('Saved!') })
        router.push('/list');
      } catch (e) {
        console.log((e as any).networkError.result.errors[0].message);
        immediateToast('error', { message: `${e}` });
      }
    }
  };

  return <>
    <Auth>
      <Layout navigation="profile" user={user}>
        <div className="container">
          <h3 className="title is-3">{t.t('Edit profile')}</h3>
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
                      value={id}
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
                      value={username}
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
                      value={firstName || ''}
                      onChange={(e) => setFirstName(e.currentTarget.value)}
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
                      value={lastName || ''}
                      onChange={(e) => setLastName(e.currentTarget.value)}
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
                      value={email || ''}
                      onChange={(e) => setEmail(e.currentTarget.value)}
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
                      checked={isActive}
                      // onChange={(e) => setTempUser({
                      //   ...tempUser,
                      //   isActive: e.currentTarget.checked,
                      // })}
                      readOnly
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">{t.t('Super user')}</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={isSuperuser}
                      // onChange={(e) => setTempUser({
                      //   ...tempUser,
                      //   isSuperuser: e.currentTarget.checked,
                      // })}
                      readOnly
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">{t.t('Staff')}</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={isStaff}
                      // onChange={(e) => setTempUser({
                      //   ...tempUser,
                      //   isStaff: e.currentTarget.checked,
                      // })}
                      readOnly
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
                      value={gradeId}
                      onChange={(e) => setGradeId(Number(e.currentTarget.value))}
                    >
                      <option
                        key="business-trip-destination-0"
                        value="0"
                      >
                        Select Classification
                      </option>
                      {grades?.map(
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
                      value={departmentId}
                      onChange={(e) => setDepartmentId(Number(e.currentTarget.value))}
                    >
                      <option
                        key="business-trip-destination-0"
                        value="0"
                      >
                        Select Department
                      </option>
                      {departments?.map(
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
          <div className="field">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">{t.t('Last login')}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder={t.t('Last login')}
                      value={dateFns.format(lastLogin, t.t('LONG_DATE_TIME_FORMAT'))}
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
                <label className="label">{t.t('Date joined')}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder={t.t('Date joined')}
                      value={dateFns.format(dateJoined, t.t('LONG_DATE_TIME_FORMAT'))}
                      readOnly
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
    </Auth>
  </>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await getLoginUser(ctx);
    const grades = await getGrades(ctx);
    const departments = await getDepartments(ctx);
    return {
      props: {
        user,
        grades,
        departments,
      }
    };
  } catch (e) {
    console.log((e as any).networkError.result.errors[0].message);
    console.log((e as any).networkError.result.errors[0].locations);
    return { props: {} };
  }
}

export default Profile;