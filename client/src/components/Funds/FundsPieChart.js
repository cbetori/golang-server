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



//This works
// import React from "react";
// import { PieChart, Pie, Cell, Legend } from "recharts"

// //Proivde $ comparison between funds
// function FundsPieChart(props) {
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//   return (
//     <div>
//       <h3>Active Funds Size</h3>
//       <PieChart width={500} height={500} >
//           <Pie data={props.fundsSize} dataKey="sum_of_gross_capital" nameKey="Fund_ID" label legendType="square"  fill="#000">
//             {props.fundsSize.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//           </Pie>
//           <Legend/>
//       </PieChart >
//     </div>
//   );
// }
// export default FundsPieChart;


    // let data = props.fundsSize.map( res => {Fund_id: res.Fund_ID, Sum: res.Sum_of_Gross_Capital.toLocalSting('en')})
    // console.log(data)
    // let datasets = [{data:[props.fundsSize.map(res=> res.sum_of_gross_capital)]}]
    // let labels = [...props.fundsSize.keys()]
    // let data = {datasets: datasets, labels: labels}
    // console.log(data)
    // let doughnutChart = new Chart({
    //   type: 'doughnut',
    //   data: data,
    // })