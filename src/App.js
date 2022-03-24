import { useState, useEffect } from "react";
import s from './App.module.css';

function App() {
  const [url, setUrl] = useState('https://www.cbr-xml-daily.ru/daily_json.js');
  const [previousURL, setPreviousURL] = useState('');
  const [lastDaysAll, setLastDaysAll] = useState([]);
  const [lastDays, setLastDays] = useState([]);
  const [current, setCurrent] = useState('');
  const [valute, setValute] = useState([]);

  const getData = async() => {
    try {
      let res = await fetch(url)
      res = await res.json()
      setPreviousURL(res.PreviousURL);
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
    console.log(lastDays);
    let arr = [];
    let url = previousURL;
    for (let i = 0; i < 10; i++) {
      try {
        let res = await fetch(url);
        res = await res.json();
        console.log(res.Valute);
        url = res.PreviousURL;
        const obj = {date: res.Date, valute: res.Valute};
        arr.push(obj);
      } catch (err) {
        console.error(err);   
      }
    }
    setLastDaysAll(arr);
    setCurrent(currency)
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
    console.log(arr);
    setLastDays(arr);
  }

  useEffect(() => {
    getData();
  }, [url])

  useEffect(() => {
    getLastDays()
  }, [lastDaysAll])

  useEffect(() => {
    console.log(lastDays)
  }, [lastDays])

  return (
    <div>
      <h1>Valute APP</h1>
      <ul>
        {valute.map(item => 
          <li key={item.ID} className={s.item} onClick={() => getLastDaysAll(item.CharCode)}>
            <span>{item.CharCode} {item.Value} {((item.Value - item.Previous) / item.Previous) * 100}%</span>
            <span className={s.tooltip}>{item.Name}</span>
            {current === item.CharCode 
            ? <ul>
              {lastDays.map(item => 
                <li>{item.date} <span>{item.valute.Value} {((item.valute.Value - item.valute.Previous) / item.valute.Previous) * 100}%</span></li>
              )}
            </ul> : ''}
          </li>)}
      </ul>
    </div>
  );
}

export default App;
