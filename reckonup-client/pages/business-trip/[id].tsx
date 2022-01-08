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
import { getBusinessTrip, getDailyAllowances, getDestinations, putBusinessTrip } from "../../logics/travel-expense";
import { BusinessTrip, DailyAllowanceCollection, DestinationCollection } from "../../models/travel-expense";
import { faSave, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CalendarCollection, User } from "../../models/system";
import { getCalendar } from "../../logics/system";

export const BusinessTripPage = () => {
  const router = useRouter();

  const user = useRecoilValue<User>(UserState);

  const [isLoginOk, setIsLoginOk] = useState(false);

  const [businessTrip, setBusinessTrip] = useState<BusinessTrip>(new BusinessTrip());
  const [destinations, setDestinations] = useState<DestinationCollection>(new DestinationCollection());
  const [dailyAllowances, setDailyAllowances] = useState<DailyAllowanceCollection>(new DailyAllowanceCollection());
  const [dayCount, setDayCount] = useState(0);
  const [dailyAllowance, setDailyAllowance] = useState<number>(0);
  const [dailyAllowanceTotal, setDailyAllowanceTotal] = useState<number>(0);
  const [calendar, setCalendar] = useState<CalendarCollection>(new CalendarCollection());
  const [holidayCount, setHolidayCount] = useState(0);
  const [workdayCount, setWorkdayCount] = useState(0);

  const t = new Translate(router.locale);

  useEffect(() => {
    // When login check has finished
    (async () => {
      if (!isLoginOk) {
        return;
      }
      setDestinations(await getDestinations());
      setDailyAllowances(await getDailyAllowances());
      setCalendar(await getCalendar());
    })();
  }, [isLoginOk]);

  useEffect(() => {
    // When login check has finished and router is ready
    (async () => {
      if (!isLoginOk || !router.isReady || !user) {
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
        setBusinessTrip(await getBusinessTrip(user.id, router.query.id as string));
      }
    })();
  }, [isLoginOk, user, router.isReady, router.query.id]);

  useEffect(() => {
    // When login check has finished and daily allowance list has loaded
    setDailyAllowance(dailyAllowances.get(user.classificationId).value);
  }, [isLoginOk, user, dailyAllowances]);

  useEffect(() => {
    // When the business trip period has changed
    const dc = Math.ceil((businessTrip.endDateTime.getTime() - businessTrip.startDateTime.getTime()) / 86400000) + 1;
    setDayCount(dc);
    if (calendar.length === 0) {
      return;
    }
    const hc = calendar.countHoliday(businessTrip.startDateTime, businessTrip.endDateTime);
    setHolidayCount(hc);
    setWorkdayCount(dc - hc);
  }, [businessTrip.endDateTime, businessTrip.startDateTime, calendar]);

  useEffect(() => {
    // When day count or daily allowance has changed
    // TODO: Change not to hard code
    setDailyAllowanceTotal(Math.round(workdayCount * dailyAllowance + holidayCount * dailyAllowance * 1.5));
  }, [dayCount, holidayCount, dailyAllowance]);

  const onSaveButtonClicked = async () => {
    if (process.browser) {
      // Dynamic import to avoid SSR
      const { immediateToast } = await import('izitoast-react');
      try {
        await putBusinessTrip(user.id, businessTrip);
        immediateToast('success', { message: t.t('Saved!') })
        router.push('/list');
      } catch (e) {
        immediateToast('error', { message: e });
      }
    }
  }

  return <>
    <LoginCheck onLoginOk={() => setIsLoginOk(true)}>
      {businessTrip && user
        ? <Layout title={format(t.t('Business trip #{0}'), businessTrip.id)}>
          <div className="container">
            {businessTrip && destinations
              ? <>
                {businessTrip.id !== 0
                  ? <>
                    <h3 className="title is-3">{t.t('Edit business trip')}</h3>
                  </>
                  : <>
                    <h3 className="title is-3">{t.t('New business trip')}</h3>
                  </>
                }

                <hr />

                <h4 className="title is-4">{t.t('Basic information')}</h4>
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

                  <hr />
                  <h4 className="title is-4">{t.t('Daily allowance')}</h4>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{t.t('Day count')}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            type="text"
                            placeholder={t.t('Day count')}
                            value={dayCount}
                            readOnly
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{t.t('Workday count')}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            type="text"
                            placeholder={t.t('Workday count')}
                            value={workdayCount}
                            readOnly
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{t.t('Holiday count')}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            type="text"
                            placeholder={t.t('Holiday count')}
                            value={holidayCount}
                            readOnly
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{t.t('Daily allowance')}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            type="text"
                            placeholder={t.t('Daily allowance')}
                            value={dailyAllowanceTotal}
                            readOnly
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <h4 className="title is-4">{t.t('Accommodation fee')}</h4>

                  <hr />
                  <h4 className="title is-4">{t.t('Transpotation fee')}</h4>

                  <hr />
                  <h4 className="title is-4">{t.t('Summary')}</h4>

                  <hr />

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