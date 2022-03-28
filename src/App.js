import { useState, useEffect } from "react";
import s from './App.module.css';
import dateFormat from "dateformat";
import List from './components/List/List'

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
      console.log(today)
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
      <p className={s.today}>Данные на: {dateFormat(today, 'dd.mm.yyyy')}</p> 
      <div className={s.caption}>
        <span>Валюта</span>
        <span>Курс</span>
        <span>Разница с пред. днем</span>
      </div>
      <List closePopup={closePopup} isCharts={isCharts} getCharts={getCharts} valute={valute} lastDays={lastDays} today={today} getLastDaysAll={getLastDaysAll} isPopup={isPopup} current={current} />
    </div>
  );
}

export default App;
