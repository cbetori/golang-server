import React from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'
import moment from 'moment'

function DistroChart(props) {
    //This is to get the unique date values as well as format the dates
    const distinct = (value, index, self)=>{
        return self.indexOf(value) === index
    }
    let distoDatesArray = props.distributions.map((row)=> moment(row.CF_Date).format('MM/YY'))
    let datesList = distoDatesArray.filter(distinct)
    function createNewCashflowObject(){
        let tempArray = []
        datesList = datesList.sort()
        for (let x=0; x < datesList.length; x++){
            let spec_distro = 0
            let gross_distro = 0
            let tax_distro = 0
            let comp_distro = 0
            for (let i=0; i < props.distributions.length; i++){
                if(datesList[x] === moment(props.distributions[i].CF_Date).format('MM/YY')){
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
            }
                tempArray.push({
                    Spec_Distro:spec_distro, 
                    Gross_Distro:gross_distro, 
                    Comp_Distro:comp_distro, 
                    Tax_Distro:tax_distro, 
                    CF_Date:datesList[x]
                })
        }
        return tempArray
    }

  return (
        <div className='autoMargin'>
            <h3>Distribution History</h3>
            <AreaChart width={1050} height={450} data={createNewCashflowObject()}
            margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorSD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="#0088FE" stopOpacity={0.8}/>
                <stop offset="75%" stopColor="#0088FE" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="#00C49F" stopOpacity={0.8}/>
                <stop offset="75%" stopColor="#00C49F" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="#FF8042" stopOpacity={0.8}/>
                <stop offset="75%" stopColor="#FF8042" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="#FFBB28" stopOpacity={0.8}/>
                <stop offset="75%" stopColor="#FFBB28" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="CF_Date" />
            <YAxis dataKey="Spec_Distro"/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="Spec_Distro" stroke="#0088FE" fillOpacity={1} fill="url(#colorSD)" />
            <Area type="monotone" dataKey="Gross_Distro" stroke="#0088FE" fillOpacity={1} fill="url(#colorGD)" />
            <Area type="monotone" dataKey="Comp_Distro" stroke="#FFBB28" fillOpacity={1} fill="url(#colorCD)" />
            <Area type="monotone" dataKey="Tax_Distro" stroke="#FF8042" fillOpacity={1} fill="url(#colorTD)" />
            </AreaChart>
        </div>
  );
}
export default DistroChart;