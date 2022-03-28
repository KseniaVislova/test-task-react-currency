import s from './List.module.css';
import classnames from "classnames";
import Popup from "../Popup/Popup";

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

export default List;