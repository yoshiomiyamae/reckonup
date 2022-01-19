import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "react-string-format";

import DateRangePicker from 'rsuite/DateRangePicker';
import { DateRange } from "rsuite/esm/DateRangePicker/types";

import Layout from "../../components/layout";
import { Translate } from "../../locales";
import { faSave, faAngleLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BusinessTrip, Calendar, Destination, Expense, User, ExpenseType, Currency } from "../../gql/types";
import { GetServerSideProps, NextPage } from "next";
import { getCalendars, getCurrencies, getLoginUser } from "../../lib/system";
import { getBusinessTrip, getDestinationIdNames, getExpenseTypes } from "../../lib/travel-expense";
import * as dateFns from 'date-fns';

import styles from '../../styles/business-trip.module.scss';
import classNames from "classnames";
import ExpenseComponent from "../../components/business-trip/expense";

const EMPTY_BUSINESS_TRIP: BusinessTrip = {
  id: 0,
  destination: { id: 0, name: '' },
  startDateTime: '1900-01-01',
  endDateTime: '1900-01-01',
  expenses: [],
}

const EMPTY_EXPENSE: Expense = {
  id: 0,
  currency: { id: 0, name: '', codeNumber: 0, code: '' },
  expenseType: { id: 0, name: '', isVoucherNeeded: true },
  paid: false,
  dateTime: new Date().toISOString(),
}

interface BusinessTripPageProps {
  user?: User;
  businessTrip?: BusinessTrip;
  destinations?: Destination[];
  expenseTypes?: ExpenseType[];
  calendars?: Calendar[];
  currencies?: Currency[];
}

