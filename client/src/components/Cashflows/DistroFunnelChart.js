import React from "react";
import FunnelChartDash from '../Reusable/FunnelChart'

//Proivde $ comparison between different distribution types

function DistroFunnelChart(props) {
    console.log(props.distributions)
    let data = () =>{
        let spec_distro = 0
        let gross_distro = 0
        let tax_distro = 0
        let comp_distro = 0
        for(let i = 0; i < props.distributions.length; i++){
            switch(props.distributions[i].Code_Name){
                case "Special Distribution":
                    spec_distro = spec_distro + Math.round(props.distributions[i].CF_Amount)
                break
                case "Gross Distribution":
                    gross_distro = gross_distro + Math.round(props.distributions[i].CF_Amount)
                break
                case "Tax Distribution":
                    tax_distro = tax_distro + Math.round(props.distributions[i].CF_Amount)
                break
                case "Composite Tax Distro":
                    comp_distro = comp_distro + Math.round(props.distributions[i].CF_Amount)
                break
            }
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