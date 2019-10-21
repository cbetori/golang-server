import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import moment from 'moment'

function FundsDistroChart(props) {
    //This is to get the unique date values as well as format the dates
    const distinct = (value, index, self)=>{
        return self.indexOf(value) === index
    }
    let distroFundsArray = props.distributionsFund.map((row)=> row.Fund_ID)
    let fundsList = distroFundsArray.filter(distinct)
    function createNewCashflowObject(){
        let tempArray = []
        fundsList = fundsList.sort()
        for (let x=0; x < fundsList.length; x++){
            let spec_distro = 0
            let gross_distro = 0
            let tax_distro = 0
            let comp_distro = 0
            for (let i=0; i < props.distributionsFund.length; i++){
                if(fundsList[x] === props.distributionsFund[i].Fund_ID){
                    switch(props.distributionsFund[i].Code_Name){
                        case "Special Distribution":
                            spec_distro = spec_distro + Math.round(props.distributionsFund[i].CF_Amount)
                        break
                        case "Gross Distribution":
                            gross_distro = gross_distro + Math.round(props.distributionsFund[i].CF_Amount)
                        break
                        case "Tax Distribution":
                            tax_distro = tax_distro + Math.round(props.distributionsFund[i].CF_Amount)
                        break
                        case "Composite Tax Distro":
                            comp_distro = comp_distro + Math.round(props.distributionsFund[i].CF_Amount)
                        break
                        default:
                    }
                    
                }
            }
                tempArray.push({
                    Spec_Distro:spec_distro, 
                    Gross_Distro:gross_distro, 
                    Comp_Distro:comp_distro, 
                    Tax_Distro:tax_distro, 
                    Fund_ID:fundsList[x]
                })
        }
        return tempArray
    }

  return (
    <div className='autoMargin'>
        <h3>Distribution by Funds</h3>
        <BarChart width={600} height={450} data={createNewCashflowObject()}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="Fund_ID"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Spec_Distro" stackId="a" fill="#0088FE" />
        <Bar dataKey="Gross_Distro" stackId="a" fill="#00C49F" />
        <Bar dataKey="Comp_Distro" stackId="a" fill="#FF8042" />
        <Bar dataKey="Tax_Distro" stackId="a" fill="#FFBB28" />
        </BarChart>
    </div>
  );
}
export default FundsDistroChart;