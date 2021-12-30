import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { IsLoggedInState } from "../common/atom";
import { Layout } from "../component/layout";
import { Translate } from "../locales";
import { getBusinessTrips, getDestinations } from "../logics/travel-expense";
import { BusinessTripCollection, DestinationCollection } from "../models/travel-expense";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoginCheck from "../component/login-check";

export const List = () => {
  const router = useRouter();
  const isLoggedIn = useRecoilValue(IsLoggedInState);

  const [businessTrips, setBusinessTrips] = useState<BusinessTripCollection>(new BusinessTripCollection());
  const [destinations, setDestinations] = useState<DestinationCollection>(new DestinationCollection());
  const [hoveredBusinessTripId, setHoveredBusinessTripId] = useState(0);
  const [selectedBusinessTripIds, setSelectedBusinessTripIds] = useState<number[]>([]);
  const [listContents, setListContents] = useState<JSX.Element[]>([]);

  const t = new Translate(router.locale);

  const onLoginOk = async () => {
    if (!isLoggedIn) {
      return;
    }
    setBusinessTrips(await getBusinessTrips());
    setDestinations(await getDestinations());
  };

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
        <th onClick={() => openBusinesstrip(businessTrip.id)}>{businessTrip.id}</th>
        <td onClick={() => openBusinesstrip(businessTrip.id)}>{destinations.get(businessTrip.destinationId).name}</td>
        <td onClick={() => openBusinesstrip(businessTrip.id)}>{businessTrip.startDateTime.toDateString()}</td>
        <td onClick={() => openBusinesstrip(businessTrip.id)}>{businessTrip.endDateTime.toDateString()}</td>
      </tr>
    </>));
  }, [businessTrips, destinations, selectedBusinessTripIds, hoveredBusinessTripId]);

  const openBusinesstrip = (id: number) => {
    if (selectedBusinessTripIds.length > 1 || (selectedBusinessTripIds.length === 1 && selectedBusinessTripIds[0] !== id)) {
      toggleSelectBusinessTrip(id);
      return;
    }
    router.push(`/business-trip/${id}`);
  };

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
    <LoginCheck onLoginOk={onLoginOk}>
      <Layout title={t.t('Travel Expenditure List')}>
        <div className="container">
          <h3 className="title">{t.t('Travel Expenditure List')}</h3>
          <div className="field has-addons">
            <div className="control">
              <button
                className="button"
                onClick={() => openBusinesstrip(0)}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>Add</span>
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                disabled={selectedBusinessTripIds.length !== 1}
                onClick={() => openBusinesstrip(selectedBusinessTripIds[0])}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                <span>Edit</span>
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                disabled={selectedBusinessTripIds.length === 0}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span>Remove</span>
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
      </Layout>
    </LoginCheck>
  </>;
};

export default List;