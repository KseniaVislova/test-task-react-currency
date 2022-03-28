import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dateFormat from "dateformat";
import PropTypes from 'prop-types';

const Charts = ({ getCharts, lastDays, item, today }) => {
  const arr = lastDays.map(item => {
    let obj = {};
    obj.name = dateFormat(new Date(Date.parse(item.date)).toLocaleString(), 'dd.mm.yyyy');
    obj.valute = item.valute.Value;
    return obj
  })

  arr.unshift({
      name: dateFormat(new Date(Date.parse(today)).toLocaleString(), 'dd.mm.yyyy'),
      valute: item.Value,
  })

  const data = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    data.push(arr[i]);
  }

  return (<div>
    <button onClick={getCharts}>Открыть список</button>
      <LineChart
        width={500}
        height={300}
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