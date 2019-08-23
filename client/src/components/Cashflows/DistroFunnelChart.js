import React from "react";
import FunnelChartDash from '../Reusable/FunnelChart'

//Proivde $ comparison between different distribution types
function DistroFunnelChart(props) {
    let data = () =>{
        let spec_distro 
        let gross_distro 
        let tax_distro 
        let comp_distro 
         if(props.cfTotals.length>0){
             spec_distro = props.cfTotals[0]["Special"]
             gross_distro = props.cfTotals[0]["Gross"]
             tax_distro = props.cfTotals[0]["Tax"]
             comp_distro = props.cfTotals[0]["Composite"]
            } 
        return data = [
            {name:'Special Distribution', value: spec_distro, shortName:'Special'},
            {name:'Gross Distribution', value: gross_distro, shortName:'Gross'},
            {name:'Composite Distribution', value: comp_distro, shortName:'Composite'},
            {name:'Tax Distribution', value: tax_distro,  shortName:'Tax'},
        ]
    }
  return (
    <React.Fragment>
      <FunnelChartDash data={data()} title='Distribution by Type' dataKey='value' nameKey='name' shortName='shortName'/>
    </React.Fragment>
  )
}
export default DistroFunnelChart;