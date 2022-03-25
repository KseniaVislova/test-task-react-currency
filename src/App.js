import { useState, useEffect } from "react";
import s from './App.module.css';
import dateFormat from "dateformat";
import classnames from "classnames";
import Charts from './components/Charts/Charts';

function App() {
  const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
  const [previousURL, setPreviousURL] = useState('');
  const [lastDaysAll, setLastDaysAll] = useState([]);
  const [lastDays, setLastDays] = useState([]);
  const [current, setCurrent] = useState('');
  const [isPopup, setPopup] = useState(false);
  const [isCharts, setCharts] = useState(false);
  const [valute, setValute] = useState([]);
  const [today, setToday] = useState(new Date());

  const getData = async() => {
    try {
      let res = await fetch(url)
      res = await res.json()
      setPreviousURL(res.PreviousURL);
      setToday(res.Date)
      let arr = [];
      for (let key in res.Valute) {
        arr.push(res.Valute[key])
      }
      setValute(arr);
    } catch (err) {
      console.error(err);   
    }
  }

  const getLastDaysAll = async(currency) => {
    if (lastDaysAll.length === 0) {
      let arr = [];
      let url = previousURL;
      for (let i = 0; i < 10; i++) {
        try {
          let res = await fetch(url);
          res = await res.json();
          url = res.PreviousURL;
          const obj = {date: res.Date, valute: res.Valute};
          arr.push(obj);
        } catch (err) {
          console.error(err);   
        }
      }
      setLastDaysAll(arr);
    }
    setCurrent(currency);
  }

  const getLastDays = () => {
    const arr = lastDaysAll.map(item => {
      let obj = {};
      for (let key in item) {
        if (key === 'date') {
          obj[key] = item[key]
        }
        if (key === 'valute') {
          for (let i in item[key]) {
            if (i === current) {
              obj[key] = item[key][i];
            }
          }
        }
      }
      return obj;
    })
    setLastDays(arr);
    setPopup(true);
  }

  const closePopup = () => {
    setCurrent('');
    setPopup(false);
    setLastDays([]);
  }

  const getCharts = () => {
    let status = !isCharts;
    setCharts(status);
  }

  useEffect(() => {
    getData();
  }, [url])

  useEffect(() => {
    getLastDays();
  }, [current])

  useEffect(() => {
  }, [isPopup])

  useEffect(() => {
  }, [isCharts])


  return (
    <div className={s.container}>
      <h1 className={s.title}>Список курса валют</h1>
      <p className={s.today}>Данные на: {dateFormat(new Date(Date.parse(today)).toLocaleString(), 'dd.mm.yyyy')}</p> 
      <div className={s.caption}>
        <span>Валюта</span>
        <span>Курс</span>
        <span>Разница с пред. днем</span>
      </div>
      <ul className={s.list}>
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
            ? <div className={s.extra}>
                <h3 className={s.extra__title}>История изменений: {item.Name} ({item.CharCode})</h3>
                <button className={s.extra__button} onClick={() => closePopup()}>x</button>
                {isCharts ? 
                <Charts getCharts={getCharts} item={item} today={today} lastDays={lastDays}/> : 
                <div>
                  <button onClick={getCharts}>Открыть график</button>
                  <div className={s.extra__caption}>
                    <span>Дата</span>
                    <span>Курс</span>
                    <span>Номинал</span>
                    <span>Разница с пред. днем</span>
                  </div>
                  <ul className={s.extra__list}>
                    <li key={Math.random()}>
                      <div className={s.extra__text}>
                        <span>{dateFormat(new Date(Date.parse(today)).toLocaleString(), 'dd.mm.yyyy')} </span>
                        <span>{Math.floor(item.Value * 1000) / 1000}</span>
                        <span>{item.Nominal}</span>
                        <span className={classnames([s.percent], {[s.red]: item.Value > item.Previous})}>{Math.floor(((item.Value - item.Previous) / item.Previous) * 100 * 1000) / 1000} %</span>
                      </div>
                    </li>
                    {lastDays.map(item => 
                      <li key={Math.random()}>
                        <div className={s.extra__text}>
                          <span>{dateFormat(new Date(Date.parse(item.date)).toDateString(), 'dd.mm.yyyy')} </span>
                          <span>{Math.floor(item.valute.Value * 1000) / 1000}</span>
                          <span>{item.valute.Nominal}</span>
                          <span className={classnames([s.percent], {[s.red]: item.valute.Value > item.valute.Previous})}>{Math.floor((((item.valute.Value - item.valute.Previous) / item.valute.Previous)) * 100 * 1000) / 1000} %</span>
                        </div>
                      </li>
                    )}
                  </ul>  
                </div> 
              }
            </div>: ''}
          </li>)}
      </ul>
    </div>
  );
}

export default App;
