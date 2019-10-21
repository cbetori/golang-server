import React, {useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, Input, Modal, Table, Button, Form } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

function InvestorDetail (props) {
   
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

//Modal values newModalValue is = to oldModalValue
    const [newModalValue, newModalValueSet] = useState({})
    const [newModalDetail, newModalDetailSet] = useState({})

    function getCardDataDetail(){
        let tempObject = {}
        for(let element in propsDetails[0]){
            tempObject = propsDetails[element][0]
        }
        newModalDetailSet(tempObject)
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

    //Allows table to be sorted by date
    function sortArrayofObjects(a, b){
        let object1 = a["CF_Date"]
        let object2 = b["CF_Date"]
        
        return object1>object2 ? 1 : -1
    }

    function getTableData(){
        let tempArray = []
        const cashArray = JSON.parse(JSON.stringify(propsCash))
        cashArray.forEach(array => {
            array.forEach((row, index)=>{
                row.CF_Date = moment(row.CF_Date.substring(0,10)).format('MM/DD/YYYY')
                row.CF_Amount = numeral(row.CF_Amount).format('0,0.00')
                row.Edit= (<Button type="primary" key={index} onClick={()=>showModalCF(row)}>Edit</Button>)
                tempArray.push(row)
            })
        })
        tempArray.sort(sortArrayofObjects)
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
                tempArrayColumns.push(<Bar key={element} dataKey={element} fill={COLORS[count]} />)
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
        const [cfvisible, cfsetVisible]= useState(false)
        const [detailvisible, detailsetVisible]= useState(false)
        const [confirmLoading, setConfirmLoading]= useState(false)
        
        function showModalCF(row){
            let rowClone = {...row}
            newModalValueSet(rowClone)
            cfsetVisible(true)
        };

        function showModalDetail(){
            detailsetVisible(true)
        }

        function handleOk () {
            setConfirmLoading(true)
            let result = cleanFormatting()
            setTimeout(() => {
                props.handlePost(result, 'udpateInvCF')
                cfsetVisible(false)
                setConfirmLoading(false)
            }, 500);
        };

        function cleanFormatting(){
            let clone = {...newModalValue}
            clone.CF_Amount = numeral(clone.CF_Amount)._value
            newModalValueSet(clone)
            return clone
        }

        function handleOkDetail () {
            setConfirmLoading(true) 
            setTimeout(() => {
                props.handlePost(newModalDetail, 'updateInvDetail')
                detailsetVisible(false)
                setConfirmLoading(false)
            }, 500);
        };

        function handleCancel () {
            cfsetVisible(false)
            detailsetVisible(false)
          };

        function updateModalValues(value){
            let key = Object.keys(value)
            let clone = {...newModalValue}
            clone[key]  = value[key]
            newModalValueSet(clone)
            }
    
        function updateDetailValues(value){
            let key = Object.keys(value)
            let clone = {...cardDataDetail}
            clone[key]  = value[key]
            newModalDetailSet(clone)
            }

        
    if (props != undefined){
        return(
            <div style={{background: '#ECECEC'}}>
                <h1 style={{margin:25, marginBottom:0, fontSize:50}}>{cardDataDetail.Account_Name}</h1>
                <div style={{display: 'flex',padding: 30, paddingTop:0 }}>
                    <Card title='Details' bordered={false} style={{ width: 300, margin:25 }}>
                        <p>InvId:           {cardDataDetail.InvID}</p>
                        <p>CID:             {cardDataDetail.CID}</p>
                        <p>Feeder:          {cardDataDetail.Feeder}</p>
                        <p>Inv Type:        {cardDataDetail.Inv_Type}</p>
                        <p>Gross Capital:   {numeral(cardDataDetail.Gross_Capital).format('0,0')}</p>
                        <p>Net Capital:     {numeral(cardDataDetail.Net_Capital).format('0,0')}</p>
                        <p>Start Date:      {moment(cardDataDetail.Date_Inv).format('MM/DD/YYYY')}</p>
                        <p>End Date:        {moment(cardDataDetail.Date_Eliminate).format('MM/DD/YYYY')}</p>
                        <Button shape='circle' icon='edit' onClick={()=>showModalDetail()} style={{marginLeft:'90%', marginTop:'40px'}}/>
                    </Card>
                    
                    <Card title='Cashflows' bordered={false} style={{ width: 300, margin:25 }}>
                        {cardDataCash}
                    </Card>

                    <BarChart
                        width={900}
                        height={500}
                        data={barChartData}
                        barGap={-100} 
                        barCategoryGap={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="distrotype" type="category"/>
                        <YAxis dataKey="amount"/>
                        <Tooltip />
                        {barChartColumns}
                    </BarChart>
                </div>

                <Modal
                    title="Investor Detail"
                    visible={detailvisible}
                    onOk={handleOkDetail}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    >
                    <Input onChange={(e)=>updateDetailValues({Account_Name: e.target.value})} style={{margin: 5}} addonBefore='Account_Name' id='Account_Name' defaultValue={cardDataDetail.Account_Name}/>
                    <div style={{display: 'inline-flex'}}>
                        <Input onChange={(e)=>updateDetailValues({InvID: parseInt(e.target.value)})} style={{margin: 5}} addonBefore='InvID' id='InvID' defaultValue={cardDataDetail.InvID}/>
                        <Input onChange={(e)=>updateDetailValues({CID: parseInt(e.target.value)})} style={{margin: 5}} addonBefore='CID' id='CID' defaultValue={cardDataDetail.CID}/>
                    </div>
                    <div style={{display: 'inline-flex'}}>
                        <Input onChange={(e)=>updateDetailValues({Feeder: e.target.value})} style={{margin: 5}} addonBefore='Feeder' id='Feeder' defaultValue={cardDataDetail.Feeder}/>
                        <Input onChange={(e)=>updateDetailValues({Inv_Type: e.target.value})} style={{margin: 5}} addonBefore='Inv_Type' id='Inv_Type' defaultValue={cardDataDetail.Inv_Type}/>
                    </div>
                    <div style={{display: 'inline-flex'}}>
                        <Input onChange={(e)=>updateDetailValues({Gross_Capital: numeral(e.target.value)._value})} style={{margin: 5}} addonBefore='Gross_Capital' id='Gross_Capital' defaultValue={numeral(cardDataDetail.Gross_Capital).format('0,0')}/>
                        <Input onChange={(e)=>updateDetailValues({Net_Capital: numeral(e.target.value)._value})} style={{margin: 5}} addonBefore='Net_Capital' id='Net_Capital' defaultValue={numeral(cardDataDetail.Net_Capital).format('0,0')}/>
                    </div>
                    <div style={{display: 'inline-flex'}}>
                        <Input onChange={(e)=>updateDetailValues({Date_Inv: e.target.value})} style={{margin: 5}} addonBefore='Date_Inv' id='Date_Inv' defaultValue={moment(cardDataDetail.Date_Inv).format('MM/DD/YYYY')}/>
                        <Input onChange={(e)=>updateDetailValues({Date_Eliminate: e.target.value})} style={{margin: 5}} addonBefore='Date_Eliminate' id='Date_Eliminate' defaultValue={moment(cardDataDetail.Date_Eliminate).format('MM/DD/YYYY')}/>
                    </div>
                </Modal>

                <Modal
                    title="Edit Cash Flows"
                    visible={cfvisible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    >
                    <Form >
                        <div style={{display: 'inline-flex'}}>
                        <Input onChange={(e)=> updateModalValues({InvID: parseInt(e.target.value)})} style={{margin: 5}} id="InvID" addonBefore='InvID' defaultValue={newModalValue.InvID}/>
                        <Input onChange={(e)=> updateModalValues({CID: parseInt(e.target.value)})} style={{margin: 5}} addonBefore='CID' defaultValue={newModalValue.CID}/>
                        </div>
                        <Input onChange={(e)=> updateModalValues({Code_Name: e.target.value})} style={{margin: 5}} addonBefore='Type' defaultValue={newModalValue.Code_Name}/>
                        <Input onChange={(e)=> updateModalValues({CF_Date: e.target.value})} style={{margin: 5}} addonBefore='Date' defaultValue={newModalValue.CF_Date}/>
                        <Input onChange={(e)=> updateModalValues({CF_Amount: numeral(e.target.value)._value})} style={{margin: 5}} addonBefore='Amount' defaultValue={newModalValue.CF_Amount}/>
                    </Form>
                </Modal>
                <Table style={{marginRight: 75, background: '#f1f3f5'}} columns= {columns} dataSource={tableData} />
            </div>
        )
        }else{
            return(
                <div>z</div>
            )
            
        }
}

export default InvestorDetail