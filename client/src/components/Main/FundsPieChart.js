import React from "react";
import PieChartDash from '../Reusable/PieChart'

//Proivde $ comparison between funds
function FundsPieChart(props) {
  return (
    <div className='autoMargin'>
      <PieChartDash data={props.fundsSize} title='Fund Size' dataKey='Sum_of_Gross_Capital' nameKey='Fund_ID'/>
    </div>
  )
}
export default FundsPieChart;
