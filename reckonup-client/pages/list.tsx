import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../component/layout";
import { Translate } from "../locales";
import { deleteBusinessTrip, getBusinessTrips, getDestinations } from "../logics/travel-expense";
import { BusinessTripCollection, DestinationCollection } from "../models/travel-expense";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPencilAlt, faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import LoginCheck from "../component/login-check";
import * as dateFns from 'date-fns';
import { useRecoilValue } from "recoil";
import { UserState } from "../common/atom";

export const List = () => {
  const router = useRouter();

  const user = useRecoilValue(UserState);

  const [businessTrips, setBusinessTrips] = useState<BusinessTripCollection>(new BusinessTripCollection());
  const [destinations, setDestinations] = useState<DestinationCollection>(new DestinationCollection());
  const [hoveredBusinessTripId, setHoveredBusinessTripId] = useState(0);
  const [selectedBusinessTripIds, setSelectedBusinessTripIds] = useState<number[]>([]);
  const [listContents, setListContents] = useState<JSX.Element[]>([]);
  const [isLoginOk, setIsLoginOk] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

  const t = new Translate(router.locale);

  const loadData = async () => {
    if (!isLoginOk) {
      return;
    }
    setBusinessTrips(await getBusinessTrips(user.id));
    setDestinations(await getDestinations());
    setSelectedBusinessTripIds([]);
  }

  useEffect(() => {
    loadData();
  }, [isLoginOk]);

  useEffect(() => {
    setListContents(businessTrips.map((businessTrip) => <>
      <tr
        className={`is-clickable ${ifBusinessTripHovered(businessTrip.id) ? 'is-selected' : ''}`}
        key={`businessTrip-${businessTrip.id}`}
        onMouseOver={() => setHoveredBusinessTripId(businessTrip.id)}
        onMouseLeave={() => setHoveredBusinessTripId(0)}
      >
        <td onClick={() => toggleSelectBusinessTrip(businessTrip.id)}>
          <input
            type="checkbox"
            checked={ifBusinessTripSelected(businessTrip.id)}
            onChange={(e) => setSelectBusinessTrip(businessTrip.id, e.currentTarget.checked)}
            placeholder="selected"
          />
        </td>
        <th onClick={() => openBusinessTrip(businessTrip.id)}>{businessTrip.id}</th>
        <td onClick={() => openBusinessTrip(businessTrip.id)}>{destinations.get(businessTrip.destinationId).name}</td>
        <td onClick={() => openBusinessTrip(businessTrip.id)}>{dateFns.format(businessTrip.startDateTime, t.t('SHORT_DATE_TIME_FORMAT'))}</td>
        <td onClick={() => openBusinessTrip(businessTrip.id)}>{dateFns.format(businessTrip.endDateTime, t.t('SHORT_DATE_TIME_FORMAT'))}</td>
      </tr>
    </>));
  }, [businessTrips, destinations, selectedBusinessTripIds, hoveredBusinessTripId]);

  const openBusinessTrip = (id: number) => {
    if (selectedBusinessTripIds.length > 1 || (selectedBusinessTripIds.length === 1 && selectedBusinessTripIds[0] !== id)) {
      toggleSelectBusinessTrip(id);
      return;
    }
    router.push(`/business-trip/${id}`);
  };

  const onDeleteButtonClicked = async () => {
    await Promise.all(selectedBusinessTripIds.map(id => deleteBusinessTrip(user.id, id)));
    await loadData();
    setIsDeleteConfirmationModalOpen(false);
  }

  const setSelectBusinessTrip = (id: number, checked: boolean) => {
    setSelectedBusinessTripIds([
      ...selectedBusinessTripIds.filter(v => v !== id),
      ...(checked ? [id] : [])])
  };

  const ifBusinessTripSelected = (id: number) => selectedBusinessTripIds.filter(v => v === id).length > 0;

  const toggleSelectBusinessTrip = (id: number) => {
    const selected = ifBusinessTripSelected(id);
    setSelectBusinessTrip(id, !selected);
  }

  const ifBusinessTripHovered = (id: number) => hoveredBusinessTripId === id;

  return <>
    <LoginCheck onLoginOk={() => setIsLoginOk(true)}>
      <Layout title={t.t('Travel Expenditure List')} navigation="list">
        <div className="container">
          <h3 className="title is-3">{t.t('Travel Expenditure List')}</h3>
          <div className="field buttons has-addons">
            <div className="control">
              <button
                className="button"
                onClick={() => openBusinessTrip(0)}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>{t.t('Add')}</span>
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                disabled={selectedBusinessTripIds.length !== 1}
                onClick={() => openBusinessTrip(selectedBusinessTripIds[0])}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                <span>{t.t('Edit')}</span>
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                disabled={selectedBusinessTripIds.length === 0}
                onClick={() => setIsDeleteConfirmationModalOpen(true)}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span>{t.t('Delete')}</span>
              </button>
            </div>
          </div>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </th>
                <th>{t.t('#')}</th>
                <th>{t.t('Destination')}</th>
                <th>{t.t('Start date time')}</th>
                <th>{t.t('End date time')}</th>
              </tr>
            </thead>
            <tbody>
              {listContents}
            </tbody>
          </table>
        </div>
        <div className={`modal ${isDeleteConfirmationModalOpen ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <span className="icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
              <p className="modal-card-title">{t.t('You are trying to delete business trips')}</p>
              <button
                className="delete"
                aria-label={t.t('close')}
                onClick={() => setIsDeleteConfirmationModalOpen(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>{t.t('Are you sure to delete the following business trips?:')}</p>
              <ul>
                {selectedBusinessTripIds.sort((a, b) => a - b).map(id => {
                  const businessTrip = businessTrips.get(id);
                  return <li key={`deleting-businesstrip-${id}`}>{id}: {destinations.get(businessTrip.destinationId).name} {dateFns.format(businessTrip.startDateTime, t.t('SHORT_DATE_TIME_FORMAT'))} ~ {dateFns.format(businessTrip.endDateTime, t.t('SHORT_DATE_TIME_FORMAT'))}</li>
                })}
              </ul>
            </section>
            <footer className="modal-card-foot buttons is-right">
              <button
                className="button is-danger"
                onClick={() => onDeleteButtonClicked()}
              >
                {t.t('Yes, I am sure.')}
              </button>
              <button
                className="button"
                onClick={() => setIsDeleteConfirmationModalOpen(false)}
              >
                {t.t('No')}
              </button>
            </footer>
          </div>
        </div>
      </Layout>
    </LoginCheck>
  </>;
};

export default List;