export const BusinessTripPage: NextPage<BusinessTripPageProps> = ({ user, businessTrip, destinations, calendars, expenseTypes, currencies }) => {
  const router = useRouter();

  const [dayCount, setDayCount] = useState(0);
  const [dailyAllowance, setDailyAllowance] = useState<number>(0);
  const [dailyAllowanceTotal, setDailyAllowanceTotal] = useState<number>(0);
  const [holidayCount, setHolidayCount] = useState(0);
  const [workdayCount, setWorkdayCount] = useState(0);
  const [id, setId] = useState(businessTrip ? businessTrip.id : 0);
  const [destinationId, setDestinationId] = useState(businessTrip ? businessTrip.destination.id : 0);
  const [startDateTime, setStartDateTime] = useState(businessTrip ? new Date(businessTrip.startDateTime) : new Date());
  const [endDateTime, setEndDateTime] = useState(businessTrip ? new Date(businessTrip.endDateTime) : new Date());
  const [expenses, setExpenses] = useState<Expense[]>(businessTrip ? [...businessTrip.expenses, EMPTY_EXPENSE] : [EMPTY_EXPENSE]);
  const [accommodationDays, setAccommodationDays] = useState(0);
  const [accommodationFee, setAccommodationFee] = useState(0);

  const t = new Translate(router.locale);

  const calculateDayCount = (sdt: Date, edt: Date) => {
    setStartDateTime(sdt);
    setEndDateTime(edt);
    const dc = Math.ceil((edt.getTime() - sdt.getTime()) / 86400000) + 1;
    setDayCount(dc);
    if (calendars) {
      const hc = calendars
        .filter(c => c.isHoliday)
        .map(c => new Date(c.date).getTime())
        .filter(t => t >= dateFns.startOfDay(sdt).getTime() && t <= dateFns.endOfDay(edt).getTime())
        .length
      setHolidayCount(hc);
      setWorkdayCount(dc - hc);
    }

    // When day count or daily allowance has changed
    // TODO: Change not to hard code
    setDailyAllowanceTotal(Math.round(workdayCount * dailyAllowance + holidayCount * dailyAllowance * 1.5));

    const ad = dc - 1;
    setAccommodationDays(ad);
  };

  useEffect(() => {
    calculateDayCount(startDateTime, endDateTime);
  }, []);

  const onSaveButtonClicked = async () => {
    if (process.browser) {
      // Dynamic import to avoid SSR
      const { immediateToast } = await import('izitoast-react');
      try {
        // await putBusinessTrip(user.id, businessTrip);
        immediateToast('success', { message: t.t('Saved!') })
        router.push('/list');
      } catch (e) {
        immediateToast('error', { message: `${e}` });
      }
    }
  }

  return <>
    <Layout title={format(t.t('Business trip #{0}'), id)} user={user}>
      <div className="container">
        {id !== 0
          ? <>
            <h3 className="title is-3">{t.t('Edit business trip')}</h3>
            <h5 className="subtitle is-5">{`${t.t('ID')}: ${id}`}</h5>
          </>
          : <>
            <h3 className="title is-3">{t.t('New business trip')}</h3>
          </>
        }

        <hr />

        <div className="field">
          <h4 className="title is-4">{t.t('Basic information')}</h4>

          <div className="columns is-multiline is-tablet">
            <div className="column is-half-tablet">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">{t.t('Destination')}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={destinationId}
                          onChange={(e) => setDestinationId(Number(e.currentTarget.value))}
                        >
                          <option
                            key="business-trip-destination-0"
                            value="0"
                          >
                            Select Destination
                          </option>
                          {destinations!.map(
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
            </div>
            <div className="column is-half-tablet">
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
                          new Date(startDateTime),
                          new Date(endDateTime),
                        ]}
                        onChange={(dateRange: DateRange | null) => {
                          if (!dateRange) {
                            return;
                          }
                          const [sdt, edt] = dateRange;
                          calculateDayCount(sdt, edt);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <h4 className="title is-4">{t.t('Daily allowance')}</h4>

          <div className="columns is-multiline is-tablet">
            <div className="column is-one-quarter-widescreen is-half-tablet">
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
            </div>
            <div className="column is-one-quarter-widescreen is-half-tablet">
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
            </div>
            <div className="column is-one-quarter-widescreen is-half-tablet">
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
            </div>
            <div className="column is-one-quarter-widescreen is-half-tablet">
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
            </div>
          </div>

          <hr />
          <h4 className="title is-4">{t.t('Accommodation fee')}</h4>

          <div className="columns is-multiline is-tablet">
            <div className="column is-one-quarter-widescreen is-half-tablet">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">{t.t('Accommodation days')}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder={t.t('Accommodation days')}
                        value={accommodationDays}
                        readOnly
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-one-quarter-widescreen is-half-tablet">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">{t.t('Accommodation fee')}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder={t.t('Accommodation fee')}
                        value={accommodationFee}
                        readOnly
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <h4 className="title is-4">{t.t('Transpotation fee')}</h4>
          <div className={styles.expense}>
            <table className={
              classNames([
                "table is-fullwidth is-striped",
                styles.expenseTable,
              ])}>
              <thead>
                <tr>
                  <th className={styles.expenseHeaderItem}>{t.t('Type')}</th>
                  <th className={styles.expenseHeaderItem}>{t.t('Date')}</th>
                  <th className={styles.expenseHeaderItem}>{t.t('Expense')}</th>
                  <th className={styles.expenseHeaderItem}>{t.t('Currency')}</th>
                  <th className={styles.expenseHeaderItem}>{t.t('Remarks')}</th>
                  <th className={styles.expenseHeaderItem}>{t.t('Receipt')}</th>
                  <th className={styles.expenseHeaderItem}>{t.t('Paid')}</th>
                  <th className={styles.expenseHeaderItem}></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, i) => <>
                  <ExpenseComponent
                    key={`business-trip-expenses-expense-${exp.id}`}
                    expense={exp}
                    newRow={i !== expenses.length - 1}
                    expenseTypes={[...(expenseTypes || [])]}
                    currencies={[...(currencies || [])]}
                    onChange={(exp3) => setExpenses([
                      ...expenses.map((exp2) => (exp2.id === exp3.id ? exp3 : exp2)),
                    ])
                    }
                    onRemove={() => setExpenses([
                      ...expenses.filter((exp2) => exp2.id !== exp.id),
                    ])}
                    onAdd={() => setExpenses([
                      ...expenses,
                      {
                        ...EMPTY_EXPENSE,
                        id: expenses.map(exp2 => exp2.id).reduce((p, c) => p > c ? p : c) + 1
                      },
                    ])}
                  />
                </>)}
              </tbody>
            </table>
          </div>

          <hr />
          <h4 className="title is-4">{t.t('Summary')}</h4>

          <hr />

          <div className="field buttons is-right">
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
          </div>
        </div>
      </div>
    </Layout>
  </>
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await getLoginUser(ctx);
    const businessTrip = ctx.query.id === '0' ? EMPTY_BUSINESS_TRIP : await getBusinessTrip(ctx, Number(ctx.query.id));
    const destinations = await getDestinationIdNames(ctx);
    const expenseTypes = await getExpenseTypes(ctx);
    const calendars = await getCalendars(ctx);
    const currencies = await getCurrencies(ctx);
    return {
      props: {
        user,
        businessTrip,
        destinations,
        expenseTypes,
        calendars,
        currencies,
      }
    };
  } catch (e) {
    console.log((e as any).networkError.result.errors[0].message);
    console.log((e as any).networkError.result.errors[0].locations);
    return { props: {} };
  }
}


export default BusinessTripPage;