import dateFormat from "dateformat";
import classnames from "classnames";
import s from './ExtraList.module.css';
import PropTypes from 'prop-types';

const ExtraList = ({ getCharts, item, lastDays, today }) => {


  return (<div className={s.container}>
    <button className={s.button} onClick={getCharts}>Открыть график</button>
    <div className={s.extra__caption}>
      <span>Дата</span>
      <span>Курс</span>
      <span>Номинал</span>
      <span>Разница с пред. днем</span>
    </div>
    <ul className={s.extra__list}>
      <li key={Math.random()}>
        <div className={s.extra__text}>
          <span>{dateFormat(today, 'dd.mm.yyyy')} </span>
          <span>{Math.floor(item.Value * 1000) / 1000}</span>
          <span>{item.Nominal}</span>
          <span className={classnames([s.percent], {[s.red]: item.Value > item.Previous})}>{Math.floor(((item.Value - item.Previous) / item.Previous) * 100 * 1000) / 1000} %</span>
        </div>
      </li>
      {lastDays.map(item => 
        <li key={Math.random()}>
          <div className={s.extra__text}>
            <span>{dateFormat(item.date, 'dd.mm.yyyy')} </span>
            <span>{Math.floor(item.valute.Value * 1000) / 1000}</span>
            <span>{item.valute.Nominal}</span>
            <span className={classnames([s.percent], {[s.red]: item.valute.Value > item.valute.Previous})}>{Math.floor((((item.valute.Value - item.valute.Previous) / item.valute.Previous)) * 100 * 1000) / 1000} %</span>
          </div>
        </li>
      )}
    </ul>  
  </div>)
}

ExtraList.propTypes = {
  getCharts: PropTypes.func,
  item: PropTypes.object,
  lastDays: PropTypes.array,
  today: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
 }

export default ExtraList;