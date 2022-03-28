import s from './Popup.module.css';
import Charts from '../Charts/Charts';
import ExtraList from '../ExtraList/ExtraList';

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

export default Popup;