import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { format } from "react-string-format";
import { useRecoilValue, useSetRecoilState } from "recoil";

import DateRangePicker from 'rsuite/DateRangePicker';
import { DateRange } from "rsuite/esm/DateRangePicker/types";

import { IsLoggedInState, JwtTokenState, RefreshTokenState, UserState } from "../../common/atom";
import { loginCheck } from "../../common/auth";
import { Layout } from "../../component/layout";
import { Translate } from "../../locales";
import { getBusinessTrip, getDestinations } from "../../logics/travel-expense";
import { BusinessTrip, DestinationCollection } from "../../models/travel-expense";

export const BusinessTripPage = () => {
  const { locale, query } = useRouter();
  const isLoggedIn = useRecoilValue(IsLoggedInState);
  const jwtToken = useRecoilValue(JwtTokenState);
  const refreshToken = useRecoilValue(RefreshTokenState);
  const setUser = useSetRecoilState(UserState);

  const [businessTrip, setBusinessTrip] = useState<BusinessTrip>({ id: 0 });
  const [destinations, setDestinations] = useState<DestinationCollection>(new DestinationCollection());

  const t = new Translate(locale);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const response = await loginCheck(jwtToken, refreshToken);
        setUser(response.user);
      }
      setDestinations(await getDestinations());
      if (query.id === '0') {
        // New data
      } else if (!!query.id) {
        // Load data
        setBusinessTrip(await getBusinessTrip(query.id as string));
      }
    })();
  }, [query.id]);

  const onChangeDestination = (e: ChangeEvent<HTMLSelectElement>) => {
    setBusinessTrip({
      ...businessTrip,
      destinationId: Number(e.currentTarget.value)
    });
  };

  const onChangePeriod = (dateRange: DateRange) => {
    console.log(dateRange);
    setBusinessTrip({
      ...businessTrip,
      startDateTime: dateRange[0],
      endDateTime: dateRange[1],
    });
  };
  return <>
    <Layout title={format(t.t('Business trip #{0}'), businessTrip.id)}>
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
                : <></>
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
                          onChange={onChangeDestination}
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
                        onChange={onChangePeriod}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          : <></>
        }
      </div>
    </Layout>
  </>
}

export default BusinessTripPage;