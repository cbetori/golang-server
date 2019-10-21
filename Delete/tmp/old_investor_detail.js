import React, {useState, useEffect} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, Input, Modal, Table, Button } from 'antd'
import TableSelect from '../Reusable/TableSelect'
import moment from 'moment'
import numeral from 'numeral'

function InvestorDetail (props) {

        const [propDetials, propDetialsSet] = useState(props.investorsInvID.map(res => res.details[0]))
        const [propsCash, propsCashSet] = useState(props.investorsInvID.map(res => res.cashflows))

        const [tableDate, tableDateSet] = useState([])
        const [barChartData,barChartDataSet] = useState([])
        const [cardDataCash, cardDataCashSet] = useState([])
        const [cardDataDetail, cardDataDetailSet] = useState([])
        const [cashFlowTotals, cashFlowTotalsSet] = useState({})

        function getCashFlowTotals(){
            const tempObject ={
                'Gross Distribution': 0, 'Special Distribution':0,'Composite Tax Distro':0, 'Tax Distribution':0,
                'Tax Holdback':0, 'GP Promote':0, 'Management Fee':0, 'Servicing Fee':0, 'Commission':0, 
            }
            propsCash.forEach(array => {
                array.forEach((row, index)=>{
                    try{
                        tempObject[row.Code_Name] += row.CF_Amount
                    }catch(err){}
                })
            })
            cashFlowTotalsSet(tempObject)
        }

        function getTableData(){
            let tempArray = []
            propsCash.forEach(array => {
                array.forEach((row, index)=>{
                    row.CF_Date = moment(row.CF_Date).format('MM/DD/YYYY')
                    row.CF_Amount = numeral(row.CF_Amount).format('$0,0')
                    row.Edit= (<Button type="primary" key={index} onClick={showModal}>Edit</Button>)
                    tempArray.push(row)
                })
            })
            tableDateSet(tempArray)
        }

        function getBarChartData(){
            let tempArray = []
            for(let element in cashFlowTotals){
                if(cashFlowTotals[element] > 0 ){
                    tempArray.push({distrotype: element, amount: cashFlowTotals[element]})
                    tempArray[count][element] = cashFlowTotals[element]
                    tempArray.push(<Bar key={element} dataKey={element} fill={COLORS[count]}/>)
                       count += 1
                }
            }
            barChartDataSet(tempArray)
        }

        function getCardDataCash(){
            let tempArray = []
            for(let element in cashFlowTotals){
                cashFlowTotals[element] = numeral(cashFlowTotals[element]).format('$0,0')
                tempArray.push(<p key={element}>{element}:  {cashFlowTotals[element]}</p>)
            }
            cardDataCashSet(tempArray)
        }

        useEffect(()=>{
            getCashFlowTotals()
            getTableData()
            getBarChartData()
            getCardDataCash()
        },[])

        //Add account details to its own object
        let dataDetails = props.investorsInvID.map(res => res.details[0])
        let details = {}
        for (let element in dataDetails[0]){
            details[element] = dataDetails[0][element]
        }
        //Create an object to store cashflow totals. Create clean array of tableData
        let dataCash = props.investorsInvID.map(res => res.cashflows)
        let tableData = []
        let initialBarChartData = []
        // let cashFlowTotals = {
        //     'Gross Distribution': 0, 
        //     'Special Distribution':0,
        //     'Composite Tax Distro':0, 
        //     'Tax Distribution':0,
        //     'Tax Holdback':0, 
        //     'GP Promote':0, 
        //     'Management Fee':0, 
        //     'Servicing Fee':0, 
        //     'Commission':0, 
        // }

        let columns = [
            {title: 'Edit', dataIndex:'Edit',  key: 'Edit', width: '10%'},
            {title: 'InvID', dataIndex:'InvID',  key: 'InvID', width: '15%'},
            {title: 'CID', dataIndex:'CID', key: 'CID', width: '15%'},
            {title: 'Code_Name', dataIndex:'Code_Name',  key: 'Code_Name', width: '20%'},
            {title: 'CF_Amount', dataIndex:'CF_Amount', key: 'CF_Amount', width: '20%'},
            {title: 'CF_Date', dataIndex:'CF_Date',  key: 'CF_Date', width: '20%'},
        ]

        dataCash.forEach(array => {
            array.forEach((row, index)=>{
                try{
                    // console.log(row)
                    cashFlowTotals[row.Code_Name] += row.CF_Amount
                    row.CF_Date = moment(row.CF_Date).format('MM/DD/YYYY')
                    row.CF_Amount = numeral(row.CF_Amount).format('$0,0')
                    row.Edit= (<Button type="primary" key={index} onClick={showModal}>Edit</Button>)
                    tableData.push(row)
                }catch(err){}
            })
        });
        
        //Create cashflow total card. Create array to hold barchart data. Create array to hold <Bar> tags.  
        let cashTotalsCard = []
        // let barChartData = []
        let barChartColors =[]
        let count = 0
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',  '#FF8042', '#FF8042', '#FF8042', '#FF8042', '#FF8042'];
        for(let element in cashFlowTotals){
     
            if(cashFlowTotals[element] > 0 ){
                console.log(element)
                barChartData.push({distrotype: element, amount: cashFlowTotals[element]})
                barChartData[count][element] = cashFlowTotals[element]
                barChartColors.push(<Bar key={element} dataKey={element} fill={COLORS[count]}/>)
                   count += 1
            }
            cashFlowTotals[element] = numeral(cashFlowTotals[element]).format('$0,0')
            cashTotalsCard.push(<p key={element}>{element}:  {cashFlowTotals[element]}</p>)
    
        }

    //Modal
        const [visible, setVisible]= useState(false)
        const [confirmLoading, setConfirmLoading]= useState(false)
        
        function showModal(){
            setVisible(true)
        };

        function handleOk () {
            setConfirmLoading(false)
            setTimeout(() => {
                setVisible(false)
                setConfirmLoading(false)
            }, 2000);
        };

        function handleCancel () {
            setVisible(false)
          };
    //Form
        function fillForm(){

        }

        return(
            <div style={{background: '#ECECEC'}}>
                <div style={{display: 'flex',padding: '30px' }}>
                    <Card title={details.Account_Name} bordered={false} style={{ width: 300, margin:25 }}>
                        <p>InvId:           {details.InvID}</p>
                        <p>CID:             {details.CID}</p>
                        <p>Feeder:          {details.Feeder}</p>
                        <p>Inv Type:        {details.Inv_Type}</p>
                        <p>Gross Capital:   {numeral(details.Gross_Capital).format('$0,0')}</p>
                        <p>Net Capital:     {numeral(details.Net_Capital).format('$0,0')}</p>
                        <p>Start Date:      {moment(details.Date_Inv).format('MM/DD/YYYY')}</p>
                        <p>End Date:        {moment(details.Date_Eliminate).format('MM/DD/YYYY')}</p>
                    </Card>
                    <br/>
                    <Card title='Cashflows' bordered={false} style={{ width: 300, margin:25 }}>
                        {cashTotalsCard}
                    </Card>
                    <BarChart
                        width={900}
                        height={500}
                        data={barChartData}
                        margin={{
                        top: 25, right: 30, left: 20, bottom: 5,
                        }}
                    > {cashTotalsCard.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="distrotype" />
                        <YAxis dataKey="amount"/>
                        <Tooltip />
                        {barChartColors}
                    </BarChart>
                </div>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >

                </Modal>
                    <Table style={{marginRight: 75, background: '#f1f3f5'}} columns= {columns} dataSource={tableData} />
                    {/* <Table onClick={showModal} style={{marginRight: 75, background: '#f1f3f5'}} columns= {columns} dataSource={tableData} /> */}
            </div>
        )
}

export default InvestorDetail