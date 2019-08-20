import React, {useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, Input, Modal, Table, Button, Form, FormGroup } from 'antd'
import { useSelector } from 'react-redux'
//import TableSelect from '../Reusable/TableSelect'
import moment from 'moment'
import numeral from 'numeral'
import { updateInvestorCashFlow }  from '../../actions/actions'


function InvestorDetail (props) {
    console.log(props)
//Props State
    const propsHolder = useSelector( props => props)
    const propsDetails = useSelector(props => props.investorsInvID.map(res =>res.details))
    const propsCash = useSelector(props =>props.investorsInvID.map(res => res.cashflows))

//Other State
    const [tableData, tableDataSet] = useState([])
    const [barChartData,barChartDataSet] = useState([])
    const [barChartColumns,barChartColumnsSet] = useState([])
    const [cardDataCash, cardDataCashSet] = useState([])
    const [cardDataDetail, cardDataDetailSet] = useState([])

    const [newModalValue, newModalValueSet] = useState({})
    const [oldModalValues, oldModalValuesSet] = useState({})

    function getCardDataDetail(){
        let tempObject = {}
        for(let element in propsDetails[0]){
            tempObject = propsDetails[element][0]
        }
        cardDataDetailSet(tempObject)
    }

    function getCardDataCash(){
        let tempArray = []
        let cash = getCashFlowTotals()
        for(let element in cash){
            cash[element] = numeral(cash[element]).format('0,0')
            tempArray.push(<p key={element}>{element}:  {cash[element]}</p>)
        }
        cardDataCashSet(tempArray)
    }

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
        return tempObject
    }

    let columns = [
        {title: 'Edit', dataIndex:'Edit',  key: 'Edit', width: '10%'},
        {title: 'InvID', dataIndex:'InvID',  key: 'InvID', width: '15%'},
        {title: 'CID', dataIndex:'CID', key: 'CID', width: '15%'},
        {title: 'Type', dataIndex:'Code_Name',  key: 'Code_Name', width: '20%'},
        {title: 'Amount', dataIndex:'CF_Amount', key: 'CF_Amount', width: '20%'},
        {title: 'Date', dataIndex:'CF_Date',  key: 'CF_Date', width: '20%'},
    ]   
    function getTableData(){
        let tempArray = []
        const cashArray = JSON.parse(JSON.stringify(propsCash))
        cashArray.forEach(array => {
            array.forEach((row, index)=>{
                row.CF_Date = moment(row.CF_Date).format('MM/DD/YYYY')
                row.CF_Amount = numeral(row.CF_Amount).format('0,0')
                row.Edit= (<Button type="primary" key={index} onClick={()=>showModal(row)}>Edit</Button>)
                tempArray.push(row)
            })
        })
        tableDataSet(tempArray)
    }

    function getBarChartData(){
         //Create cashflow total card. Create array to hold barchart data. Create array to hold <Bar> tags.  
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',  '#FF8042', '#FF8042', '#FF8042', '#FF8042', '#FF8042'];
        let tempArrayData = []
        let tempArrayColumns =[]
        let count = 0
        let cash = getCashFlowTotals()
        for(let element in cash){
            if(cash[element] > 0 ){
                tempArrayData.push({distrotype: element, amount: cash[element]})
                tempArrayData[count][element] = cash[element]
                tempArrayColumns.push(<Bar key={element} dataKey={element} fill={COLORS[count]}/>)
                    count += 1
            }
        }
        barChartColumnsSet(tempArrayColumns)
        barChartDataSet(tempArrayData)
    }
 
    useEffect(()=>{
        getCashFlowTotals()
        getTableData()
        getBarChartData()
        getCardDataCash()
        getCardDataDetail()
    },[propsHolder]) 

    //Modal
        const [visible, setVisible]= useState(false)
        const [confirmLoading, setConfirmLoading]= useState(false)
        
        function showModal(row){
            let rowClone = {...row}
            rowClone.CF_Amount = parseFloat(rowClone.CF_Amount)
            oldModalValuesSet(rowClone)
            newModalValueSet(rowClone)
            setVisible(true)
        };

        function handleOk () {
            setConfirmLoading(false)
            setTimeout(() => {
                // updateInvestorCashFlow(oldModalValues, newModalValue)
                setVisible(false)
                setConfirmLoading(false)
            }, 500);
        };

        function handleCancel () {
            setVisible(false)
          };

        function updateModalValues(value){
            console.log(value)
            let key = Object.keys(value)
            let clone = JSON.parse(JSON.stringify(newModalValue))
            clone[key]  = value[0]
            // for (let e in newModalValue){
            //     // cleanInfo[Ob]
            //     if(Object.keys(value)=== e){
                    
            //     }
            }

        return(
           
            <div style={{background: '#ECECEC'}}>
                <div style={{display: 'flex',padding: '30px' }}>
                    <Card title={cardDataDetail.Account_Name} bordered={false} style={{ width: 300, margin:25 }}>
                        <p>InvId:           {cardDataDetail.InvID}</p>
                        <p>CID:             {cardDataDetail.CID}</p>
                        <p>Feeder:          {cardDataDetail.Feeder}</p>
                        <p>Inv Type:        {cardDataDetail.Inv_Type}</p>
                        <p>Gross Capital:   {numeral(cardDataDetail.Gross_Capital).format('0,0')}</p>
                        <p>Net Capital:     {numeral(cardDataDetail.Net_Capital).format('0,0')}</p>
                        <p>Start Date:      {moment(cardDataDetail.Date_Inv).format('MM/DD/YYYY')}</p>
                        <p>End Date:        {moment(cardDataDetail.Date_Eliminate).format('MM/DD/YYYY')}</p>
                    </Card>
                    <br/>
                    <Card title='Cashflows' bordered={false} style={{ width: 300, margin:25 }}>
                        {cardDataCash}
                    </Card>
                    <BarChart
                        width={900}
                        height={500}
                        data={barChartData}
                        margin={{
                        top: 25, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="distrotype" />
                        <YAxis dataKey="amount"/>
                        <Tooltip />
                        {barChartColumns}
                    </BarChart>
                </div>
                <Modal
                    title="Edit Cash Flows"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}>
                        <div style={{display: 'inline-flex'}}>
                        <Input onChange={(e)=>  updateModalValues({InvID: e.target.value})} id="InvID" addonBefore='InvID' defaultValue={oldModalValues.InvID}/>
                        <Input style={{margin: 5}} addonBefore='CID' defaultValue={oldModalValues.CID}/>
                        </div>
                        <Input style={{margin: 5}} addonBefore='Type' defaultValue={oldModalValues.Code_Name}/>
                        <Input style={{margin: 5}} addonBefore='Date' defaultValue={oldModalValues.CF_Date}/>
                        <Input  style={{margin: 5}} addonBefore='Amount' defaultValue={oldModalValues.CF_Amount}/>
                        <Button type="submit"  >Submit</Button>
                </Modal>
                    <Table style={{marginRight: 75, background: '#f1f3f5'}} columns= {columns} dataSource={tableData} />
            </div>
        )
}

export default InvestorDetail

{/* <Input  onChange={(e)=>  updateModalValues({InvID: e.target.value})}  id="InvID" addonBefore='InvID' defaultValue={oldModalValues.InvID}/>
<Input style={{margin: 5}} addonBefore='CID' defaultValue={oldModalValues.CID}/>
</div>
<Input style={{margin: 5}} addonBefore='Type' defaultValue={oldModalValues.Code_Name}/>
<Input style={{margin: 5}} addonBefore='Date' defaultValue={oldModalValues.CF_Date}/>
<Input onChange={(e)=>  updateModalValues({CF_Amount: e.target.value})} style={{margin: 5}} addonBefore='Amount' defaultValue={oldModalValues.CF_Amount}/> */}