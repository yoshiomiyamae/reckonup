import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { format } from "react-string-format";
import { useRecoilValue } from "recoil";

import DateRangePicker from 'rsuite/DateRangePicker';
import { DateRange } from "rsuite/esm/DateRangePicker/types";

import { UserState } from "../../common/atom";
import { Layout } from "../../component/layout";
import Loading from "../../component/loading";
import LoginCheck from "../../component/login-check";
import Nothing from "../../component/nothing";
import { Translate } from "../../locales";
import { getBusinessTrip, getDestinations, putBusinessTrip } from "../../logics/travel-expense";
import { BusinessTrip, DestinationCollection } from "../../models/travel-expense";
import { faSave, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from "../../models/system";

export const BusinessTripPage = () => {
  const router = useRouter();

  const user = useRecoilValue<User>(UserState);

  const [businessTrip, setBusinessTrip] = useState<BusinessTrip>({ id: 0 });
  const [destinations, setDestinations] = useState<DestinationCollection>(new DestinationCollection());
  const [isLoginOk, setIsLoginOk] = useState(false);

  const t = new Translate(router.locale);

  useEffect(() => {
    (async () => {
      if (!isLoginOk) {
        return;
      }
      setDestinations(await getDestinations());
    })();
  }, [isLoginOk]);
  useEffect(() => {
    (async () => {
      if (!isLoginOk || !router.isReady) {
        return;
      }
      if (router.query.id === '0') {
        // New data
        setBusinessTrip({
          ...businessTrip,
          userId: user.id,
        });
      } else if (!!router.query.id) {
        // Load data
        setBusinessTrip(await getBusinessTrip(router.query.id as string));
      }
    })();
  }, [isLoginOk, user, router.isReady, router.query.id]);

  const onSaveButtonClicked = async () => {
    if (process.browser) {
      // Dynamic import to avoid SSR
      const { immediateToast } = await import('izitoast-react');
      try {
        await putBusinessTrip(businessTrip);
        immediateToast('success', { message: t.t('Saved!') })
        router.push('/list');
      } catch (e) {
        immediateToast('error', { message: e });
      }
    }
  }

  return <>
    <LoginCheck onLoginOk={() => setIsLoginOk(true)}>
      {businessTrip
        ? <Layout title={format(t.t('Business trip #{0}'), businessTrip.id)}>
          <div className="container">
            {businessTrip && destinations
              ? <>
                {businessTrip.id !== 0
                  ? <>
                    <h3 className="title">{t.t('Edit business trip')}</h3>
                  </>
                  : <>
                    <h3 className="title">{t.t('New business trip')}</h3>
                  </>
                }
                <div className="field">
                  {businessTrip.id !== 0
                    ? <>
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
                                value={businessTrip.id || ''}
                                readOnly
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                    : <Nothing />
                  }
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{t.t('Destination')}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <div className="select is-fullwidth">
                            <select
                              value={businessTrip.destinationId}
                              onChange={(e) => setBusinessTrip({
                                ...businessTrip,
                                destinationId: Number(e.currentTarget.value)
                              })}
                            >
                              <option
                                key="business-trip-destination-0"
                                value="0"
                              >
                                Select Destination
                              </option>
                              {destinations.map(
                                d => <option
                                  key={`business-trip-destination-${d.id}`}
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
                      <label className="label">{t.t('Period')}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <DateRangePicker
                            format={t.t('LONG_DATE_TIME_FORMAT')}
                            value={[
                              businessTrip.startDateTime,
                              businessTrip.endDateTime
                            ]}
                            onChange={(dateRange: DateRange) => setBusinessTrip({
                              ...businessTrip,
                              startDateTime: dateRange[0],
                              endDateTime: dateRange[1],
                            })}
                          />
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
          </div>
        </Layout>
        : <Loading />
      }
    </LoginCheck>
  </>
}

export default BusinessTripPage;