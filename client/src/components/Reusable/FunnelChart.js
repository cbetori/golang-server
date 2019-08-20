import React from "react";
import { FunnelChart, Tooltip, Funnel, LabelList, Cell } from "recharts"

function FunnelChartDash(props) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div className='autoMargin'>
      <h3>{props.title}</h3>
      <FunnelChart width={600} height={400} >
          <Tooltip/>
          <Funnel data={props.data} dataKey={props.dataKey} nameKey={props.nameKey}>
            {props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            <LabelList position="center" fill="#ffffff" font-weight="bold" dataKey={props.shortName}/>
          </Funnel>
      </FunnelChart >
    </div>
  );
}
export default FunnelChartDash;