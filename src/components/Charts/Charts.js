import LineChart from "recharts";

const Charts = ({ getCharts }) => {
  return (<div>
    <button onClick={getCharts}>Открыть список</button>
  </div>)
}

export default Charts;