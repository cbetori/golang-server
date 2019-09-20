import React, {useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, Input, Modal, Table, Button, Form } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { func } from "prop-types";

function InvestorDetail (props) {
//Props State

    //const investor = useSelector(()=> {return props.investorTest["investor"]})
    // const investment = useSelector(()=> {return props.investorTest["investment"]})
    // const cashflow = useSelector(()=> {return props.investorTest["cashflow"]})


//Other State
    const [investor, investorSet] = useState()
    const [investment, investmentSet] = useState()
    const [cashflow, cashflowSet] = useState()
    console.log({investor, investment, cashflow})

    useEffect(()=>{
        investorSet(props.investorTest["investor"])
        investmentSet(props.investorTest["investment"])
        cashflowSet(props.investorTest["cashflow"])
    }) 


    

//Modal values newModalValue is = to oldModalValue
    // const [newModalValue, newModalValueSet] = useState({})
    // const [newModalDetail, newModalDetailSet] = useState({})

    // function getCardDataDetail(){
    //     let tempObject = {}
    //     for(let element in propsDetails[0]){
    //         tempObject = propsDetails[element][0]
    //     }
    //     newModalDetailSet(tempObject)
    //     cardDataDetailSet(tempObject)
    // }

    // function getCardDataCash(){
    //     let tempArray = []
    //     let cash = getCashFlowTotals()
    //     for(let element in cash){
    //         cash[element] = numeral(cash[element]).format('0,0')
    //         tempArray.push(<p key={element}>{element}:  {cash[element]}</p>)
    //     }
    //     cardDataCashSet(tempArray)
    // }

    // function getCashFlowTotals(){
    //     const tempObject ={
    //         'Gross Distribution': 0, 'Special Distribution':0,'Composite Tax Distro':0, 'Tax Distribution':0,
    //         'Tax Holdback':0, 'GP Promote':0, 'Management Fee':0, 'Servicing Fee':0, 'Commission':0, 
    //     }
    //     propsCash.forEach(array => {
    //         array.forEach((row, index)=>{
    //             try{
    //                 tempObject[row.Code_Name] += row.CF_Amount
    //             }catch(err){}
    //         })
    //     })
    //     return tempObject
    // }

    // let columns = [
    //     {title: 'Edit', dataIndex:'Edit',  key: 'Edit', width: '10%'},
    //     {title: 'InvID', dataIndex:'InvID',  key: 'InvID', width: '15%'},
    //     {title: 'CID', dataIndex:'CID', key: 'CID', width: '15%'},
    //     {title: 'Type', dataIndex:'Code_Name',  key: 'Code_Name', width: '20%'},
    //     {title: 'Amount', dataIndex:'CF_Amount', key: 'CF_Amount', width: '20%'},
    //     {title: 'Date', dataIndex:'CF_Date',  key: 'CF_Date', width: '20%'},
    // ]   

    // function getTableData(){
    //     let tempArray = []
    //     const cashArray = JSON.parse(JSON.stringify(propsCash))
    //     cashArray.forEach(array => {
    //         array.forEach((row, index)=>{
    //             row.CF_Date = moment(row.CF_Date).format('MM/DD/YYYY')
    //             row.CF_Amount = numeral(row.CF_Amount).format('0,0.00')
    //             row.Edit= (<Button type="primary" key={index} onClick={()=>showModalCF(row)}>Edit</Button>)
    //             tempArray.push(row)
    //         })
    //     })
    //     tableDataSet(tempArray)
    // }

    // function getBarChartData(){
    //      //Create cashflow total card. Create array to hold barchart data. Create array to hold <Bar> tags.  
    //     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',  '#FF8042', '#FF8042', '#FF8042', '#FF8042', '#FF8042'];
    //     let tempArrayData = []
    //     let tempArrayColumns =[]
    //     let count = 0
    //     let cash = getCashFlowTotals()
    //     for(let element in cash){
    //         if(cash[element] > 0 ){
    //             tempArrayData.push({distrotype: element, amount: cash[element]})
    //             tempArrayData[count][element] = cash[element]
    //             tempArrayColumns.push(<Bar key={element} dataKey={element} fill={COLORS[count]} />)
    //                 count += 1
    //         }
    //     }
    //     barChartColumnsSet(tempArrayColumns)
    //     barChartDataSet(tempArrayData)
    // }
 
    // useEffect(()=>{
    //     getCashFlowTotals()
    //     getTableData()
    //     getBarChartData()
    //     getCardDataCash()
    //     getCardDataDetail()
    // },[propsHolder]) 

    //Modal
        // const [cfvisible, cfsetVisible]= useState(false)
        // const [detailvisible, detailsetVisible]= useState(false)
        // const [confirmLoading, setConfirmLoading]= useState(false)
        
        // function showModalCF(row){
        //     let rowClone = {...row}
        //     newModalValueSet(rowClone)
        //     cfsetVisible(true)
        // };

        // function showModalDetail(){
        //     detailsetVisible(true)
        // }

        // function handleOk () {
        //     setConfirmLoading(true)
        //     let result = cleanFormatting()
        //     setTimeout(() => {
        //         props.updateInvestorCashFlow(result)
        //         cfsetVisible(false)
        //         setConfirmLoading(false)
        //     }, 500);
        // };

        // function cleanFormatting(){
        //     let clone = {...newModalValue}
        //     clone.CF_Amount = numeral(clone.CF_Amount)._value
        //     newModalValueSet(clone)
        //     return clone
        // }

        // function handleOkDetail () {
        //     setConfirmLoading(true)
        //     setTimeout(() => {
        //         props.updateInvestorDetail(newModalDetail)
        //         detailsetVisible(false)
        //         setConfirmLoading(false)
        //     }, 500);
        // };

        // function handleCancel () {
        //     cfsetVisible(false)
        //     detailsetVisible(false)
        //   };

        // function updateModalValues(value){
        //     let key = Object.keys(value)
        //     let clone = {...newModalValue}
        //     clone[key]  = value[key]
        //     newModalValueSet(clone)
        //     }
    
        // function updateDetailValues(value){
        //     let key = Object.keys(value)
        //     let clone = {...cardDataDetail}
        //     clone[key]  = value[key]
        //     newModalDetailSet(clone)
        //     }

        function getInvestments(){
            let array = []
            investment.map((res)=>{
                array.push(
                <Card title='Investment' bordered={false} style={{ width: 300, margin:25 }}>
                        <p>InvId:           {res.InvID}</p>
                        <p>CID:             {res.CID}</p>
                        <p>Feeder:          {res.Feeder}</p>
                        <p>Inv Type:        {res.Inv_Type}</p>
                        <p>Gross Capital:   {numeral(res.Gross_Capital).format('0,0')}</p>
                        <p>Net Capital:     {numeral(res.Net_Capital).format('0,0')}</p>
                        <p>Start Date:      {moment(res.Date_Inv).format('MM/DD/YYYY')}</p>
                        <p>End Date:        {moment(res.Date_Eliminate).format('MM/DD/YYYY')}</p>
                </Card>
                )
            })
            return array
        }
      
 
        if(investor != undefined){
        return(
            <div style={{background: '#ECECEC'}}>
                {/* <h1 style={{margin:25, marginBottom:0, fontSize:50}}>{investor.Account_Name}</h1> */}
                <div style={{display: 'flex',padding: 30, paddingTop:0 }}>
                    <Card title='Investor' bordered={false} style={{ width: 300, margin:25 }}>
                        <p>Name: {investor.Account_Name}</p>
                        <p>VID: {investor.VID}</p>
                        <p>SID: {investor.SID}</p>
                    </Card> 
                    {getInvestments()}
                </div>
      

            </div>
                  
            //         <Card title='Cashflows' bordered={false} style={{ width: 300, margin:25 }}>
            //             {cardDataCash}
            //         </Card>

            //         <BarChart
            //             width={900}
            //             height={500}
            //             data={barChartData}
            //             barGap={-100} 
            //             barCategoryGap={20}
            //         >
            //             <CartesianGrid strokeDasharray="3 3" />
            //             <XAxis dataKey="distrotype" type="category"/>
            //             <YAxis dataKey="amount"/>
            //             <Tooltip />
            //             {barChartColumns}
            //         </BarChart>
            //     </div>

            //     <Modal
            //         title="Investor Detail"
            //         visible={detailvisible}
            //         onOk={handleOkDetail}
            //         confirmLoading={confirmLoading}
            //         onCancel={handleCancel}
            //         destroyOnClose={true}
            //         >
            //         <Input onChange={(e)=>updateDetailValues({Account_Name: e.target.value})} style={{margin: 5}} addonBefore='Account_Name' id='Account_Name' defaultValue={cardDataDetail.Account_Name}/>
            //         <div style={{display: 'inline-flex'}}>
            //             <Input onChange={(e)=>updateDetailValues({InvID: parseInt(e.target.value)})} style={{margin: 5}} addonBefore='InvID' id='InvID' defaultValue={cardDataDetail.InvID}/>
            //             <Input onChange={(e)=>updateDetailValues({CID: parseInt(e.target.value)})} style={{margin: 5}} addonBefore='CID' id='CID' defaultValue={cardDataDetail.CID}/>
            //         </div>
            //         <div style={{display: 'inline-flex'}}>
            //             <Input onChange={(e)=>updateDetailValues({Feeder: e.target.value})} style={{margin: 5}} addonBefore='Feeder' id='Feeder' defaultValue={cardDataDetail.Feeder}/>
            //             <Input onChange={(e)=>updateDetailValues({Inv_Type: e.target.value})} style={{margin: 5}} addonBefore='Inv_Type' id='Inv_Type' defaultValue={cardDataDetail.Inv_Type}/>
            //         </div>
            //         <div style={{display: 'inline-flex'}}>
            //             <Input onChange={(e)=>updateDetailValues({Gross_Capital: numeral(e.target.value)._value})} style={{margin: 5}} addonBefore='Gross_Capital' id='Gross_Capital' defaultValue={numeral(cardDataDetail.Gross_Capital).format('0,0')}/>
            //             <Input onChange={(e)=>updateDetailValues({Net_Capital: numeral(e.target.value)._value})} style={{margin: 5}} addonBefore='Net_Capital' id='Net_Capital' defaultValue={numeral(cardDataDetail.Net_Capital).format('0,0')}/>
            //         </div>
            //         <div style={{display: 'inline-flex'}}>
            //             <Input onChange={(e)=>updateDetailValues({Date_Inv: e.target.value})} style={{margin: 5}} addonBefore='Date_Inv' id='Date_Inv' defaultValue={moment(cardDataDetail.Date_Inv).format('MM/DD/YYYY')}/>
            //             <Input onChange={(e)=>updateDetailValues({Date_Eliminate: e.target.value})} style={{margin: 5}} addonBefore='Date_Eliminate' id='Date_Eliminate' defaultValue={moment(cardDataDetail.Date_Eliminate).format('MM/DD/YYYY')}/>
            //         </div>
            //     </Modal>

            //     <Modal
            //         title="Edit Cash Flows"
            //         visible={cfvisible}
            //         onOk={handleOk}
            //         confirmLoading={confirmLoading}
            //         onCancel={handleCancel}
            //         destroyOnClose={true}
            //         >
            //         <Form >
            //             <div style={{display: 'inline-flex'}}>
            //             <Input onChange={(e)=> updateModalValues({InvID: parseInt(e.target.value)})} style={{margin: 5}} id="InvID" addonBefore='InvID' defaultValue={newModalValue.InvID}/>
            //             <Input onChange={(e)=> updateModalValues({CID: parseInt(e.target.value)})} style={{margin: 5}} addonBefore='CID' defaultValue={newModalValue.CID}/>
            //             </div>
            //             <Input onChange={(e)=> updateModalValues({Code_Name: e.target.value})} style={{margin: 5}} addonBefore='Type' defaultValue={newModalValue.Code_Name}/>
            //             <Input onChange={(e)=> updateModalValues({CF_Date: e.target.value})} style={{margin: 5}} addonBefore='Date' defaultValue={newModalValue.CF_Date}/>
            //             <Input onChange={(e)=> updateModalValues({CF_Amount: numeral(e.target.value)._value})} style={{margin: 5}} addonBefore='Amount' defaultValue={newModalValue.CF_Amount}/>
            //         </Form>
            //     </Modal>
            //     <Table style={{marginRight: 75, background: '#f1f3f5'}} columns= {columns} dataSource={tableData} />
            //</div>
        )
        }else{
            return(
                <div>z</div>
            )}


        
}

export default InvestorDetail