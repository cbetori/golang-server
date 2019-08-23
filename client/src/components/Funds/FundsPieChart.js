import React from "react";
import PieChartDash from '../Reusable/PieChart'

//Proivde $ comparison between funds
function FundsPieChart(props) {
  return (
    <React.Fragment>
      <PieChartDash data={props.fundsSize} title='Fund Size' dataKey='Sum_of_Gross_Capital' nameKey='Fund_ID'/>
    </React.Fragment>
  )
}
export default FundsPieChart;
