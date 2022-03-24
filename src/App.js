import { useState, useEffect } from "react";
import s from './App.module.css';

function App() {
  const [url, setUrl] = useState('https://www.cbr-xml-daily.ru/daily_json.js');
  const [previousURL, setPreviousURL] = useState('');
  const [valute, setValute] = useState([]);

  const getData = async() => {
    try {
      let res = await fetch(url)
      res = await res.json()
      setPreviousURL(res.PreviousURL);
      let arr = [];
      for (let key in res.Valute) {
        console.log(res.Valute[key])
        arr.push(res.Valute[key])
      }
      setValute(arr);
    } catch (err) {
      console.error(err);   
    }
  }

  useEffect(() => {
    getData();
  }, [url])

  return (
    <div>
      <h1>Valute APP</h1>
      <ul>
        {valute.map(item => 
          <li key={item.ID} className={s.item}>
            <span>{item.CharCode} {item.Value} {((item.Value - item.Previous) / item.Previous) * 100}%</span>
            <span className={s.tooltip}>{item.Name}</span>
          </li>)}
      </ul>
    </div>
  );
}

export default App;
