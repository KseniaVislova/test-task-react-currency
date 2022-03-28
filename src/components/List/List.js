import s from './List.module.css';
import classnames from "classnames";
import Popup from "../Popup/Popup";
import PropTypes from 'prop-types';

const List = ({ closePopup, isCharts, getCharts, valute, lastDays, today, getLastDaysAll, isPopup, current }) => {


  return (<ul className={s.list}>
    {valute.map(item => 
      <li key={item.ID} className={s.item} onClick={() => getLastDaysAll(item.CharCode)}>
        <div className={s.item__text}>
          <span className={s.valute}>
            {item.CharCode}
            <span className={s.tooltip}>{item.Name}</span>
          </span> 
          <span>{Math.floor(item.Value * 1000) / 1000}</span>
          <span className={classnames([s.percent], {[s.red]: item.Value > item.Previous})}>{Math.floor(((item.Value - item.Previous) / item.Previous) * 100 * 1000) / 1000} %</span>
         </div>
        {isPopup && current === item.CharCode
        ? <Popup closePopup={closePopup} isCharts={isCharts} getCharts={getCharts} item={item} lastDays={lastDays} today={today} />: ''}
      </li>)}
  </ul>)
}

List.propTypes = {
  closePopup: PropTypes.func,
  isCharts: PropTypes.bool,
  isPopup: PropTypes.bool,
  getCharts: PropTypes.func,
  getLastDaysAll: PropTypes.func,
  valute: PropTypes.array,
  lastDays: PropTypes.array,
  current: PropTypes.string,
  today: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
 }

export default List;