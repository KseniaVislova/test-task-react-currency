import s from './Popup.module.css';
import Charts from '../Charts/Charts';
import ExtraList from '../ExtraList/ExtraList';
import PropTypes from 'prop-types';

const Popup = ({ closePopup, isCharts, getCharts, item, lastDays, today }) => {
  return (
    <div className={s.extra}>
      <h3 className={s.extra__title}>История изменений: {item.Name} ({item.CharCode})</h3>
      <button className={s.extra__button} onClick={() => closePopup()}>x</button>
      {isCharts ? 
      <Charts getCharts={getCharts} item={item} today={today} lastDays={lastDays}/> : 
      <ExtraList getCharts={getCharts} item={item} lastDays={lastDays} today={today}/>
    }
  </div>
  )
}

Popup.propTypes = {
  closePopup: PropTypes.func,
  isCharts: PropTypes.bool,
  getCharts: PropTypes.func,
  item: PropTypes.object,
  lastDays: PropTypes.array,
  today: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
 }

export default Popup;