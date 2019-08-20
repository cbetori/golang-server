import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts"

function PieChartDash(props) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div>
      <h3>{props.title}</h3>
      <PieChart width={500} height={500} >
          <Pie data={props.data} dataKey={props.dataKey} nameKey={props.nameKey} label legendType="square"  fill="#000">
            {props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Legend/>
      </PieChart >
    </div>
  );
}
export default PieChartDash;