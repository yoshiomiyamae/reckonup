import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { DatePicker } from 'rsuite';

import { Currency, Expense, ExpenseType } from "../../gql/types";
import styles from '../../styles/business-trip.module.scss';

interface ExpenseComponentProps {
  expense: Expense;
  newRow: boolean;
  expenseTypes: ExpenseType[];
  currencies: Currency[];
  onChange: (expense: Expense) => void;
  onRemove: () => void;
  onAdd: () => void;
};

export const ExpenseComponent: NextPage<ExpenseComponentProps> = ({ expense, newRow, expenseTypes, currencies, onChange, onRemove, onAdd }) => {
  const id = expense.id;
  const [currencyId, setCurrencyId] = useState(expense.currency?.id || 1);
  const [dateTime, setDateTime] = useState(expense.dateTime);
  const [expenseTypeId, setExpenseTypeId] = useState(expense.expenseType?.id || 1);
  const [paid, setPaid] = useState(expense.paid);
  const [receipt, setReceipt] = useState(expense.receipt);
  const [remarks, setRemarks] = useState(expense.remarks);
  const [value, setValue] = useState(expense.value);

  const getCurrentState = (): Expense => ({
    id,
    currency: currencies.find(c => c.id === currencyId)!,
    dateTime,
    expenseType: expenseTypes.find(c => c.id === expenseTypeId)!,
    paid,
    receipt,
    remarks,
    value
  });

  useEffect(() => {
    onChange(getCurrentState());
  }, [id, currencyId, dateTime, expenseTypeId, paid, receipt, remarks, value]);

  return <tr>
    <td>
      <div className="select is-fullwidth">
        <select
          value={expenseTypeId}
          onChange={(e) => { setExpenseTypeId(Number(e.currentTarget.value)) }}
        >
          <option
            key={`business-trip-expenses-expense-${expense.id}-expensetype-0`}
            value="0"
          >
            Select expense type
          </option>
          {expenseTypes!.map(et => <>
            <option
              key={`business-trip-expenses-expense-${id}-expensetype-${et.id}`}
              value={et.id}
            >
              {et.name}
            </option>
          </>)}
        </select>
      </div>
    </td>
    <td>
      <div className="select is-fullwidth">
        <DatePicker value={new Date(dateTime)} onChange={(dt) => dt && setDateTime(dt.toISOString())} />
      </div>
    </td>
    <td>
      <input className="input" type="text" />
    </td>
    <td>
      <div className="select is-fullwidth">
        <select
          value={currencyId}
          onChange={(e) => setCurrencyId(Number(e.currentTarget.value))}
        >
          <option
            key={`business-trip-expenses-expense-${id}-currency-0`}
            value="0"
          >
            Select currency
          </option>
          {currencies!.map(c => <>
            <option
              key={`business-trip-expenses-expense-${id}-currency-${c.id}`}
              value={c.id}
            >
              {c.name}
            </option>
          </>)}
        </select>
      </div>
    </td>
    <td>
      <input className="input" type="text" />
    </td>
    <td>
      <input className="checkbox" type="checkbox" />
    </td>
    <td>
      <input className="checkbox" type="checkbox" />
    </td>
    <td className={styles.expenseActions}>
      {newRow
        ? <button
          className="button is-danger"
          onClick={onRemove}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faMinus} />
          </span>
        </button>
        : <button
          className="button is-primary"
          onClick={onAdd}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      }
    </td>
  </tr>;
}

export default ExpenseComponent;