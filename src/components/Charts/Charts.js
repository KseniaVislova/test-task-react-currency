import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import s from './Charts.module.css';
import dateFormat from "dateformat";
import PropTypes from 'prop-types';

const Charts = ({ getCharts, lastDays, item, today }) => {
  const arr = lastDays.map(item => {
    let obj = {};
    obj.name = dateFormat(item.date, 'dd.mm.yyyy');
    obj.valute = item.valute.Value;
    return obj
  })

  arr.unshift({
      name: dateFormat(today, 'dd.mm.yyyy'),
      valute: item.Value,
  })

  const data = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    data.push(arr[i]);
  }

  return (<div>
    <button className={s.button} onClick={getCharts}>Открыть список</button>
    <div className={s.container} style={{height: 300}}>
      <ResponsiveContainer>
        <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="valute" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
      </ResponsiveContainer>
      </div>
  </div>)
}

Charts.propTypes = {
  getCharts: PropTypes.func,
  item: PropTypes.object,
  lastDays: PropTypes.array,
  today: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
 }

export default Charts;